from transformers import pipeline

# Load once at startup (important for speed)
rewriter = pipeline(
    "text2text-generation",
    model="google/flan-t5-base",
    max_length=128
)

def rewrite_line_hf(line: str) -> str:
    """
    Rewrite resume bullet using HuggingFace LLM
    """
    prompt = (
        "Rewrite this resume bullet using strong action verbs, "
        "quantifiable impact, and ATS-friendly language:\n\n"
        f"{line}"
    )

    result = rewriter(prompt)[0]["generated_text"]
    return result.strip()
