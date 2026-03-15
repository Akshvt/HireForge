import { GoogleGenerativeAI } from '@google/generative-ai';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, ExternalHyperlink, AlignmentType, TabStopType, TabStopPosition } from 'docx';
import { generateResumePdfFromMarkdown } from './pdfExport.service.js';

const genAI = new GoogleGenerativeAI(process.env['GEMINI_API_KEY'] || '');

type Tone = 'professional' | 'technical' | 'creative' | 'executive';

const TONE_INSTRUCTIONS: Record<Tone, string> = {
    professional: 'Use a polished, corporate tone. Focus on clarity, action verbs, and measurable achievements. Write as if targeting a Fortune 500 recruiter.',
    technical: 'Emphasize technical depth, system design, and engineering impact. Use precise technical terminology. Quantify performance improvements and scale.',
    creative: 'Use an engaging, narrative style that tells a compelling career story. Balance creativity with professionalism. Make achievements memorable.',
    executive: 'Write with authority and strategic focus. Emphasize leadership, P&L impact, organizational transformation, and board-level outcomes.'
};

/**
 * Rewrites a full resume using Google Gemini API.
 */
export const rewriteResume = async (
    resumeText: string,
    tone: Tone = 'professional',
    suggestions: string[] = []
): Promise<string> => {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const suggestionsBlock = suggestions.length > 0
        ? `\n\nATS FEEDBACK TO ADDRESS:\n${suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}`
        : '';

    const prompt = `You are an expert resume writer and ATS optimization specialist.

TASK: Rewrite the following resume to dramatically improve its ATS score and impact.

TONE: ${tone.toUpperCase()}
${TONE_INSTRUCTIONS[tone]}

RULES:
1. Keep the same structure (sections like Experience, Education, Skills, Projects, etc.)
2. Preserve all factual information (dates, company names, degrees, certifications, and links/URLs)
3. Rewrite bullet points with strong action verbs and quantifiable results
4. Remove buzzwords and replace with specific achievements
5. Optimize keyword density for ATS scanners
6. Ensure proper formatting with clear section headers. Use a single # for the Name/Main Header (e.g., # John Doe) and ## for Section Headers.
7. For items with dates or locations (Education, Experience, Projects), use \`||\` to separate left-aligned text from right-aligned text on the same line.
   - Example 1: \`**VIT Bhopal University** || *Expected 2026*\`
   - Example 2: \`Bachelor of Technology (CGPA: 8.10/10) || *Bhopal, India*\`
   - Example 3: \`**Doctor's Assist** | *React, CSS, Node.js* || [Live](url) | [Code](url)\`
8. Keep it concise — no fluff or filler. Use italics \`*like this*\` for tech stacks or dates.
9. If numbers/metrics are missing, add realistic placeholder indicators like [X%] or [X+] that the user can fill in
10. IMPORTANT: Format all URLs as Markdown links (e.g. [LinkedIn](https://linkedin.com/in/user))
11. Return ONLY the rewritten resume text, no explanations or commentary
${suggestionsBlock}

ORIGINAL RESUME:
---
${resumeText}
---

REWRITTEN RESUME:`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
};

/**
 * Generates a DOCX buffer from resume text.
 */
/**
 * Helper to parse markdown-like bold (**text**) and links ([text](url)) into TextRuns and ExternalHyperlinks
 */
const parseTextToRuns = (text: string, options: { size: number, font: string, color?: string }) => {
    const runs: (TextRun | ExternalHyperlink)[] = [];
    const tokenRegex = /(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g;
    const parts = text.split(tokenRegex);

    for (const part of parts) {
        if (!part) continue;

        if (part.startsWith('**') && part.endsWith('**')) {
            runs.push(new TextRun({
                text: part.slice(2, -2),
                bold: true,
                size: options.size,
                font: options.font,
                color: options.color || "000000"
            }));
        } else if (part.startsWith('*') && part.endsWith('*')) {
            runs.push(new TextRun({
                text: part.slice(1, -1),
                italics: true,
                size: options.size,
                font: options.font,
                color: options.color || "000000"
            }));
        } else if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
            const match = part.match(/\[(.*?)\]\((.*?)\)/);
            if (match) {
                runs.push(new ExternalHyperlink({
                    children: [
                        new TextRun({
                            text: match[1] || "",
                            size: options.size,
                            font: options.font,
                            color: '000000',
                            underline: {},
                        })
                    ],
                    link: match[2] || ""
                }));
            } else {
                runs.push(new TextRun({ text: part, ...options }));
            }
        } else {
            runs.push(new TextRun({ text: part, ...options }));
        }
    }
    return runs;
};

