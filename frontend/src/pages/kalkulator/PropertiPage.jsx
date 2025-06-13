// src/pages/kalkulator/PropertiPage.jsx

// import React, { useState } from 'react';
// import '/src/index.css'; // 1. Impor CSS terpusat yang sama
// import { Link } from 'react-router-dom'; // <-- Impor Link

// // Logika perhitungan premi tidak berubah
// const hitungPremiProperti = (data) => {
//   const tarifDasar = 0.0015;
//   let premi = data.hargaProperti * tarifDasar;
//   if (data.usiaBangunan > 20) premi *= 1.5;
//   else if (data.usiaBangunan > 10) premi *= 1.2;
//   if (data.luasBangunan > 200) premi *= 1.2;
//   else if (data.luasBangunan > 100) premi *= 1.1;
//   if (data.material === 'standar') premi *= 1.3;
//   if (data.lokasi === 'rawan_bencana') premi *= 2.0;
//   if (premi < 100000) premi = 100000;
//   return premi;
// };

// function PropertiPage() {
//   const [formData, setFormData] = useState({
//     usiaBangunan: '',
//     luasBangunan: '',
//     hargaProperti: '',
//     materialBangunan: 'standar',
//     lokasi: 'aman',
//   });
//   const [hasilPremi, setHasilPremi] = useState(null);

//   // 2. Tambahkan state baru untuk level risiko
//   const [levelRisiko, setLevelRisiko] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = {
//       hargaProperti: parseFloat(formData.hargaProperti),
//       luasBangunan: parseFloat(formData.luasBangunan),
//       usiaBangunan: parseInt(formData.usiaBangunan, 10),
//       material: formData.materialBangunan,
//       lokasi: formData.lokasi,
//     };

//     if (isNaN(data.hargaProperti) || isNaN(data.luasBangunan) || isNaN(data.usiaBangunan) ||
//         data.hargaProperti <= 0 || data.luasBangunan <= 0 || data.usiaBangunan < 0) {
//       alert('Input harga, luas, dan usia bangunan harus angka positif.');
//       return;
//     }

//     const premi = hitungPremiProperti(data);
//     setHasilPremi(premi);

//     // 3. Update handleSubmit untuk menentukan level risiko
//     // Anda bisa sesuaikan angka ini sesuai kebutuhan untuk premi properti
//     if (premi > 3000000) setLevelRisiko('Tinggi');
//     else if (premi > 1500000) setLevelRisiko('Sedang');
//     else setLevelRisiko('Rendah');

//     // ... (Logika logUserActivity Anda bisa ditambahkan di sini) ...
//   };

//   return (
//     <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
//   {/* Header */}
//   <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
//     <h1 className="text-2xl font-bold text-white mb-2">
//       Perhitungan Premi Asuransi Properti
//     </h1>
//     <p className="text-indigo-100 opacity-90">
//       Hitung premi asuransi properti Anda dengan mudah
//     </p>
//   </div>

//   <div className="p-6">
//     <div className="grid lg:grid-cols-2 gap-7">
//       {/* Form Section */}
//       <div className="space-y-6">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Row 1: Umur & Luas Bangunan */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label htmlFor="usiaBangunan" className="block text-sm font-semibold text-gray-700">
//                 Umur Bangunan (Tahun)
//               </label>
//               <input
//                 type="number"
//                 id="usiaBangunan"
//                 name="usiaBangunan"
//                 value={formData.usiaBangunan}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
//                 placeholder="Umur bangunan"
//               />
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="luasBangunan" className="block text-sm font-semibold text-gray-700">
//                 Luas Bangunan (meter²)
//               </label>
//               <div className="relative">
//                 <input
//                   type="number"
//                   id="luasBangunan"
//                   name="luasBangunan"
//                   value={formData.luasBangunan}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
//                   placeholder="Luas bangunan"
//                 />
//                 <span className="absolute right-2 top-2.5 text-gray-500 font-medium">m²</span>
//               </div>
//             </div>
//           </div>

