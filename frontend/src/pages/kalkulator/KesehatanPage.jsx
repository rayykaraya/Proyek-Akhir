// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// // Logika perhitungan premi yang diperluas
// const hitungPremiKesehatan = (data) => {
//   let premiBulanan = data.penghasilan * 0.05;

//   // Faktor usia
//   const faktorUsia = 1 + (data.usia / 100);
//   premiBulanan *= faktorUsia;

//   // Faktor BMI
//   if (data.bmi < 18.5) premiBulanan *= 1.1;
//   else if (data.bmi >= 25 && data.bmi < 30) premiBulanan *= 1.3;
//   else if (data.bmi >= 30) premiBulanan *= 1.7;

//   // Faktor penyakit dan kondisi kesehatan
//   if (data.penyakitKronis === 'ya') premiBulanan *= 2.5;
//   if (data.merokok === 'ya') premiBulanan *= 1.8;
//   if (data.diabetes === 'ya') premiBulanan *= 2.2;
//   if (data.tekananDarah === 'ya') premiBulanan *= 1.9;
//   if (data.transplantasi === 'ya') premiBulanan *= 3.0;
//   if (data.alergi === 'ya') premiBulanan *= 1.2;
//   if (data.kanker === 'ya') premiBulanan *= 4.0;

//   // Faktor operasi besar
//   if (data.operasiBesar > 0) {
//     premiBulanan *= (1 + (data.operasiBesar * 0.3));
//   }

//   // Minimum premi
//   if (premiBulanan < 250000) premiBulanan = 250000;

//   return Math.round(premiBulanan);
// };

// function KesehatanPage() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Step 1 - Data Dasar
//     usia: '',
//     penghasilan: '',
//     tinggiBadan: '',
//     beratBadan: '',

//     // Step 2 - Riwayat Penyakit
//     diabetes: 'tidak',
//     tekananDarah: 'tidak',
//     transplantasi: 'tidak',
//     penyakitKronis: 'tidak',

//     // Step 3 - Gaya Hidup & Riwayat Medis
//     merokok: 'tidak',
//     alergi: 'tidak',
//     kanker: 'tidak',
//     operasiBesar: ''
//   });

//   const [hasilPremi, setHasilPremi] = useState(null);
//   const [levelRisiko, setLevelRisiko] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const nextStep = () => {
//     setCurrentStep(prev => Math.min(prev + 1, 3));
//   };

//   const prevStep = () => {
//     setCurrentStep(prev => Math.max(prev - 1, 1));
//   };

//   const calculateBMI = () => {
//     const tinggi = parseFloat(formData.tinggiBadan) / 100; // convert cm to m
//     const berat = parseFloat(formData.beratBadan);
//     if (tinggi && berat) {
//       return berat / (tinggi * tinggi);
//     }
//     return 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const bmi = calculateBMI();
//     const data = {
//       usia: parseInt(formData.usia, 10),
//       penghasilan: parseFloat(formData.penghasilan),
//       bmi: bmi,
//       diabetes: formData.diabetes,
//       tekananDarah: formData.tekananDarah,
//       transplantasi: formData.transplantasi,
//       penyakitKronis: formData.penyakitKronis,
//       merokok: formData.merokok,
//       alergi: formData.alergi,
//       kanker: formData.kanker,
//       operasiBesar: parseInt(formData.operasiBesar, 10) || 0,
//     };

//     if (isNaN(data.usia) || isNaN(data.penghasilan) || !data.bmi) {
//       alert("Input tidak valid! Pastikan semua kolom diisi dengan benar.");
//       return;
//     }

//     const premi = hitungPremiKesehatan(data);
//     setHasilPremi(premi);

//     // Menentukan level risiko
//     if (premi > 1500000) setLevelRisiko('Sangat Tinggi');
//     else if (premi > 1000000) setLevelRisiko('Tinggi');
//     else if (premi > 500000) setLevelRisiko('Sedang');
//     else setLevelRisiko('Rendah');
//   };

