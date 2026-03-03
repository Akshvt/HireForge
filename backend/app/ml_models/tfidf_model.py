from sklearn.feature_extraction.text import TfidfVectorizer

# Create a global vectorizer so vocabulary is shared
vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=5000
)

def fit_transform(texts):
    """
    Fit TF-IDF on text data and transform
    """
    return vectorizer.fit_transform(texts)

def transform(texts):
    """
    Transform new text using existing TF-IDF model
    """
    return vectorizer.transform(texts)