//           {/* Harga Properti */}
//           <div className="space-y-2">
//             <label htmlFor="hargaProperti" className="block text-sm font-semibold text-gray-700">
//               Harga Properti
//             </label>
//             <div className="relative">
//               <span className="absolute left-3 top-2.5 text-gray-500 font-medium">Rp</span>
//               <input
//                 type="number"
//                 id="hargaProperti"
//                 name="hargaProperti"
//                 value={formData.hargaProperti}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4.5 py-2.5 pl-9 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
//                 placeholder="Masukkan harga properti"
//               />
//             </div>
//           </div>

//           {/* Row 2: Material & Lokasi */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label htmlFor="materialBangunan" className="block text-sm font-semibold text-gray-700">
//                 Tipe Material
//               </label>
//               <select
//                 id="materialBangunan"
//                 name="materialBangunan"
//                 value={formData.materialBangunan}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700 bg-white"
//               >
//                 <option value="standar">Standar</option>
//                 <option value="tahan_api">Tahan Api</option>
//               </select>
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="lokasi" className="block text-sm font-semibold text-gray-700">
//                 Lokasi
//               </label>
//               <select
//                 id="lokasi"
//                 name="lokasi"
//                 value={formData.lokasi}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700 bg-white"
//               >
//                 <option value="aman">Aman</option>
//                 <option value="rawan_bencana">Rawan Bencana</option>
//               </select>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
//           >
//             Hitung Premi
//           </button>
//         </form>
//       </div>

//       {/* Results Section */}
//       <div className="flex items-center justify-center">
//         {hasilPremi !== null ? (
//           <div className="w-full p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-white text-center">
//             <h2 className="text-xl font-bold mb-4">Hasil Perhitungan</h2>
//             <div className="space-y-3">
//               <p className="text-base opacity-90">{levelRisiko}</p>
//               <div className="text-3xl font-bold">
//                 Rp {hasilPremi.toLocaleString('id-ID')}
//                 <span className="text-sm font-normal opacity-75 block mt-1">per tahun</span>
//               </div>
//               <Link
//                 to="/rekomendasi/properti"
//                 className="inline-block mt-4 bg-white text-green-600 font-semibold py-2.5 px-6 rounded-lg hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-200 shadow-lg no-underline"
//               >
//                 Lihat Rekomendasi
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div className="w-full p-8 border-2 border-dashed border-gray-300 rounded-2xl text-center">
//             <div className="text-gray-400">
//               <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//               </svg>
//               <p className="text-lg font-medium text-gray-500">Hasil Perhitungan</p>
//               <p className="text-sm text-gray-400 mt-1">Isi form untuk melihat estimasi premi</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// </div>
//   );
// }

// export default PropertiPage;

