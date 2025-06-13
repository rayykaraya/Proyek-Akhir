// import React, { useState } from 'react';

// // Logika perhitungan premi yang diperluas
// const hitungPremiKendaraan = (data) => {
//   const tarifDasar = 0.025;
//   let premi = data.harga * tarifDasar;

//   // Faktor umur kendaraan
//   if (data.umur > 10) premi *= 1.5;
//   else if (data.umur > 5) premi *= 1.25;

//   // Faktor usia pemilik
//   if (data.usia < 25) premi *= 1.3;
//   else if (data.usia > 60) premi *= 1.2;

//   // Faktor lokasi/wilayah
//   if (data.wilayah === 'tinggi') premi *= 1.4;
//   else if (data.wilayah === 'sedang') premi *= 1.15;

//   // Faktor metode pembayaran
//   if (data.metodePembayaran === 'bulanan') premi *= 1.1;
//   else if (data.metodePembayaran === 'sekali bayar') premi *= 0.95;

//   // Faktor kapasitas silinder
//   if (data.kapasitasSilinder > 2000) premi *= 1.3;
//   else if (data.kapasitasSilinder > 1500) premi *= 1.15;

//   // Faktor nilai kendaraan
//   if (data.nilaiKendaraan > 500000000) premi *= 1.2;
//   else if (data.nilaiKendaraan < 100000000) premi *= 0.9;

//   // Faktor jumlah pintu
//   if (data.jumlahPintu <= 2) premi *= 1.1;

//   // Faktor jenis bahan bakar
//   if (data.jenisBahanBakar === '1.0') premi *= 0.95; // Premium/Pertamax

//   // Faktor berat kendaraan
//   if (data.beratKendaraan > 2000) premi *= 1.15;

//   // Faktor penggemudi kedua
//   if (data.pengemudiKedua === 'ada') premi *= 1.1;

//   // Faktor daya mesin
//   if (data.dayaMesin > 150) premi *= 1.2;
//   else if (data.dayaMesin > 100) premi *= 1.1;

//   // Minimum premi
//   if (premi < 200000) premi = 200000;

//   return premi;
// };

// function KendaraanPage() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Step 1: Data Dasar Kendaraan
//     saluran_distribusi: 'agen',
//     lama_menjadi_pelanggan: '',
//     metode_pembayaran: 'bulanan',
//     wilayah: 'rendah',

//     // Step 2: Detail Kendaraan
//     pengemudi_kedua: 'tidak ada',
//     tahun_pendaftaran_kendaraan: '',
//     daya_mesin: '',
//     kapasitas_silinder: '',

//     // Step 3: Spesifikasi Kendaraan
//     nilai_kendaraan: '',
//     jumlah_pintu: '',
//     jenis_bahan_bakar: '1.0',
//     berat_kendaraan: '',
//     usia: ''
//   });

//   const [hasilPremi, setHasilPremi] = useState(null);
//   const [levelRisiko, setLevelRisiko] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const nextStep = () => {
//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = {
//       harga: parseFloat(formData.nilai_kendaraan),
//       umur: new Date().getFullYear() - parseInt(formData.tahun_pendaftaran_kendaraan, 10),
//       usia: parseInt(formData.usia, 10),
//       wilayah: formData.wilayah,
//       metodePembayaran: formData.metode_pembayaran,
//       kapasitasSilinder: parseFloat(formData.kapasitas_silinder),
//       nilaiKendaraan: parseFloat(formData.nilai_kendaraan),
//       jumlahPintu: parseInt(formData.jumlah_pintu, 10),
//       jenisBahanBakar: formData.jenis_bahan_bakar,
//       beratKendaraan: parseFloat(formData.berat_kendaraan),
//       pengemudiKedua: formData.pengemudi_kedua,
//       dayaMesin: parseFloat(formData.daya_mesin)
//     };

//     // Validasi
//     if (isNaN(data.harga) || data.harga <= 0) {
//       alert('Nilai kendaraan harus diisi dengan angka positif.');
//       return;
//     }
//     if (isNaN(data.usia) || data.usia <= 0) {
//       alert('Usia harus diisi dengan angka positif.');
//       return;
//     }

//     const premi = hitungPremiKendaraan(data);
//     setHasilPremi(premi);