export const generateDocxFromText = async (text: string): Promise<Buffer> => {
    const lines = text.split('\n');
    const children: Paragraph[] = [];
    
    let isContactInfo = false;
    let sectionStarted = false;

    for (const line of lines) {
        const trimmed = line.trim();

        if (!trimmed) {
            children.push(new Paragraph({ text: '' }));
            continue;
        }

        // Detect Name Header (# Header)
        if (/^#\s/.test(trimmed)) {
            isContactInfo = true;
            const headerText = trimmed.replace(/^#\s*/, '');
            children.push(
                new Paragraph({
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 120 },
                    children: [
                        new TextRun({
                            text: headerText,
                            bold: true,
                            size: 44, // 22pt
                            font: 'Calibri',
                            color: '000000',
                        }),
                    ],
                })
            );
            continue;
        }

        // Detect Section Headers (## Header or ALL CAPS)
        if (/^[A-Z][A-Z\s&/]+$/.test(trimmed) || /^##\s/.test(trimmed)) {
            isContactInfo = false;
            sectionStarted = true;
            const headerText = trimmed.replace(/^##\s*/, '');
            children.push(
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 120, after: 60 },
                    children: [
                        new TextRun({
                            text: headerText,
                            bold: true,
                            size: 24,
                            font: 'Calibri',
                            color: '000000',
                        }),
                    ],
                })
            );
            continue;
        }

        // Subheaders (### Header)
        if (/^###\s/.test(trimmed)) {
            const headerText = trimmed.replace(/^###\s*/, '');
            children.push(
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    spacing: { before: 60, after: 30 },
                    children: parseTextToRuns(headerText, { size: 22, font: 'Calibri', color: '000000' }),
                })
            );
            continue;
        }

        // Detect bullet points
        if (/^[-*•]\s/.test(trimmed)) {
            const bulletText = trimmed.replace(/^[-*•]\s*/, '');
            children.push(
                new Paragraph({
                    bullet: { level: 0 },
                    spacing: { before: 30, after: 30 },
                    children: parseTextToRuns(bulletText, { size: 20, font: 'Calibri', color: '000000' }),
                })
            );
            continue;
        }

        // Normal paragraph
        const alignCenter = isContactInfo && !sectionStarted;
        if (trimmed.includes('||')) {
            const [leftStr, rightStr] = trimmed.split('||').map(s=>s.trim());
            children.push(
                new Paragraph({
                    alignment: alignCenter ? AlignmentType.CENTER : AlignmentType.LEFT,
                    tabStops: [{ type: TabStopType.RIGHT, position: 10000 }],
                    spacing: { after: 30 },
                    children: [
                        ...parseTextToRuns(leftStr || '', { size: 20, font: 'Calibri', color: '000000' }),
                        new TextRun("\t"),
                        ...parseTextToRuns(rightStr || '', { size: 20, font: 'Calibri', color: '000000' })
                    ]
                })
            );
        } else {
            children.push(
                new Paragraph({
                    alignment: alignCenter ? AlignmentType.CENTER : AlignmentType.LEFT,
                    spacing: { after: 30 },
                    children: parseTextToRuns(trimmed, { size: 20, font: 'Calibri', color: '000000' }),
                })
            );
        }
    }

    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        margin: { top: 360, right: 360, bottom: 360, left: 360 },
                    },
                },
                children,
            },
        ],
    });

    const buffer = await Packer.toBuffer(doc);
    return Buffer.from(buffer);
};

/**
 * Generates a formatted Markdown string from resume text.
 */
export const generateMarkdown = (text: string): string => {
    // The Gemini response is already mostly well-formatted.
    // Clean up and ensure proper markdown structure.
    return text
        .replace(/^([A-Z][A-Z\s&/]+)$/gm, '\n## $1\n') // ALL CAPS → ## Heading
        .replace(/\n{3,}/g, '\n\n') // Remove excess blank lines
        .trim();
};

/**
 * Generates a PDF buffer from resume text using existing PDFKit service.
 */
export const generatePdfForDownload = async (text: string): Promise<Buffer> => {
    return generateResumePdfFromMarkdown(text);
};
