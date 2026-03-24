import re
import string

def clean_text(text: str) -> str:
    """
    Basic text cleaning for NLP
    """
    text = text.lower()
    text = re.sub(r"\d+", " ", text)          # remove numbers
    text = text.translate(str.maketrans("", "", string.punctuation))
    text = re.sub(r"\s+", " ", text)          # remove extra spaces
    return text.strip()
