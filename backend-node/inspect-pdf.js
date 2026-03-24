
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

async function test() {
    try {
        const { PDFParse } = require('pdf-parse');
        console.log('PDFParse type:', typeof PDFParse);
        
        // Test with a dummy buffer to see if it instantiates and calls correctly
        const parser = new PDFParse({ data: Buffer.from('') });
        console.log('Parser instantiated');
        
        // This will likely fail with some PDF error but as long as it's NOT "not a function"
        const result = await parser.getText();
        console.log('Result:', result);

    } catch (e) {
        console.log('Caught error (expected if buffer is empty):', e.message);
    }
}
test();
