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
