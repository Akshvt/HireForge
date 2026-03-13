
import { parseResume } from './src/services/resumeParser.service.js';
import { evaluateResume } from './src/services/evaluation.service.js';
import fs from 'fs';

async function test() {
    console.log('--- Testing PDF Parsing ---');
    try {
        // We'll try to find any PDF in the project or just use a dummy path to check for "ENOENT" vs "TypeError"
        const result = await parseResume('non-existent.pdf', 'application/pdf');
        console.log('Result:', result);
    } catch (e) {
        console.log('Caught expected error or actual error:', e.message);
    }

    console.log('\n--- Testing Linguistic Analysis (Harper) ---');
    try {
        const text = "This is a test resume with some skills: React, Node.js. It has some typos like 'recieve'.";
        const evaluation = await evaluateResume(text);
        console.log('ATS Score:', evaluation.ats_score);
        console.log('Skills Found:', evaluation.skills);
        console.log('Suggestions:', evaluation.suggestions);
    } catch (e) {
        console.error('Linguistic analysis failed:', e);
    }
}
test();
