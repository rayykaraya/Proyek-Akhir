from pydantic import BaseModel, validator
from typing import Union

def encode_ya_tidak(value):
    mapping = {
        "ya": 0,
        "tidak": 1
    }
    if isinstance(value, str):
        val = value.lower()
        if val in mapping:
            return mapping[val]
        else:
            raise ValueError("Input harus 'ya' atau 'tidak'")
    elif isinstance(value, int):
        if value in (0, 1):
            return value
        else:
            raise ValueError("Input harus 0 atau 1")
    else:
        raise ValueError("Input tidak valid")

# ========= ASURANSI KESEHATAN =========
class KesehatanInput(BaseModel):
    usia: int
    diabetes: Union[str, int]
    masalah_tekanan_darah: Union[str, int]
    riwayat_transplantasi: Union[str, int]
    penyakit_kronis: Union[str, int]
    tinggi_badan_cm: int
    berat_badan_kg: int
    alergi: Union[str, int]
    riwayat_kanker_keluarga: Union[str, int]
    jumlah_operasi_besar: int

    @validator(
        "diabetes",
        "masalah_tekanan_darah",
        "riwayat_transplantasi",
        "penyakit_kronis",
        "alergi",
        "riwayat_kanker_keluarga",
        pre=True
    )
    def validate_ya_tidak(cls, v):
        return encode_ya_tidak(v)


class KesehatanRekomendasiInput(BaseModel):
    user_id: str
    premi_asuransi: float


# ========= ASURANSI KENDARAAN =========
class KendaraanInput(BaseModel):
    saluran_distribusi: Union[str, int]
    lama_menjadi_pelanggan: int
    metode_pembayaran: Union[str, int]
    wilayah: Union[str, int]
    pengemudi_kedua: Union[str, int]
    tahun_pendaftaran_kendaraan: int
    daya_mesin: int
    kapasitas_silinder: int
    nilai_kendaraan: float
    jumlah_pintu: int
    jenis_bahan_bakar: float     # 0.0: Premium, 1.0: Solar, 2.0: Pertalite
    berat_kendaraan: int
    usia: int

    @validator('saluran_distribusi', pre=True)
    def encode_saluran(cls, value):
        mapping = {'agen': 0, 'online': 1, 'mitra': 2}
        if isinstance(value, str):
            return mapping[value.lower()]
        elif isinstance(value, int):
            if value in mapping.values():
                return value
            else:
                raise ValueError("Invalid integer value for saluran_distribusi")
        else:
            raise ValueError("Invalid type for saluran_distribusi")

    @validator('metode_pembayaran', pre=True)
    def encode_pembayaran(cls, value):
        mapping = {'bulanan': 0, 'tahunan': 1, 'sekali bayar': 2}
        if isinstance(value, str):
            return mapping[value.lower()]
        elif isinstance(value, int):
            if value in mapping.values():
                return value
            else:
                raise ValueError("Invalid integer value for metode_pembayaran")
        else:
            raise ValueError("Invalid type for metode_pembayaran")

    @validator('wilayah', pre=True)
    def encode_wilayah(cls, value):
        mapping = {'rendah': 0, 'sedang': 1, 'tinggi': 2}
        if isinstance(value, str):
            return mapping[value.lower()]
        elif isinstance(value, int):
            if value in mapping.values():
                return value
            else:
                raise ValueError("Invalid integer value for wilayah")
        else:
            raise ValueError("Invalid type for wilayah")

    @validator('pengemudi_kedua', pre=True)
    def encode_pengemudi(cls, value):
        mapping = {'tidak ada': 0, 'ada': 1}
        if isinstance(value, str):
            return mapping[value.lower()]
        elif isinstance(value, int):
            if value in mapping.values():
                return value
            else:
                raise ValueError("Invalid integer value for pengemudi_kedua")
        else:
            raise ValueError("Invalid type for pengemudi_kedua")



class KendaraanRekomendasiInput(BaseModel):
    user_id: str
    premi_asuransi: float


# ========= ASURANSI PROPERTI =========
class PropertiInput(BaseModel):
    perlindungan_isi_rumah: Union[str, int]
    alarm_terpasang: Union[str, int]
    risiko_banjir: Union[str, int]
    keamanan_lingkungan: Union[str, int]
    jenis_kepemilikan: Union[str, int]
    tipe_properti: Union[str, int]
    risiko_penurunan_tanah: Union[str, int]
    tahun_dibangun: int

    @validator('*', pre=True)
    def lower_strip(cls, v):
        if isinstance(v, str):
            return v.lower().strip()
        return v

    @validator('perlindungan_isi_rumah', 'alarm_terpasang', 'risiko_banjir', 'keamanan_lingkungan', 'risiko_penurunan_tanah', pre=True)
    def map_ya_tidak(cls, value):
        mapping = {'ya': 0, 'tidak': 1}
        if value in mapping:
            return mapping[value]
        raise ValueError("Input harus 'ya' atau 'tidak'")

    @validator('jenis_kepemilikan', pre=True)
    def map_jenis_kepemilikan(cls, value):
        mapping = {
            'lainnya': 1, 'hak milik': 2, 'sewa': 3, 'warisan / hibah': 4,
            'rumah dinas': 5, 'kpr': 6, 'kontrak': 7, 'hgb': 8,
            'sewa beli': 9
        }
        if value in mapping:
            return mapping[value]
        raise ValueError("Jenis kepemilikan tidak valid")

    @validator('tipe_properti', pre=True)
    def map_tipe_properti(cls, value):
        mapping = {
            'rumah tunggal': 1, 'apartemen': 2, 'rumah susun': 3,
            'rumah terpisah': 4, 'ruko': 5, 'vila': 6, 'kios': 7,
            'petak': 8, 'studio': 9, 'kontrakan': 10
        }
        if value in mapping:
            return mapping[value]
        raise ValueError("Tipe properti tidak valid")


class PropertiRekomendasiInput(BaseModel):
    user_id: str
    premi_asuransi: float

