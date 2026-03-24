from sentence_transformers import SentenceTransformer

# Lightweight & fast model
model = SentenceTransformer("all-MiniLM-L6-v2")

def encode_texts(texts):
    return model.encode(texts, show_progress_bar=False)