//     // Tentukan level risiko
//     if (premi > 8000000) setLevelRisiko('Tinggi');
//     else if (premi > 4000000) setLevelRisiko('Sedang');
//     else setLevelRisiko('Rendah');
//   };

//   const renderStep1 = () => (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold text-gray-700 mb-4">Step 1: Informasi Dasar</h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">
//             Saluran Distribusi
//           </label>
//           <select
//             name="saluran_distribusi"
//             value={formData.saluran_distribusi}
//             onChange={handleChange}
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-700 bg-white"
//           >
//             <option value="agen">Agen</option>
//             <option value="online">Online</option>
//             <option value="mitra">Mitra</option>
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">
//             Lama Menjadi Pelanggan (tahun)
//           </label>
//           <input
//             type="number"
//             name="lama_menjadi_pelanggan"
//             value={formData.lama_menjadi_pelanggan}
//             onChange={handleChange}
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-700"
//             placeholder="Contoh: 2"
//             min="0"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">
//             Metode Pembayaran
//           </label>
//           <select
//             name="metode_pembayaran"
//             value={formData.metode_pembayaran}
//             onChange={handleChange}
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-700 bg-white"
//           >
//             <option value="bulanan">Bulanan</option>
//             <option value="tahunan">Tahunan</option>
//             <option value="sekali bayar">Sekali Bayar</option>
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">
//             Tingkat Risiko Wilayah
//           </label>
//           <select
//             name="wilayah"
//             value={formData.wilayah}
//             onChange={handleChange}
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-700 bg-white"
//           >
//             <option value="rendah">Rendah</option>
//             <option value="sedang">Sedang</option>
//             <option value="tinggi">Tinggi</option>
//           </select>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <label className="block text-sm font-semibold text-gray-700">
//           Usia Pemilik
//         </label>
//         <input
//           type="number"
//           name="usia"
//           value={formData.usia}
//           onChange={handleChange}
//           className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-700"
//           placeholder="Contoh: 30"
//           min="17"
//           required
//         />
//       </div>
//     </div>
//   );

