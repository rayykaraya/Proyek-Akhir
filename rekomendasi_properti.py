import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
import joblib

# Load data produk properti (ganti path sesuai file kamu)
produk = pd.read_csv('Data Produk Properti.csv')

# Pastikan kolom 'produk_idx' ada, kalau belum buat dari index
if 'produk_idx' not in produk.columns:
    produk['produk_idx'] = produk.index

# Buat dataframe produk unik indexed by produk_idx
produk_unique = produk.drop_duplicates(subset='produk_idx').set_index('produk_idx')

# Buat mapping produk2idx: produk_idx ke index numerik 0..N-1
produk2idx = {idx: i for i, idx in enumerate(produk['produk_idx'].unique())}

# Buat mapping user2idx: user_id ke index numerik 0..M-1
user2idx = {user: i for i, user in enumerate(produk['user_id'].unique())}

# Load model rekomendasi properti
model = load_model('rekomendasi_properti.h5', compile=False)

# Load scaler premi properti
scaler_premi = joblib.load('scaler_rekomendasi_properti.pkl')

def recommend_hybrid_by_user_premi(user_id, premi_user, top_n=10):
    # Scaling premi input user
    premi_user_scaled = scaler_premi.transform([[premi_user]])[0][0]

    # Jika user lama
    if user_id in user2idx:
        user_idx = user2idx[user_id]
        rated_produk_idx = produk[produk['user_id'] == user_id]['produk_idx'].unique()
        unrated_produk_idx = np.setdiff1d(np.arange(len(produk2idx)), 
                                          [produk2idx[idx] for idx in rated_produk_idx])
    else:
        print(f"User {user_id} tidak ditemukan, gunakan cold-start berbasis premi user.")
        user_idx = 0  # dummy user index
        unrated_produk_idx = np.arange(len(produk2idx))
    
    user_array = np.array([user_idx] * len(unrated_produk_idx))
    produk_array = np.array(unrated_produk_idx)
    premi_array = np.array([premi_user_scaled] * len(unrated_produk_idx))

    # Prediksi rating
    pred_ratings = model.predict([user_array, produk_array, premi_array], verbose=0).flatten()

    # Gabungkan hasil prediksi dengan data produk unik
    rekom_df = pd.DataFrame({
        'produk_idx': produk_array,
        'Rating': pred_ratings
    })

    rekom_df = rekom_df.join(produk_unique[['Nama Asuransi', 'Premi Asuransi']], on='produk_idx')

    # Ambil kolom yang diinginkan dan sort berdasarkan rating
    return rekom_df.sort_values('Rating', ascending=False).head(top_n)[
        ['Nama Asuransi', 'Premi Asuransi', 'Rating']
    ].reset_index(drop=True)