import React, { useState } from 'react';
import { Heart, Calculator, Home, Shield, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { BuildingOffice, FirstAidKit, Car } from "@phosphor-icons/react";
import axios from 'axios';

function PropertiPage() {
  const [formData, setFormData] = useState({
    perlindunganRumah: '',
    alarmTerpasang: '',
    risikoBanjir: '',
    keamananLingkungan: '',
    jenisKepemilikan: '',
    tipeProperti: '',
    risikoPenurunanTanah: '',
    tahunDibangun: '',
  });

  const [hasilPremi, setHasilPremi] = useState(null);
  const [levelRisiko, setLevelRisiko] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.perlindunganRumah) newErrors.perlindunganRumah = 'Pilih perlindungan rumah';
      if (!formData.alarmTerpasang) newErrors.alarmTerpasang = 'Pilih status alarm terpasang';
      if (!formData.risikoBanjir) newErrors.risikoBanjir = 'Pilih risiko banjir';
      if (!formData.keamananLingkungan) newErrors.keamananLingkungan = 'Pilih keamanan lingkungan';
    }

    if (step === 2) {
      if (!formData.jenisKepemilikan) newErrors.jenisKepemilikan = 'Pilih jenis kepemilikan';
      if (!formData.tipeProperti) newErrors.tipeProperti = 'Pilih tipe properti';
      if (!formData.risikoPenurunanTanah) newErrors.risikoPenurunanTanah = 'Pilih risiko penurunan tanah';
    }

    if (step === 3) {
      if (!formData.tahunDibangun) newErrors.tahunDibangun = 'Masukkan tahun dibangun';
      if (formData.tahunDibangun && (formData.tahunDibangun < 1900 || formData.tahunDibangun > new Date().getFullYear())) {
        newErrors.tahunDibangun = 'Tahun tidak valid';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    const toLower = (val) => (typeof val === 'string' ? val.toLowerCase().trim() : val);

    const payload = {
      perlindungan_isi_rumah: formData.perlindunganRumah.toLowerCase(),
      alarm_terpasang: formData.alarmTerpasang.toLowerCase(),
      risiko_banjir: formData.risikoBanjir.toLowerCase(),
      keamanan_lingkungan: formData.keamananLingkungan.toLowerCase(),
      jenis_kepemilikan: formData.jenisKepemilikan.toLowerCase(),
      tipe_properti: formData.tipeProperti.toLowerCase(),
      risiko_penurunan_tanah: formData.risikoPenurunanTanah.toLowerCase(),
      tahun_dibangun: parseInt(formData.tahunDibangun, 10),
    };
    console.log("Payload dikirim ke FastAPI:", payload);


    try {
      const response = await axios.post('/predict/properti', payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
      setHasilPremi(response.data.premi);
      setLevelRisiko(response.data.risiko);
      setCurrentStep(4); // pindah ke hasil
    } catch (error) {
      console.error("Submit error:", error);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  // Tambahkan fungsi handlePrev di sini
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };


  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <Shield className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Keamanan & Perlindungan</h2>
          <p className="text-gray-600">Informasi keamanan properti Anda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Perlindungan isi rumah?
          </label>
          <select
            name="perlindunganRumah"
            value={formData.perlindunganRumah}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 bg-white ${errors.perlindunganRumah ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Pilih...</option>
            <option value="ya">Ya</option>
            <option value="tidak">Tidak</option>
          </select>
          {errors.perlindunganRumah && <p className="text-red-500 text-sm">{errors.perlindunganRumah}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Alarm terpasang?
          </label>
          <select
            name="alarmTerpasang"
            value={formData.alarmTerpasang}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 bg-white ${errors.alarmTerpasang ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Pilih...</option>
            <option value="ya">Ya</option>
            <option value="tidak">Tidak</option>
          </select>
          {errors.alarmTerpasang && <p className="text-red-500 text-sm">{errors.alarmTerpasang}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Risiko banjir di lingkungan?
          </label>
          <select
            name="risikoBanjir"
            value={formData.risikoBanjir}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 bg-white ${errors.risikoBanjir ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Pilih...</option>
            <option value="ya">Ya</option>
            <option value="tidak">Tidak</option>
          </select>
          {errors.risikoBanjir && <p className="text-red-500 text-sm">{errors.risikoBanjir}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Keamanan lingkungan baik?
          </label>
          <select
            name="keamananLingkungan"
            value={formData.keamananLingkungan}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 bg-white ${errors.keamananLingkungan ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Pilih...</option>
            <option value="ya">Ya</option>
            <option value="tidak">Tidak</option>
          </select>
          {errors.keamananLingkungan && <p className="text-red-500 text-sm">{errors.keamananLingkungan}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <Home className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Informasi Properti</h2>
          <p className="text-gray-600">Detail kepemilikan dan tipe properti</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Jenis kepemilikan properti
          </label>
          <select
            name="jenisKepemilikan"
            value={formData.jenisKepemilikan}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 bg-white ${errors.jenisKepemilikan ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Pilih...</option>
            <option value="milik">hak milik</option>
            <option value="sewa">sewa</option>
            <option value="warisan / hibah">warisan / hibah</option>
            <option value="rumah dinas">rumah dinas</option>
            <option value="kpr">kpr</option>
            <option value="kontrak">kontrak</option>
            <option value="hgb">hgb</option>
            <option value="sewa beli">sewa beli</option>
            <option value="lainnya">lainnya</option>
          </select>
          {errors.jenisKepemilikan && <p className="text-red-500 text-sm">{errors.jenisKepemilikan}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Tipe properti
          </label>
          <select
            name="tipeProperti"
            value={formData.tipeProperti}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 bg-white ${errors.tipeProperti ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Pilih...</option>
            <option value="rumah tunggal">rumah tunggal</option>
            <option value="apartemen">apartemen</option>
            <option value="rumah susun">rumah susun</option>
            <option value="rumah terpisah">rumah terpisah</option>
            <option value="ruko">ruko</option>
            <option value="vila">vila</option>
            <option value="kios">kios</option>
            <option value="petak">petak</option>
            <option value="studio">studio</option>
            <option value="kontrakan">kontrakan</option>
          </select>
          {errors.tipeProperti && <p className="text-red-500 text-sm">{errors.tipeProperti}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Risiko penurunan tanah?
          </label>
          <select
            name="risikoPenurunanTanah"
            value={formData.risikoPenurunanTanah}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 bg-white ${errors.risikoPenurunanTanah ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Pilih...</option>
            <option value="ya">Ya</option>
            <option value="tidak">Tidak</option>
          </select>
          {errors.risikoPenurunanTanah && <p className="text-red-500 text-sm">{errors.risikoPenurunanTanah}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <Calculator className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Detail Teknis</h2>
          <p className="text-gray-600">Informasi teknis dan valuasi properti</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Tahun dibangun
          </label>
          <input
            type="number"
            name="tahunDibangun"
            value={formData.tahunDibangun}
            onChange={handleChange}
            placeholder="Contoh: 2015, 2020"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 ${errors.tahunDibangun ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.tahunDibangun && <p className="text-red-500 text-sm">{errors.tahunDibangun}</p>}
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
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500">
      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2"></div>
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white rounded-full translate-y-1/2"></div>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 text-center px-8 py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-8">
            <BuildingOffice size={32} className='text-blue-600' />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Kalkulator Premi Asuransi Properti
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Dapatkan estimasi premi asuransi properti yang akurat berdasarkan profil risiko Anda
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-8 pb-16">
        <div className=" max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  1
                </div>
                <span className="text-white text-sm mt-2">Keamanan</span>
              </div>

              {/* Connector */}
              <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  2
                </div>
                <span className="text-white text-sm mt-2">Properti</span>
              </div>

              {/* Connector */}
              <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  3
                </div>
                <span className="text-white text-sm mt-2">Detail Teknis</span>
              </div>

              {/* Connector */}
              <div className={`w-16 h-1 ${currentStep >= 4 ? 'bg-green-500' : 'bg-gray-300'}`}></div>

              {/* Step 4 */}
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 4 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  4
                </div>
                <span className="text-white text-sm mt-2">Hasil</span>
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-95">
            <div className="grid lg:grid-cols-2 min-h-[600px]">
              {/* Left Side - Form */}
              <div className="p-8 lg:p-12">
                {currentStep <= 3 ? (
                  <form onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()}>
                    {renderStepContent()}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 space-x-4">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
                        >
                          <ChevronLeft className="w-5 h-5" />
                          <span>Kembali</span>
                        </button>
                      )}

                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="flex items-center space-x-2 ml-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <span>Lanjut</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="flex items-center space-x-2 ml-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <Calculator className="w-5 h-5" />
                          <span>Hitung Premi</span>
                        </button>
                      )}
                    </div>
                  </form>
                ) : null}
              </div>

              {/* Right Side - Results */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 lg:p-12 flex items-center justify-center">
                {hasilPremi !== null ? (
                  <div className="w-full max-w-md">
                    <div className="text-center mb-8 ">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Hasil Perhitungan</h3>
                      <p className="text-gray-600">Estimasi premi asuransi properti Anda</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="text-center mb-6">
                        <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                          levelRisiko === 'Tinggi' ? 'bg-red-100 text-red-800' :
                          levelRisiko === 'Sedang' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          Risiko {levelRisiko}
                        </div>
                        <div className="text-4xl font-bold text-gray-800 mb-2">
                          Rp {hasilPremi.toLocaleString('id-ID')}
                        </div>
                        <p className="text-gray-600">per tahun</p>
                      </div>

                      {/* <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg">
                        Lihat Rekomendasi
                      </button> */}
                      <HashLink to="/rekomendasi/properti">
                          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg">
                            Lihat Rekomendasi
                          </button>
                      </HashLink>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Calculator className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Hasil Perhitungan</h3>
                    <p className="text-gray-500">Lengkapi form untuk melihat estimasi premi asuransi properti Anda</p>

                    {/* Progress indicator */}
                    <div className="mt-6">
                      <div className="text-sm text-gray-600 mb-2">
                        Langkah {currentStep} dari 3
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(currentStep / 3) * 100}%` }}
                        ></div>
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
  );
}

export default PropertiPage;