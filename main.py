from fastapi import FastAPI, HTTPException
from rekomendasi_kendaraan import recommend_hybrid_by_user_premi as rekom_kendaraan
from rekomendasi_properti import recommend_hybrid_by_user_premi as rekom_properti
from rekomendasi_kesehatan import recommend_hybrid_by_user_premi as rekom_kesehatan
from fastapi.middleware.cors import CORSMiddleware 
from schemas import (
    KesehatanInput, KesehatanRekomendasiInput,
    KendaraanInput, KendaraanRekomendasiInput,
    PropertiInput, PropertiRekomendasiInput
)
from predict_utils import (
    predict_kesehatan, rekomendasi_kesehatan,
    predict_kendaraan, rekomendasi_kendaraan,
    predict_properti, rekomendasi_properti
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://127.0.0.1:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========== KESEHATAN ==========
@app.post("/predict/kesehatan")
def pred_kesehatan(data: KesehatanInput):
    try:
        fitur = [
        data.usia,
        data.diabetes,
        data.masalah_tekanan_darah,
        data.riwayat_transplantasi,
        data.penyakit_kronis,
        data.tinggi_badan_cm,
        data.berat_badan_kg,
        data.alergi,
        data.riwayat_kanker_keluarga,
        data.jumlah_operasi_besar,
    ]        
        premi, risiko = predict_kesehatan(fitur)
        return {"premi": premi, "risiko": risiko}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/rekomendasi/kesehatan")
def rkmnd_kesehatan(data: KesehatanRekomendasiInput):
    try:
        rekom = rekom_kesehatan(
            data.user_id,
            data.premi_asuransi,
            top_n=10
        )
        return {"rekomendasi": rekom.to_dict(orient="records")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error rekomendasi kesehatan: {e}")


# ========== KENDARAAN ==========
@app.post("/predict/kendaraan")
def pred_kendaraan(data: KendaraanInput):
    try:
        fitur = [
        data.saluran_distribusi,
        data.lama_menjadi_pelanggan,
        data.metode_pembayaran,
        data.wilayah,
        data.pengemudi_kedua,
        data.tahun_pendaftaran_kendaraan,
        data.daya_mesin,
        data.kapasitas_silinder,
        data.nilai_kendaraan,
        data.jumlah_pintu,
        data.jenis_bahan_bakar,
        data.berat_kendaraan,
        data.usia
    ]        
        premi, risiko = predict_kendaraan(fitur)
        return {"premi": premi, "risiko": risiko}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/rekomendasi/kendaraan")
def rkmnd_kendaraan(data: KendaraanRekomendasiInput):
    try:
        rekom = rekom_kendaraan(
            data.user_id,
            data.premi_asuransi,
            top_n=10
        )
        return {"rekomendasi": rekom.to_dict(orient="records")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error rekomendasi kendaraan: {e}")



# ========== PROPERTI ==========
@app.post("/predict/properti")
def pred_properti(data: PropertiInput):
    try:
        fitur = [
        data.perlindungan_isi_rumah,
        data.alarm_terpasang,
        data.risiko_banjir,
        data.keamanan_lingkungan,
        data.jenis_kepemilikan,
        data.tipe_properti,
        data.risiko_penurunan_tanah,
        data.tahun_dibangun
    ]
        premi, risiko = predict_properti(fitur)
        return {"premi": premi, "risiko": risiko}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/rekomendasi/properti")
def rkmnd_properti(data: PropertiRekomendasiInput):
    try:
        rekom = rekom_properti(
            data.user_id,
            data.premi_asuransi,
            top_n=10
        )
        return {"rekomendasi": rekom.to_dict(orient="records")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error rekomendasi properti: {e}")
