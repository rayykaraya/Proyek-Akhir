import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
import joblib

#  Load Semua Model 
# Kesehatan
model_kesehatan = load_model("ModelPremiKesehatan.h5", compile=False)
scaler_kesehatan_X = joblib.load("scaler_Kesehatan_X.pkl")
scaler_kesehatan_Y = joblib.load("scaler_Kesehatan_Y.pkl")
model_rkmnd_kesehatan = load_model("rekomendasi_kesehatan.h5", compile=False)
scaler_rkmnd_kesehatan = joblib.load("scaler_rekomendasi_kesehatan.pkl")

# Kendaraan
model_kendaraan = load_model("ModelPremiKendaraan.h5", compile=False)
scaler_kendaraan_X = joblib.load("scaler_Kendaraan_X.pkl")
scaler_kendaraan_Y = joblib.load("scaler_Kendaraan_Y.pkl")
model_rkmnd_kendaraan = load_model("rekomendasi_kendaraan.h5", compile=False)
scaler_rkmnd_kendaraan = joblib.load("scaler_rekomendasi_kendaraan.pkl")

# Properti
model_properti = load_model("ModelPremiProperti.h5", compile=False)
scaler_properti_X = joblib.load("scaler_Properti_X.pkl")
scaler_properti_Y = joblib.load("scaler_Properti_Y.pkl")
model_rkmnd_properti = load_model("rekomendasi_properti.h5", compile=False)
scaler_rkmnd_properti = joblib.load("scaler_rekomendasi_properti.pkl")

# Fungsi Prediksi 

import numpy as np

def predict_kesehatan(data):
    try:
        print("Data sebelum casting:", data)

        # Konversi ke float
        data_float = list(map(float, data))
        print("Data setelah casting ke float:", data_float)

        # Ubah ke array 2D
        data_array = np.array([data_float], dtype=float)
        print("Array akhir yang masuk ke scaler:", data_array)

        # Scaling input
        X_scaled = scaler_kesehatan_X.transform(data_array)

        # === MULTI-OUTPUT MODEL ===
        risk_pred, premium_pred = model_kesehatan.predict(X_scaled)

        # Ambil kelas risiko: argmax
        kelas_risiko = int(np.argmax(risk_pred, axis=1)[0])

        # Inverse transform premium
        premi_pred = scaler_kesehatan_Y.inverse_transform(premium_pred)[0][0]
        premi_pred = int(round(premi_pred))

        return premi_pred, kelas_risiko
    except Exception as e:
        raise ValueError(f"Terjadi error saat prediksi: {e}")

def predict_kendaraan(data):
    try:
        # Konversi input ke bentuk array 2D
        X_scaled = scaler_kendaraan_X.transform([data])
        
        # Prediksi model: [klasifikasi risiko, regresi premi]
        risk_pred, premi_pred = model_kendaraan.predict(X_scaled)
        
        # Ambil kelas risiko dan nilai premi
        kelas_risiko = int(np.argmax(risk_pred, axis=1)[0])
        premi = float(scaler_kendaraan_Y.inverse_transform(premi_pred)[0][0])
        
        return premi, kelas_risiko
    except Exception as e:
        raise ValueError(f"Error pada prediksi kendaraan: {e}")


def predict_properti(data):
    try:
        # Konversi input ke bentuk array 2D
        X_scaled = scaler_properti_X.transform([data])
        
        # Prediksi model: [klasifikasi risiko, regresi premi]
        risk_pred, premi_pred = model_properti.predict(X_scaled)
        
        # Ambil kelas risiko dan nilai premi
        kelas_risiko = int(np.argmax(risk_pred, axis=1)[0])
        premi = float(scaler_properti_Y.inverse_transform(premi_pred)[0][0])
        
        return premi, kelas_risiko
    except Exception as e:
        raise ValueError(f"Error pada prediksi properti: {e}")


# Fungsi Rekomendasi Produk 

def rekomendasi_kesehatan(data):
    try:
        data_scaled = scaler_rkmnd_kesehatan.transform([data])
        pred = model_rkmnd_kesehatan.predict(data_scaled)
        return int(np.argmax(pred)), pred[0].tolist()
    except Exception as e:
        raise ValueError(f"Error rekomendasi kesehatan: {e}")

def rekomendasi_kendaraan(data):
    try:
        data_scaled = scaler_rkmnd_kendaraan.transform([data])
        pred = model_rkmnd_kendaraan.predict(data_scaled)
        return int(np.argmax(pred)), pred[0].tolist()
    except Exception as e:
        raise ValueError(f"Error rekomendasi kendaraan: {e}")

def rekomendasi_properti(data):
    try:
        data_scaled = scaler_rkmnd_properti.transform([data])
        pred = model_rkmnd_properti.predict(data_scaled)
        return int(np.argmax(pred)), pred[0].tolist()
    except Exception as e:
        raise ValueError(f"Error rekomendasi properti: {e}")