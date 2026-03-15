import PDFDocument from 'pdfkit';

/**
 * Generates a PDF buffer from raw text and ATS analysis.
 */
export const generatePdfFromText = (text: string, metrics?: any): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            const buffers: Buffer[] = [];

            doc.on('data', (chunk) => buffers.push(chunk));
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });
            doc.on('error', (err) => {
                reject(err);
            });

            // Helper for Progress Bar
            const drawProgressBar = (x: number, y: number, width: number, score: number, color: string, height: number = 10) => {
                const radius = height / 2;
                // Background track
                doc.fillColor('#e2e8f0').roundedRect(x, y, width, height, radius).fill();
                // Progress fill
                if (score > 0) {
                    const fillWidth = (score / 100) * width;
                    doc.fillColor(color).roundedRect(x, y, fillWidth, height, radius).fill();
                }
            };

            // Header Background and Title
            doc.rect(0, 0, 612, 120).fill('#2563eb');
            doc.fillColor('#ffffff').fontSize(28).text('HireForge Resume Report', 50, 45, { align: 'center' });
            doc.fillColor('#ffffff', 0.8).fontSize(10).text('Professional ATS Analysis & Technical Audit', 50, 80, { align: 'center' });
            doc.moveDown(4);

            // ATS Score Hero Section
            if (metrics && metrics.atsScore !== undefined) {
                const startY = doc.y;
                doc.fillColor('#f8fafc').rect(50, startY, 512, 80).fill();
                doc.fillColor('#1e293b').fontSize(14).text('Overall ATS Score', 75, startY + 20);

                // Big score with dynamic color
                const scoreColor = metrics.atsScore >= 80 ? '#16a34a' : (metrics.atsScore >= 60 ? '#f59e0b' : '#dc2626');
                doc.fillColor(scoreColor).fontSize(36).text(`${metrics.atsScore}%`, 430, startY + 20, { align: 'right', width: 100 });

                // Hero Progress bar
                drawProgressBar(75, startY + 50, 450, metrics.atsScore, scoreColor, 14);
                doc.moveDown(6);
            }

            // Detailed Analysis
            if (metrics && metrics.detailedBreakdown) {
                doc.fillColor('#1e293b').fontSize(18).text('Detailed Analysis Breakdown', { underline: false });
                doc.moveDown(1);

                metrics.detailedBreakdown.forEach((category: any) => {
                    // Category Header
                    const categoryColor = category.score >= 70 ? '#2563eb' : '#475569';
                    doc.fillColor(categoryColor).fontSize(13).text(category.category.toUpperCase(), { continued: true });
                    doc.fillColor('#94a3b8').fontSize(10).text(`  (${category.score}%)`);

                    doc.moveDown(0.2);
                    drawProgressBar(50, doc.y, 512, category.score, categoryColor, 8);
                    doc.moveDown(1);

                    // Sub-parameters
                    if (category.subParameters) {
                        category.subParameters.forEach((param: any) => {
                            const paramColor = param.score >= 80 ? '#16a34a' : (param.score >= 50 ? '#64748b' : '#ef4444');

                            doc.fillColor('#334155').fontSize(10).text(param.name, 70, doc.y);
                            doc.fillColor(paramColor).fontSize(10).text(`${param.score}%`, 520, doc.y - 12, { align: 'right' });

                            drawProgressBar(70, doc.y, 450, param.score, paramColor, 4);

                            if (param.feedback) {
                                doc.fillColor('#94a3b8').fontSize(8).text(param.feedback, 70, doc.y + 2);
                            }
                            doc.moveDown(1.2);
                        });
                    }
                    doc.moveDown(1);
                });
            }

            // Professional Suggestions
            if (metrics && metrics.suggestions && metrics.suggestions.length > 0) {
                doc.addPage();
                doc.fillColor('#1e293b').fontSize(18).text('Strategic Suggestions', { underline: true });
                doc.moveDown(1);

                metrics.suggestions.forEach((sugg: string) => {
                    doc.rect(50, doc.y, 5, 20).fill('#2563eb');
                    doc.fillColor('#475569').fontSize(11).text(sugg, 65, doc.y - 15);
                    doc.moveDown(1.5);
                });
            }

            // Content Section
            doc.addPage();
            doc.fillColor('#1e293b').fontSize(18).text('Resume Content Archive', { align: 'center' });
            doc.moveDown(2);
            doc.rect(50, doc.y, 512, 1).fill('#e2e8f0');
            doc.moveDown(1);
            doc.fontSize(9).fillColor('#334155').text(text, { align: 'left', lineGap: 3 });

            // Finalize PDF file
            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Generates an ATS-friendly Resume PDF from markdown text
 */
