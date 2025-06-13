import pickle
import faiss
from sentence_transformers import SentenceTransformer
from transformers import T5ForConditionalGeneration, T5Tokenizer
import numpy as np

# ===== Load Embedding Index & Dokumen =====
embedding_folder = "embeddings"
index = faiss.read_index(f"{embedding_folder}/index.faiss")

with open(f"{embedding_folder}/data.pkl", "rb") as f:
    data = pickle.load(f)

documents = data["documents"]
sources = data["sources"]

# ===== Load Embedding Model untuk Query =====
retriever_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# ===== Load LLM (Generatif) =====
llm_model = T5ForConditionalGeneration.from_pretrained("google/flan-t5-base")
tokenizer = T5Tokenizer.from_pretrained("google/flan-t5-base")

# ===== Sapaan Sosial & Fallback =====
social_responses = {
    "halo": "Halo juga! Ada yang bisa saya bantu tentang asuransi? 😊",
    "hai": "Hai! Silakan tanya apa saja seputar asuransi.",
    "terima kasih": "Sama-sama! Senang bisa membantu.",
    "makasih": "Sama-sama 😊",
    "siapa kamu": "Saya adalah Finzure, asisten cerdas untuk edukasi asuransi."
}

# ===== Chatbot Start =====
print("Finzure RAG + GenAI Chatbot siap. Ketik 'exit' untuk keluar.")

while True:
    question = input("\nAnda: ").strip().lower()
    if question == "exit":
        break

    # === Sapaan / sosial ===
    if question in social_responses:
        print("Finzure:", social_responses[question])
        continue

    # === Embedding pertanyaan ===
    q_emb = retriever_model.encode([question])
    D, I = index.search(q_emb, k=3)

    if D[0][0] > 1.5:
        print("Finzure: Maaf, saya belum punya informasi yang relevan untuk pertanyaan itu.")
        continue

    # === Gabungkan konteks dari top-3 dokumen ===
    top_docs = [documents[i].strip() for i in I[0]]
    context = "\n\n".join(top_docs)

    # === Prompt instruktif untuk model generatif ===
    prompt = f"""
Kamu adalah asisten cerdas bernama Finzure. Gunakan informasi berikut untuk menjawab pertanyaan pengguna tentang asuransi secara singkat, jelas, dan masuk akal.

Informasi:
{context}

Pertanyaan: {question}
Jawaban:
""".strip()

    input_ids = tokenizer(prompt, return_tensors="pt").input_ids
    output_ids = llm_model.generate(
        input_ids,
        max_new_tokens=150,
        num_beams=4,
        early_stopping=True
    )

    answer = tokenizer.decode(output_ids[0], skip_special_tokens=True).strip()

    # === Fallback jika output terlalu aneh / loop / kosong ===
    if (
        not answer
        or answer.lower().startswith("pertanyaan:")
        or answer.count("adalah") > 10
        or len(answer.split()) < 3
    ):
        print("Finzure: Maaf, saya belum bisa memberikan jawaban yang tepat untuk pertanyaan itu.")
        continue

    print("Finzure:", answer)
