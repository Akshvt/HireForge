from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(resume_vector, job_vectors):
    """
    Returns similarity scores between resume and job descriptions
    """
    scores = cosine_similarity(resume_vector, job_vectors)
    return scores.flatten()