const renderInlinePdf = (doc: any, text: string, alignCenter: boolean, isRightAlign: boolean, startX: number, startY: number) => {
    const tokenRegex = /(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g;
    const parts = text.split(tokenRegex).filter(Boolean);
    const fontSize = 10;
    
    let x = startX;
    
    if (alignCenter || isRightAlign) {
        let totalWidth = 0;
        for (const part of parts) {
            if (part.startsWith('**') && part.endsWith('**')) {
                doc.font('Helvetica-Bold').fontSize(fontSize);
                totalWidth += doc.widthOfString(part.slice(2, -2));
            } else if (part.startsWith('*') && part.endsWith('*')) {
                doc.font('Helvetica-Oblique').fontSize(fontSize);
                totalWidth += doc.widthOfString(part.slice(1, -1));
            } else if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
                const match = part.match(/\[(.*?)\]\((.*?)\)/);
                doc.font('Helvetica').fontSize(fontSize);
                totalWidth += doc.widthOfString(match ? (match[1] || '') : part);
            } else {
                doc.font('Helvetica').fontSize(fontSize);
                totalWidth += doc.widthOfString(part);
            }
        }
        if (alignCenter) x = (doc.page.width - totalWidth) / 2;
        if (isRightAlign) x = doc.page.width - doc.page.margins.right - totalWidth;
    }

    doc.x = x;
    doc.y = startY;

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!part) continue;
        
        const isLast = i === parts.length - 1;
        const options: any = { continued: !isLast, lineGap: 1 };
        
        if (part.startsWith('**') && part.endsWith('**')) {
            doc.font('Helvetica-Bold').fontSize(fontSize).fillColor('#000000').text(part.slice(2, -2), options);
        } else if (part.startsWith('*') && part.endsWith('*')) {
            doc.font('Helvetica-Oblique').fontSize(fontSize).fillColor('#000000').text(part.slice(1, -1), options);
        } else if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
            const match = part.match(/\[(.*?)\]\((.*?)\)/);
            if (match) {
                options.link = match[2] || '';
                options.underline = true;
                doc.font('Helvetica').fontSize(fontSize).fillColor('#000000').text(match[1] || '', options);
            } else {
                doc.font('Helvetica').fontSize(fontSize).fillColor('#000000').text(part, options);
            }
        } else {
            doc.font('Helvetica').fontSize(fontSize).fillColor('#000000').text(part, options);
        }
    }
}

export const generateResumePdfFromMarkdown = (text: string): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        try {
            // ATS friendly margins 0.5 inch (36 points), Letter size (8.5 x 11) for more space
            const doc = new PDFDocument({ margin: 36, size: 'LETTER' });
            const buffers: Buffer[] = [];

            doc.on('data', (chunk) => buffers.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
            doc.on('error', reject);

            const lines = text.split('\n');
            const lineGap = 1; // tight spacing
            
            let isContactInfo = false;
            let sectionStarted = false;

            for (const line of lines) {
                const trimmed = line.trim();

                if (!trimmed) {
                    doc.moveDown(0.1);
                    continue;
                }

                // Name Header (# Name)
                if (/^#\s/.test(trimmed)) {
                    isContactInfo = true;
                    const headerText = trimmed.replace(/^#\s*/, '');
                    doc.font('Helvetica-Bold').fontSize(24).fillColor('#000000').text(headerText, { align: 'center', lineGap: 2 });
                    doc.moveDown(0.2);
                    continue;
                }

                // Section Header (## Section)
                if (/^[A-Z][A-Z\s&/]+$/.test(trimmed) || /^##\s/.test(trimmed)) {
                    isContactInfo = false;
                    sectionStarted = true;
                    const headerText = trimmed.replace(/^##\s*/, '');
                    doc.moveDown(0.4);
                    doc.font('Helvetica-Bold').fontSize(14).fillColor('#000000').text(headerText.toUpperCase(), { lineGap: 0 });
                    
                    // Draw a subtle line under the section header (width: 612 - 36*2 = 540 -> x ends at 576)
                    const y = doc.y;
                    doc.moveTo(36, y).lineTo(576, y).strokeColor('#000000').lineWidth(0.5).stroke();
                    doc.moveDown(0.3);
                    continue;
                }

                // Subheader (### Subsection)
                if (/^###\s/.test(trimmed)) {
                    const headerText = trimmed.replace(/^###\s*/, '');
                    
                    doc.font('Helvetica-Bold').fontSize(10).fillColor('#000000').text(headerText.replace(/\*\*/g, ''), { lineGap });
                    doc.moveDown(0.1);
                    continue;
                }

                // Normal Text with Markdown Links and Bold
                const isBullet = /^[-*•]\s/.test(trimmed);
                const textToProcess = isBullet ? '•   ' + trimmed.replace(/^[-*•]\s*/, '') : trimmed;
                
                const alignCenter = isContactInfo && !sectionStarted;
                if (textToProcess.includes('||')) {
                    const [leftStr, rightStr] = textToProcess.split('||').map(s => s.trim());
                    const startY = doc.y;
                    
                    renderInlinePdf(doc, leftStr || '', false, false, 36, startY);
                    let maxNextY = doc.y;
                    
                    if (rightStr) {
                         const savedX = doc.x;
                         renderInlinePdf(doc, rightStr, false, true, 36, startY);
                         if (doc.y > maxNextY) maxNextY = doc.y;
                         doc.x = savedX;
                    }
                    doc.y = maxNextY;
                    doc.moveDown(0.1);
                } else {
                    renderInlinePdf(doc, textToProcess, alignCenter, false, 36, doc.y);
                    if (!alignCenter) doc.moveDown(0.1);
                }
            }

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};
