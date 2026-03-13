# Implementation Plan - Fix Resume Parsing Error

The "Error processing resume" is caused by using the `pdf-parse` v1 API (functional) while `pdf-parse` v2 (class-based) is installed. This plan updates the `resumeParser.service.ts` to use the correct v2 API.

## Proposed Changes

### Backend (Node.js)

#### [MODIFY] [resumeParser.service.ts](file:///c:/My%20Projects/HireForge/backend-node/src/services/resumeParser.service.ts)

- Update `pdf-parse` import to use `{ PDFParse }`.
- Update `parseResume` function to instantiate `PDFParse` and call `getText()`.
- Add `await parser.destroy()` to free memory after parsing.

## Verification Plan

### Automated Tests
- Run the debug script `debug-parser.js` which has already been verified to work with the new API.
  ```bash
  cd backend-node
  node debug-parser.js
  ```

### Manual Verification
1. Start the backend server: `npm run dev` in `backend-node`.
2. Upload a PDF resume through the frontend.
3. Verify the "Error processing resume" alert no longer appears and text is correctly parsed.
