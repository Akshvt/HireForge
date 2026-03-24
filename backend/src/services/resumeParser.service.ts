import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import mammoth from 'mammoth';

export const parseResume = async (fileBuffer: Buffer, mimeType: string): Promise<string> => {
    try {
        if (mimeType === 'application/pdf') {
            const { PDFParse } = require('pdf-parse');
            const parser = new PDFParse({ data: fileBuffer });
            const result = await parser.getText();
            return result.text;
        } else if (
            mimeType === 'application/msword' ||
            mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            const result = await mammoth.extractRawText({ buffer: fileBuffer });
            return result.value;
        }
        throw new Error('Unsupported file type for parsing');
    } catch (error) {
        throw new Error(`Failed to parse resume: ${(error as Error).message}`);
    }
};
