import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model
import joblib

# Load model dan scaler hanya sekali
model = load_model('rekomendasi_kendaraan.h5', compile=False)
scaler_premi = joblib.load('scaler_rekomendasi_kendaraan.pkl')

# Load data user dan produk
produk = pd.read_csv('Data Produk Kendaraan.csv')  # pastikan file CSV ini ada
user2idx = {uid: i for i, uid in enumerate(produk['user_id'].unique())}
produk2idx = {pid: i for i, pid in enumerate(produk['produk_id'].unique())}

# Preprocessing produk unik (1x saja)
produk['produk_idx'] = produk['produk_id'].map(produk2idx)
produk_unique = produk.drop_duplicates(subset='produk_idx').set_index('produk_idx')

def recommend_hybrid_by_user_premi(user_id, premi_user, top_n=10):
    # Scaling premi input user
    premi_user_scaled = scaler_premi.transform([[premi_user]])[0][0]

    # Cek apakah user lama
    if user_id in user2idx:
        user_idx = user2idx[user_id]
        rated_produk_idx = produk[produk['user_id'] == user_id]['produk_idx'].unique()
        unrated_produk_idx = np.setdiff1d(np.arange(len(produk2idx)), rated_produk_idx)
    else:
        user_idx = 0  # dummy user_idx untuk cold start
        unrated_produk_idx = np.arange(len(produk2idx))
    
    user_array = np.array([user_idx] * len(unrated_produk_idx))
    produk_array = np.array(unrated_produk_idx)
    premi_array = np.array([premi_user_scaled] * len(unrated_produk_idx))

    # Prediksi rating
    pred_ratings = model.predict([user_array, produk_array, premi_array], verbose=0).flatten()

    # Gabungkan hasil prediksi
    rekom_df = pd.DataFrame({
        'produk_idx': produk_array,
        'Rating': pred_ratings
    })
    rekom_df = rekom_df.join(produk_unique[['Nama Asuransi', 'Premi Asuransi']], on='produk_idx')

    return rekom_df.sort_values('Rating', ascending=False).head(top_n)[
        ['Nama Asuransi', 'Premi Asuransi', 'Rating']
    ].reset_index(drop=True)