//   const renderStep1 = () => (
//     <div className="space-y-3">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Dasar</h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <label htmlFor="usia" className="block text-sm font-semibold text-gray-700">
//             Usia
//           </label>
//           <input
//             type="number"
//             id="usia"
//             name="usia"
//             value={formData.usia}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700"
//             placeholder="Masukkan usia"
//           />
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="penghasilan" className="block text-sm font-semibold text-gray-700">
//             Penghasilan Bulanan
//           </label>
//           <div className="relative">
//             <span className="absolute left-3 top-2.5 text-gray-500 font-medium">Rp</span>
//             <input
//               type="number"
//               id="penghasilan"
//               name="penghasilan"
//               value={formData.penghasilan}
//               onChange={handleChange}
//               required
//               className="w-full px-3.3 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700"
//               placeholder="penghasilan"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <label htmlFor="tinggiBadan" className="block text-sm font-semibold text-gray-700">
//             Tinggi Badan (cm)
//           </label>
//           <input
//             type="number"
//             id="tinggiBadan"
//             name="tinggiBadan"
//             value={formData.tinggiBadan}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700"
//             placeholder="150-200 cm"
//           />
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="beratBadan" className="block text-sm font-semibold text-gray-700">
//             Berat Badan (kg)
//           </label>
//           <input
//             type="number"
//             id="beratBadan"
//             name="beratBadan"
//             value={formData.beratBadan}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700"
//             placeholder="40-150 kg"
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const renderRadioGroup = (name, label, value) => (
//     <div className="space-y-2">
//       <label className="block text-sm font-semibold text-gray-700">
//         {label}
//       </label>
//       <div className="flex space-x-4">
//         <label className="flex items-center cursor-pointer">
//           <input
//             type="radio"
//             name={name}
//             value="ya"
//             checked={formData[name] === 'ya'}
//             onChange={handleChange}
//             className="sr-only"
//           />
//           <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
//             formData[name] === 'ya'
//               ? 'border-blue-500 bg-blue-500'
//               : 'border-gray-300'
//           }`}>
//             {formData[name] === 'ya' && (
//               <div className="w-2 h-2 rounded-full bg-white"></div>
//             )}
//           </div>
//           <span className="text-sm text-gray-700">Ya</span>
//         </label>
//         <label className="flex items-center cursor-pointer">
//           <input
//             type="radio"
//             name={name}
//             value="tidak"
//             checked={formData[name] === 'tidak'}
//             onChange={handleChange}
//             className="sr-only"
//           />
//           <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
//             formData[name] === 'tidak'
//               ? 'border-blue-500 bg-blue-500'
//               : 'border-gray-300'
//           }`}>
//             {formData[name] === 'tidak' && (
//               <div className="w-2 h-2 rounded-full bg-white"></div>
//             )}
//           </div>
//           <span className="text-sm text-gray-700">Tidak</span>
//         </label>
//       </div>
//     </div>
//   );

//   const renderStep2 = () => (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4">Riwayat Penyakit</h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {renderRadioGroup('diabetes', 'Apakah memiliki diabetes?')}
//         {renderRadioGroup('tekananDarah', 'Masalah tekanan darah?')}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {renderRadioGroup('transplantasi', 'Riwayat transplantasi organ?')}
//         {renderRadioGroup('penyakitKronis', 'Mengidap penyakit kronis?')}
//       </div>
//     </div>
//   );

//   const renderStep3 = () => (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4">Gaya Hidup & Riwayat Medis</h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {renderRadioGroup('merokok', 'Merokok')}
//         {renderRadioGroup('alergi', 'Memiliki alergi?')}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {renderRadioGroup('kanker', 'Riwayat kanker dalam keluarga?')}

//         <div className="space-y-2">
//           <label htmlFor="operasiBesar" className="block text-sm font-semibold text-gray-700">
//             Jumlah operasi besar yang pernah dijalani
//           </label>
//           <input
//             type="number"
//             id="operasiBesar"
//             name="operasiBesar"
//             value={formData.operasiBesar}
//             onChange={handleChange}
//             min="0"
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700"
//             placeholder="0"
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const renderNavigationButtons = () => {
//     if (currentStep === 1) {
//       return (
//         <button
//           type="button"
//           onClick={nextStep}
//           className="-translate-y-20 w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-cyan-700 transform transition-all duration-200 shadow-lg hover:shadow-xl"
//         >
//           Lanjut
//         </button>
//       );
//     } else if (currentStep === 2) {
//       return (
//         <div className="flex gap-4 mt-0">
//           <button
//             type="button"
//             onClick={prevStep}
//             className="-translate-y-20 flex-1 bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transform  transition-all duration-200 shadow-lg hover:shadow-xl"
//           >
//             Kembali
//           </button>
//           <button
//             type="button"
//             onClick={nextStep}
//             className="-translate-y-20 flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-cyan-700 transform  transition-all duration-200 shadow-lg hover:shadow-xl"
//           >
//             Lanjut
//           </button>
//         </div>
//       );
//     } else {
//       return (
//         <div className="flex gap-4">
//           <button
//             type="button"
//             onClick={prevStep}
//             className="-translate-y-20 flex-1 bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transform  transition-all duration-200 shadow-lg hover:shadow-xl"
//           >
//             Kembali
//           </button>
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             className="-translate-y-20 flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transform transition-all duration-200 shadow-lg hover:shadow-xl"
//           >
//             Hitung Premi
//           </button>
//         </div>
//       );
//     }
//   };

//   const renderStepIndicator = () => (
//     <div className="flex justify-center mb-6">
//       <div className="flex items-center space-x-4">
//         {[1, 2, 3].map((step) => (
//           <div key={step} className="flex items-center">
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
//               currentStep >= step
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-200 text-gray-500'
//             }`}>
//               {step}
//             </div>
//             {step < 3 && (
//               <div className={`w-8 h-1 mx-2 ${
//                 currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
//               }`}></div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden h-[550px]">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-center">
//           <h1 className="text-2xl font-bold text-white mb-2">
//             Perhitungan Premi Asuransi Kesehatan
//           </h1>
//           <p className="text-blue-100 opacity-90">
//             Isi profil risiko Anda untuk mendapatkan estimasi premi bulanan
//           </p>
//         </div>

//         <div className="p-6">
//           <div className="grid lg:grid-cols-2 gap-8">
//             {/* Form Section */}
//             <div className="space-y-6">
//               {renderStepIndicator()}

//               <div onSubmit={handleSubmit} className="space-y-6">
//                 <div className="min-h-[300px]">
//                   {currentStep === 1 && renderStep1()}
//                   {currentStep === 2 && renderStep2()}
//                   {currentStep === 3 && renderStep3()}
//                 </div>

//                 {renderNavigationButtons()}
//               </div>
//             </div>

//             {/* Results Section */}
//             <div className="flex items-center justify-center">
//               {hasilPremi !== null ? (
//                 <div className="w-full p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white text-center">
//                   <h2 className="text-xl font-bold mb-4">Hasil Perhitungan</h2>
//                   <div className="space-y-3">
//                     <p className="text-base opacity-90">Level Risiko: {levelRisiko}</p>
//                     <div className="text-3xl font-bold">
//                       Rp {hasilPremi.toLocaleString('id-ID')}
//                       <span className="text-sm font-normal opacity-75 block mt-1">per bulan</span>
//                     </div>
//                     <div className="text-sm opacity-80 mt-2">
//                       BMI: {calculateBMI().toFixed(1)}
//                     </div>
//                     <Link
//                       to="/rekomendasi/kesehatan"
//                       className="inline-block mt-4 bg-white text-orange-600 font-semibold py-2.5 px-6 rounded-lg hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-200 shadow-lg no-underline"
//                     >
//                       Lihat Rekomendasi
//                     </Link>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="w-full p-8 border-2 border-dashed border-gray-300 rounded-2xl text-center">
//                   <div className="text-gray-400">
//                     <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                     <p className="text-lg font-medium text-gray-500">Hasil Perhitungan</p>
//                     <p className="text-sm text-gray-400 mt-1">Lengkapi semua langkah untuk melihat estimasi premi</p>
//                     <div className="mt-4 text-xs text-gray-400">
//                       Langkah {currentStep} dari 3
//                     </div>
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

// export default KesehatanPage;


import React, { useState } from 'react';
import { Calculator, Heart, Users, TrendingUp, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { BuildingOffice, FirstAidKit, Car } from "@phosphor-icons/react";
import { HashLink } from 'react-router-hash-link';
import axios from 'axios';

function KesehatanPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    usia: '',
    tinggiBadan: '',
    beratBadan: '',
    diabetes: 'tidak',
    tekananDarah: 'tidak',
    transplantasi: 'tidak',
    penyakitKronis: 'tidak',
    alergi: 'tidak',
    kanker: 'tidak',
    operasiBesar: ''
  });

  const [hasilPremi, setHasilPremi] = useState(null);
  const [levelRisiko, setLevelRisiko] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const convertToBinary = (val) => val === 'ya' ? 1 : 0;
    const data = {
      usia: parseInt(formData.usia, 10),
      diabetes: formData.diabetes,
      masalah_tekanan_darah: formData.tekananDarah,
      riwayat_transplantasi: formData.transplantasi,
      penyakit_kronis: formData.penyakitKronis,
      alergi: formData.alergi,
      riwayat_kanker_keluarga: formData.kanker,
      jumlah_operasi_besar: parseInt(formData.operasiBesar, 10) || 0,
      tinggi_badan_cm: parseInt(formData.tinggiBadan, 10),
      berat_badan_kg: parseInt(formData.beratBadan, 10)
    };

    console.log("Payload dikirim ke FastAPI:", data);

    try {
          const response = await axios.post('/predict/kesehatan', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
    const result = response.data;
    setHasilPremi(result.premi);
    setLevelRisiko(result.risiko);

  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Gagal menghitung premi, coba lagi nanti.');
  }
};

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Users className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Informasi Dasar</h3>
        <p className="text-gray-600">Masukkan data pribadi Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="usia" className="block text-sm font-semibold text-gray-700">
            Usia (tahun)
          </label>
          <input
            type="number"
            id="usia"
            name="usia"
            value={formData.usia}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-gray-700 bg-gray-50 hover:bg-white"
            placeholder="25"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="tinggiBadan" className="block text-sm font-semibold text-gray-700">
            Tinggi Badan (cm)
          </label>
          <input
            type="number"
            id="tinggiBadan"
            name="tinggiBadan"
            value={formData.tinggiBadan}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-gray-700 bg-gray-50 hover:bg-white"
            placeholder="170"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="beratBadan" className="block text-sm font-semibold text-gray-700">
            Berat Badan (kg)
          </label>
          <input
            type="number"
            id="beratBadan"
            name="beratBadan"
            value={formData.beratBadan}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-gray-700 bg-gray-50 hover:bg-white"
            placeholder="65"
          />
        </div>
      </div>
    </div>
  );

  const renderRadioGroup = (name, label) => (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="flex space-x-4">
        <label className="flex items-center cursor-pointer group">
          <input
            type="radio"
            name={name}
            value="ya"
            checked={formData[name] === 'ya'}
            onChange={handleChange}
            className="sr-only"
          />
          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
            formData[name] === 'ya'
              ? 'border-blue-500 bg-blue-500 scale-110'
              : 'border-gray-300 group-hover:border-blue-300'
          }`}>
            {formData[name] === 'ya' && (
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            )}
          </div>
          <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">Ya</span>
        </label>
        <label className="flex items-center cursor-pointer group">
          <input
            type="radio"
            name={name}
            value="tidak"
            checked={formData[name] === 'tidak'}
            onChange={handleChange}
            className="sr-only"
          />
          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
            formData[name] === 'tidak'
              ? 'border-blue-500 bg-blue-500 scale-110'
              : 'border-gray-300 group-hover:border-blue-300'
          }`}>
            {formData[name] === 'tidak' && (
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            )}
          </div>
          <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">Tidak</span>
        </label>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <Heart className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Riwayat Penyakit</h3>
        <p className="text-gray-600">Informasi kondisi kesehatan Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderRadioGroup('diabetes', 'Apakah memiliki diabetes?')}
        {renderRadioGroup('tekananDarah', 'Masalah tekanan darah?')}
        {renderRadioGroup('transplantasi', 'Riwayat transplantasi organ?')}
        {renderRadioGroup('penyakitKronis', 'Mengidap penyakit kronis?')}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <TrendingUp className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Gaya Hidup & Riwayat Medis</h3>
        <p className="text-gray-600">Informasi tambahan untuk perhitungan akurat</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderRadioGroup('alergi', 'Memiliki alergi?')}
        {renderRadioGroup('kanker', 'Riwayat kanker dalam keluarga?')}

        <div className="space-y-3">
          <label htmlFor="operasiBesar" className="block text-sm font-semibold text-gray-700">
            Jumlah operasi besar yang pernah dijalani
          </label>
          <input
            type="number"
            id="operasiBesar"
            name="operasiBesar"
            value={formData.operasiBesar}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-gray-700 bg-gray-50 hover:bg-white"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );

  const renderNavigationButtons = () => {
    if (currentStep === 1) {
      return (
        <button
          type="button"
          onClick={nextStep}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
        >
          Lanjut
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      );
    } else if (currentStep === 2) {
      return (
        <div className="flex gap-4">
          <button
            type="button"
            onClick={prevStep}
            className="flex-1 bg-gray-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
          >
            <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
          >
            Lanjut
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex gap-4">
          <button
            type="button"
            onClick={prevStep}
            className="flex-1 bg-gray-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
          >
            <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
          >
            <Calculator className="mr-2 w-5 h-5" />
            Hitung Premi
          </button>
        </div>
      );
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
              currentStep >= step
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110'
                : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > step ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                step
              )}
              {currentStep === step && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-75"></div>
              )}
            </div>
            {step < 3 && (
              <div className={`w-16 h-2 mx-2 rounded-full transition-all duration-500 ${
                currentStep > step ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Rendah': return 'from-green-500 to-emerald-500';
      case 'Sedang': return 'from-yellow-500 to-orange-500';
      case 'Tinggi': return 'from-orange-500 to-red-500';
      case 'Sangat Tinggi': return 'from-red-500 to-pink-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 ">
            <FirstAidKit size={32} className='text-blue-600' />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Kalkulator Premi Asuransi Kesehatan
          </h1>
          <p className="text-xl text-blue-100 opacity-90 max-w-2xl mx-auto">
            Dapatkan estimasi premi asuransi kesehatan yang akurat berdasarkan profil risiko Anda
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-8">
        <div className="max-w-6xl mx-auto ">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Form Section */}
                <div className="space-y-8">
                  {renderStepIndicator()}

                  <div className="min-h-[400px]">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                  </div>

                  {renderNavigationButtons()}
                </div>

                {/* Results Section */}
                <div className="flex items-center justify-center">
                  {hasilPremi !== null ? (
                    <div className={`w-full p-8 bg-gradient-to-br ${getRiskColor(levelRisiko)} rounded-3xl text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-300`}>
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                        <Calculator className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold mb-6">Hasil Perhitungan</h2>
                      <div className="space-y-4">
                        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                          <p className="text-sm opacity-90 mb-2">Level Risiko</p>
                          <p className="text-xl font-bold">{levelRisiko}</p>
                        </div>
                        <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                          <p className="text-sm opacity-90 mb-2">Premi Bulanan</p>
                          <div className="text-4xl font-bold">
                            Rp {hasilPremi.toLocaleString('id-ID')}
                          </div>
                        </div>
                        {/* <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                          <p className="text-sm opacity-90 mb-2">BMI Anda</p>
                          <p className="text-xl font-bold">{calculateBMI().toFixed(1)}</p>
                        </div> */}
                        {/* <button className="w-full mt-6 bg-white text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                          Lihat Rekomendasi
                        </button> */}
                         <HashLink  to="/rekomendasi/kesehatan">
                            <button className="w-full mt-6 bg-white text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                              Lihat Rekomendasi
                            </button>
                         </HashLink>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full p-8 border-2 border-dashed border-gray-300 rounded-3xl text-center bg-gray-50">
                      <div className="text-gray-400">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-6">
                          <Calculator className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-500 mb-2">Hasil Perhitungan</h3>
                        <p className="text-gray-400 mb-4">Lengkapi semua langkah untuk melihat estimasi premi</p>
                        <div className="bg-white rounded-xl p-4 inline-block">
                          <p className="text-sm text-gray-500">Langkah {currentStep} dari 3</p>
                          <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                            <div
                              className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
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

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Mengapa Pilih Kalkulator Kami?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Perhitungan Akurat</h3>
                <p className="text-gray-600">Menggunakan algoritma terbaru dengan faktor risiko yang komprehensif</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Kesehatan</h3>
                <p className="text-gray-600">Analisis mendalam berdasarkan riwayat kesehatan dan gaya hidup</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Rekomendasi Personal</h3>
                <p className="text-gray-600">Saran asuransi yang disesuaikan dengan profil dan kebutuhan Anda</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KesehatanPage;