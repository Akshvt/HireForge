from pdfminer.high_level import extract_text
from docx import Document

def extract_text_from_resume(file_path: str) -> str:
    """
    Extract text from PDF or DOCX resume
    """
    if file_path.endswith(".pdf"):
        return extract_text(file_path)

    elif file_path.endswith(".docx"):
        doc = Document(file_path)
        return "\n".join([p.text for p in doc.paragraphs])

    else:
        raise ValueError("Unsupported file format")
