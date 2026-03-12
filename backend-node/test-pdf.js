
import { PDFParse } from 'pdf-parse';
import fs from 'fs';

async function test() {
    console.log('PDFParse:', PDFParse);
    try {
        const dataBuffer = fs.readFileSync('somefile.pdf');
        const parser = new PDFParse({ data: dataBuffer });
        console.log('Parser instance:', parser);
    } catch (e) {
        console.error('Error:', e);
    }
}
test();