//   const renderStep2 = () => (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold text-gray-700 mb-4">Step 2: Detail Kendaraan</h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">
//             Apakah Ada Pengemudi Kedua?
//           </label>
//           <select
//             name="pengemudi_kedua"
//             value={formData.pengemudi_kedua}
//             onChange={handleChange}
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-700 bg-white"
//           >
//             <option value="tidak ada">Tidak Ada</option>
//             <option value="ada">Ada</option>
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">
//             Tahun Pendaftaran Kendaraan
//           </label>
//           <input
//             type="number"
//             name="tahun_pendaftaran_kendaraan"
//             value={formData.tahun_pendaftaran_kendaraan}
//             onChange={handleChange}
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-700"
//             placeholder="Contoh: 2018"
//             min="1990"
//             max="2025"
//             required
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">
//             Daya Mesin (CC)
//           </label>
//           <input
//             type="number"
//             name="daya_mesin"
//             value={formData.daya_mesin}
//             onChange={handleChange}
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-700"
//             placeholder="Contoh: 120"
//             min="0"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">
//             Kapasitas Silinder
//           </label>
//           <input
//             type="number"
//             name="kapasitas_silinder"
//             value={formData.kapasitas_silinder}
//             onChange={handleChange}
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-700"
//             placeholder="Contoh: 1500"
//             min="0"
//             required
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const renderStep3 = () => (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold text-gray-700 mb-4">Step 3: Spesifikasi Kendaraan</h3>

//       <div className="space-y-2">
//         <label className="block text-sm font-semibold text-gray-700">
//           Nilai Kendaraan (dalam juta rupiah)
//         </label>
//         <div className="relative">
//           <span className="absolute left-3 top-2.5 text-gray-500 font-medium">Rp</span>
//           <input
//             type="number"
//             name="nilai_kendaraan"
//             value={formData.nilai_kendaraan}
//             onChange={handleChange}
//             className="w-full px-4.5 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-700"
//             placeholder="Contoh: 150500000"
//             min="0"
//             required
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">
//             Jumlah Pintu Kendaraan
//           </label>
//           <input
//             type="number"
//             name="jumlah_pintu"
//             value={formData.jumlah_pintu}
//             onChange={handleChange}
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-700"
//             placeholder="Contoh: 4"
//             min="2"
//             max="6"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">
//             Jenis Bahan Bakar (kode numerik)
//           </label>
//           <select
//             name="jenis_bahan_bakar"
//             value={formData.jenis_bahan_bakar}
//             onChange={handleChange}
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-700 bg-white"
//           >
//             <option value="1.0">1.0 (Premium/Pertamax)</option>
//             <option value="0.8">0.8 (Solar)</option>
//             <option value="0.9">0.9 (Pertalite)</option>
//           </select>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <label className="block text-sm font-semibold text-gray-700">
//           Berat Kendaraan (kg)
//         </label>
//         <input
//           type="number"
//           name="beratKendaraan"
//           value={formData.beratKendaraan}
//           onChange={handleChange}
//           className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-700"
//           placeholder="Contoh: 1200"
//           min="0"
//           required
//         />
//       </div>
//     </div>
//   );

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return renderStep1();
//       case 2:
//         return renderStep2();
//       case 3:
//         return renderStep3();
//       default:
//         return renderStep1();
//     }
//   };

//   return (
//     <div>
//       <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-center">
//           <h1 className="text-2xl font-bold text-white mb-2">
//             Perhitungan Premi Asuransi Kendaraan
//           </h1>
//           <p className="text-orange-100 opacity-90">
//             Hitung premi asuransi kendaraan berdasarkan profil risiko Anda
//           </p>

//           {/* Progress Indicator */}
//           <div className="flex justify-center mt-4 space-x-2">
//             {[1, 2, 3].map((step) => (
//               <div
//                 key={step}
//                 className={`w-3 h-3 rounded-full ${
//                   step <= currentStep ? 'bg-white' : 'bg-orange-400'
//                 }`}
//               />
//             ))}
//           </div>
//           <p className="text-sm text-orange-100 mt-2">
//             Step {currentStep} dari 3
//           </p>
//         </div>

//         <div className="p-6">
//           <div className="grid lg:grid-cols-2 gap-8">
//             {/* Form Section */}
//             <div className="space-y-6">
//               <div onSubmit={handleSubmit} className="space-y-4">
//                 {renderStepContent()}

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between pt-4">
//                   {currentStep > 1 && (
//                     <button
//                       type="button"
//                       onClick={prevStep}
//                       className="bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
//                     >
//                       Kembali
//                     </button>
//                   )}

//                   {currentStep < 3 ? (
//                     <button
//                       type="button"
//                       onClick={nextStep}
//                       className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-700 hover:to-red-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl ml-auto"
//                     >
//                       Lanjut
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       onClick={handleSubmit}
//                       className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-700 hover:to-red-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl ml-auto"
//                     >
//                       Hitung Premi
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Results Section */}
//             <div className="flex items-center justify-center">
//               {hasilPremi !== null ? (
//                 <div className="w-full p-6 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl text-white text-center">
//                   <h2 className="text-xl font-bold mb-4">Hasil Perhitungan</h2>
//                   <div className="space-y-3">
//                     <p className="text-base opacity-90">Risiko: {levelRisiko}</p>
//                     <div className="text-3xl font-bold">
//                       Rp {hasilPremi.toLocaleString('id-ID')}
//                       <span className="text-sm font-normal opacity-75 block mt-1">per tahun</span>
//                     </div>
//                     <button
//                       onClick={() => window.location.href = '/rekomendasi/kendaraan'}
//                       className="inline-block mt-4 bg-white text-orange-600 font-semibold py-2.5 px-6 rounded-lg hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-200 shadow-lg cursor-pointer border-0"
//                     >
//                       Lihat Rekomendasi
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="w-full p-8 border-2 border-dashed border-gray-300 rounded-2xl text-center">
//                   <div className="text-gray-400">
//                     <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12a3 3 0 110-6 3 3 0 010 6zm-7 9a7 7 0 1114 0H3z M13 16h8m0 0V8m0 8l-8-8-4 4-6-6" />
//                     </svg>
//                     <p className="text-lg font-medium text-gray-500">Hasil Perhitungan</p>
//                     <p className="text-sm text-gray-400 mt-1">Lengkapi semua step untuk melihat estimasi premi kendaraan</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default KendaraanPage;

import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { BuildingOffice, FirstAidKit, Car } from "@phosphor-icons/react";
import axios from 'axios';

function KendaraanPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    saluran_distribusi: '0', 
    lama_menjadi_pelanggan: '',
    metode_pembayaran: '0', 
    wilayah: '0', 
    pengemudi_kedua: '0', 
    tahun_pendaftaran_kendaraan: '',
    daya_mesin: '',
    kapasitas_silinder: '',
    nilai_kendaraan: '',
    jumlah_pintu: '',
    jenis_bahan_bakar: '0.0', 
    berat_kendaraan: '',
    usia: ''
  });

  const [hasilPremi, setHasilPremi] = useState(null);
  const [levelRisiko, setLevelRisiko] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  const data = {
    saluran_distribusi: parseInt(formData.saluran_distribusi, 10),
    lama_menjadi_pelanggan: parseInt(formData.lama_menjadi_pelanggan, 10),
    metode_pembayaran: parseInt(formData.metode_pembayaran, 10),
    wilayah: parseInt(formData.wilayah, 10),
    pengemudi_kedua: parseInt(formData.pengemudi_kedua, 10),
    tahun_pendaftaran_kendaraan: parseInt(formData.tahun_pendaftaran_kendaraan, 10),
    daya_mesin: parseInt(formData.daya_mesin, 10),
    kapasitas_silinder: parseInt(formData.kapasitas_silinder, 10),
    nilai_kendaraan: parseFloat(formData.nilai_kendaraan),
    jumlah_pintu: parseInt(formData.jumlah_pintu, 10),
    jenis_bahan_bakar: parseFloat(formData.jenis_bahan_bakar),  // jika API terima float
    berat_kendaraan: parseInt(formData.berat_kendaraan, 10),
    usia: parseInt(formData.usia, 10),
  };


    // Validasi
    if (isNaN(data.nilai_kendaraan) || data.nilai_kendaraan <= 0) {
      alert('Nilai kendaraan harus diisi dengan angka positif.');
      return;
    }
    if (isNaN(data.usia) || data.usia <= 0) {
      alert('Usia harus diisi dengan angka positif.');
      return;
    }

    console.log("Payload dikirim ke FastAPI:", data);

    try {
      const response = await axios.post('/predict/kendaraan', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;
      setHasilPremi(result.premi);
      setLevelRisiko(result.risiko);

    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Gagal menghitung premi. Coba lagi nanti.');
    }
  };

 const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Informasi Dasar</h3>
        <p className="text-gray-600">Masukkan data pribadi Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Saluran Distribusi
          </label>
          <select
            name="saluran_distribusi"
            value={formData.saluran_distribusi}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700 bg-white hover:border-gray-300"
          >
            <option value="agen">Agen</option>
            <option value="online">Online</option>
            <option value="mitra">Mitra</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Lama Menjadi Pelanggan (tahun)
          </label>
          <input
            type="number"
            name="lama_menjadi_pelanggan"
            value={formData.lama_menjadi_pelanggan}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700 hover:border-gray-300"
            placeholder="Contoh: 2"
            min="0"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Metode Pembayaran
          </label>
          <select
            name="metode_pembayaran"
            value={formData.metode_pembayaran}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700 bg-white hover:border-gray-300"
          >
            <option value="bulanan">Bulanan</option>
            <option value="tahunan">Tahunan</option>
            <option value="sekali bayar">Sekali Bayar</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Tingkat Risiko Wilayah
          </label>
          <select
            name="wilayah"
            value={formData.wilayah}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700 bg-white hover:border-gray-300"
          >
            <option value="rendah">Rendah</option>
            <option value="sedang">Sedang</option>
            <option value="tinggi">Tinggi</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Usia Pemilik
        </label>
        <input
          type="number"
          name="usia"
          value={formData.usia}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700 hover:border-gray-300"
          placeholder="Contoh: 30"
          min="17"
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12a3 3 0 110-6 3 3 0 010 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Detail Kendaraan</h3>
        <p className="text-gray-600">Informasi spesifik tentang kendaraan Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Apakah Ada Pengemudi Kedua?
          </label>
          <select
            name="pengemudi_kedua"
            value={formData.pengemudi_kedua}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700 bg-white hover:border-gray-300"
          >
            <option value="tidak ada">Tidak Ada</option>
            <option value="ada">Ada</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Tahun Pendaftaran Kendaraan
          </label>
          <input
            type="number"
            name="tahun_pendaftaran_kendaraan"
            value={formData.tahun_pendaftaran_kendaraan}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700 hover:border-gray-300"
            placeholder="Contoh: 2018"
            min="1990"
            max="2025"
            required
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Daya Mesin (CC)
          </label>
          <input
            type="number"
            name="daya_mesin"
            value={formData.daya_mesin}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700 hover:border-gray-300"
            placeholder="Contoh: 120"
            min="0"
            required
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Kapasitas Silinder
          </label>
          <input
            type="number"
            name="kapasitas_silinder"
            value={formData.kapasitas_silinder}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700 hover:border-gray-300"
            placeholder="Contoh: 1500"
            min="0"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Spesifikasi Kendaraan</h3>
        <p className="text-gray-600">Detail teknis dan nilai kendaraan</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Nilai Kendaraan (dalam rupiah)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-4 text-gray-500 font-medium">Rp</span>
            <input
              type="number"
              name="nilai_kendaraan"
              value={formData.nilai_kendaraan}
              onChange={handleChange}
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700 hover:border-gray-300"
              placeholder="Contoh: 150500000"
              min="0"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Jumlah Pintu Kendaraan
            </label>
            <input
              type="number"
              name="jumlah_pintu"
              value={formData.jumlah_pintu}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700 hover:border-gray-300"
              placeholder="Contoh: 4"
              min="2"
              max="6"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Jenis Bahan Bakar
            </label>
            <select
              name="jenis_bahan_bakar"
              value={formData.jenis_bahan_bakar}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700 bg-white hover:border-gray-300"
            >
              <option value="0.0">Premium/Pertamax</option>
              <option value="1.0">Solar</option>
              <option value="2.0">Pertalite</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Berat Kendaraan (kg)
          </label>
          <input
            type="number"
            name="berat_kendaraan"
            value={formData.berat_kendaraan}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700 hover:border-gray-300"
            placeholder="Contoh: 1200"
            min="0"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Header dengan Gradien */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 pt-20 pb-32">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6 backdrop-blur-sm">
            <Car size={32} className='text-blue-600' />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Kalkulator Premi Asuransi Kendaraan
          </h1>
          <p className="text-xl text-blue-100 opacity-90 max-w-2xl mx-auto">
            Dapatkan estimasi premi asuransi kendaraan yang akurat berdasarkan profil risiko Anda
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative -mt-20 max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Progress Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 border-b border-gray-200">
            <div className="flex justify-center items-center space-x-4 mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      step === currentStep
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-110'
                        : step < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step < currentStep ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${
                        step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 font-medium">
              Step {currentStep} dari 3
            </p>
          </div>

          {/* Content - Form dan Hasil dalam Grid */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left Section - Form Content */}
              <div className="lg:col-span-2">
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-12">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center px-6 py-3 bg-gray-500 text-white font-semibold rounded-xl hover:bg-gray-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Kembali
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Lanjut
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Hitung Premi
                    </button>
                  )}
                </div>
              </div>

              {/* Right Section - Results Panel dalam kotak yang sama */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 h-full">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mb-4">
                      <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Hasil Perhitungan</h3>

                    {hasilPremi !== null ? (
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <p className="text-sm text-gray-600 mb-1">Level Risiko</p>
                          <p className={`text-lg font-bold ${
                            levelRisiko === 'Tinggi' ? 'text-red-600' :
                            levelRisiko === 'Sedang' ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {levelRisiko}
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-orange-200">
                          <p className="text-sm text-gray-600 mb-1">Estimasi Premi</p>
                          <div className="text-2xl font-bold text-orange-600">
                            Rp {hasilPremi.toLocaleString('id-ID')}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">per tahun</p>
                        </div>

                        <div className="pt-2">
                          {/* <button
                            onClick={() => window.location.href = '/rekomendasi/kendaraan'}
                            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                          >
                            Lihat Rekomendasi
                          </button> */}
                           <HashLink to="/rekomendasi/kendaraan">
                              <button
                                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                              >
                                Lihat Rekomendasi
                              </button>
                           </HashLink>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <p className="text-gray-500 text-sm text-center">
                            Lengkapi semua langkah untuk melihat estimasi premi
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="text-left">
                            <p className="text-sm text-gray-600 mb-2">Langkah {currentStep} dari 3</p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(currentStep / 3) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
      <div className="fixed bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="fixed top-40 right-20 w-12 h-12 bg-indigo-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
    </div>
  );
}

export default KendaraanPage;