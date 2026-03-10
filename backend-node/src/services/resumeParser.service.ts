import { promises as fs } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');
import mammoth from 'mammoth';

export const parseResume = async (filePath: string, mimeType: string): Promise<string> => {
    try {
        if (mimeType === 'application/pdf') {
            const dataBuffer = await fs.readFile(filePath);
            const parser = new PDFParse({ data: dataBuffer });
            const result = await parser.getText();
            await parser.destroy();
            return result.text;
        } else if (
            mimeType === 'application/msword' ||
            mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            const result = await mammoth.extractRawText({ path: filePath });
            return result.value;
        }
        throw new Error('Unsupported file type for parsing');
    } catch (error) {
        throw new Error(`Failed to parse resume: ${(error as Error).message}`);
    }
};
