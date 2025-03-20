import requests
from flask import Flask, request, jsonify
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS;

# Flask app
flask_app = Flask(__name__)
CORS(flask_app)
# FastAPI app
# fastapi_app = FastAPI()

# Load Products from dummyjson.com
def fetch_products():
    response = requests.get("https://dummyjson.com/products?limit=15")
    data = response.json()
    return data['products']

products = fetch_products()
for p in products:
    print(p['brand'])

@flask_app.route('/')
def home():
    return "Hello, Flask is running!"

# -------------------- 1️⃣ Flask Route: Content-Based Filtering --------------------
@flask_app.route('/flask/recommend', methods=['GET'])
def recommend_flask():
    query = request.args.get('q')
    if not query:
        return jsonify({"error": "Missing query parameter"}), 400

    corpus = [f"{p['title']} {p['description']} {' '.join(p['tags'])} {p['brand']}" for p in products]
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(corpus)

    query_vector = tfidf.transform([query])
    similarity_scores = cosine_similarity(query_vector, tfidf_matrix).flatten()

    top_indices = similarity_scores.argsort()[-5:][::-1]
    recommendations = [products[i] for i in top_indices]

    return jsonify(recommendations)

# -------------------- 2️⃣ FastAPI Route: Using Autoencoders Placeholder --------------------
# @fastapi_app.get("/fastapi/recommend")
# def recommend_fastapi(q: str = ""):
#     if not q:
#         return {"error": "Missing query parameter"}

#     # Same TF-IDF content-based method as placeholder for autoencoder
#     corpus = [f"{p['title']} {p['description']} {' '.join(p['tags'])} {p['brand']}" for p in products]
#     tfidf = TfidfVectorizer(stop_words='english')
#     tfidf_matrix = tfidf.fit_transform(corpus)

#     query_vector = tfidf.transform([q])
#     similarity_scores = cosine_similarity(query_vector, tfidf_matrix).flatten()

#     top_indices = similarity_scores.argsort()[-5:][::-1]
#     recommendations = [products[i] for i in top_indices]

#     return recommendations

# # Mount FastAPI on Flask
# flask_app.wsgi_app = WSGIMiddleware(fastapi_app)

# Run Flask + FastAPI together
if __name__ == "__main__":
    flask_app.run(debug=True, port=5000)
