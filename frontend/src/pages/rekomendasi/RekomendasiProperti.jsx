// src/pages/rekomendasi/RekomendasiProperti.jsx

import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import '/src/index.css'; // Memuat gaya global
import { toast } from 'react-hot-toast';
import { logActivity } from '../../utils/activityLogger';
import { BuildingOffice, FirstAidKit, Car } from "@phosphor-icons/react";

// Data untuk setiap paket asuransi properti
const propertyPackagesData = [
  {
    title: 'Finzure Property Bronze Basic',
    packageName: 'Paket Bronze',
    packageClass: 'tag-bronze',
    rating: 3,
    features: '+Perlindungan Kebakaran untuk rumah tinggal standar',
    price: 'Rp.300.000/Bulan',
    icon: 'bi-house-heart-fill',
  },
  {
    title: 'Finzure Property Bronze Plus',
    packageName: 'Paket Bronze',
    packageClass: 'tag-bronze',
    rating: 3,
    features: '+Perlindungan Kebakaran untuk rumah tinggal standar\n+Pencurian dengan tanda kekerasan',
    price: 'Rp.300.000/Bulan',
    icon: 'bi-house-heart-fill',
  },
  {
    title: 'Finzure Property Silver Basic',
    packageName: 'Paket Silver',
    packageClass: 'tag-silver',
    rating: 4,
    features: '+Perlindungan Kebakaran, Pencurian dan Banjir',
    price: 'Rp.300.000/Bulan',
    icon: 'bi-house-heart-fill',
  },
  {
    title: 'Finzure Property Silver Smart',
    packageName: 'Paket Silver',
    packageClass: 'tag-silver',
    rating: 4,
    features: '+Perlindungan Kebakaran, Pencurian dan Banjir\n+Tanggungan Isi Rumah (Furniture & Elektronik)',
    price: 'Rp.300.000/Bulan',
    icon: 'bi-house-heart-fill',
  },
  {
    title: 'Finzure Property Silver Plus',
    packageName: 'Paket Silver',
    packageClass: 'tag-silver',
    rating: 4,
    features: '+Perlindungan Kebakaran, Pencurian dan Banjir\n+Tanggungan Isi Rumah (Furniture & Elektronik)\n+Bangunan Tambahan Seperti Garasi dan Gudang',
    price: 'Rp.300.000/Bulan',
    icon: 'bi-house-heart-fill',
  },
  {
    title: 'Finzure Property Gold Basic',
    packageName: 'Paket Gold',
    packageClass: 'tag-gold',
    rating: 5,
    features: 'Perlindungan Kebakaran untuk rumah tinggal standar+Pencurian dengan tanda kekerasan',
    price: 'Rp.300.000/Bulan',
    icon: 'bi-house-heart-fill',
  },
  {
    title: 'Finzure Property Gold Smart',
    packageName: 'Paket Gold',
    packageClass: 'tag-gold',
    rating: 5,
    features: 'Perlindungan Kebakaran, Pencurian dan Banjir',
    price: 'Rp.300.000/Bulan',
    icon: 'bi-house-heart-fill',
  },
  {
    title: 'Finzure Property Gold Plus',
    packageName: 'Paket Gold',
    packageClass: 'tag-gold',
    rating: 5,
    features: 'Perlindungan Kebakaran, Pencurian dan Banjir+Tanggungan Isi Rumah (Furniture & Elektronik)',
    price: 'Rp.300.000/Bulan',
    icon: 'bi-house-heart-fill',
  }
];

// Komponen StarRating yang bisa digunakan kembali
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="bi bi-star-fill"></i>);
    } else {
      stars.push(<i key={i} className="bi bi-star"></i>);
    }
  }
  return <div className="rating-stars">{stars}</div>;
};

function RekomendasiProperti() {
  const navigate = useNavigate();

  const handleAmbilPaket = (paket) => {
    logActivity({
      type: 'Pengambilan Paket Properti',
      description: paket.title,
    });
    toast.success(`Paket "${paket.title}" telah ditambahkan ke aktivitas Anda!`);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
  {/* Animated Background Elements */}
  <div className="absolute inset-0">
    <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
    <div className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-56 sm:w-80 h-56 sm:h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
  </div>

  {/* Main Container */}
  <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10">
    {/* Title Section */}
    <div className="mt-10 sm:mt-20 text-center mb-8 sm:mb-16">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight px-4">
        Hasil Rekomendasi
        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent block sm:inline"> Asuransi Properti</span>
      </h1>
      <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
    </div>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
      {propertyPackagesData.map((pkg, index) => (
        <div key={index} className="group">
          {/* Main Card Container */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 hover:bg-white/15 relative overflow-hidden">

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl sm:rounded-3xl"></div>

            {/* Decorative Corner Element */}
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-bl from-purple-400/20 to-transparent rounded-bl-full"></div>

            {/* Header Section */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8">
              {/* Icon Container */}
              <div className="flex-shrink-0">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-110">
                  <i className={`bi ${pkg.icon} text-lg sm:text-2xl text-white`}></i>
                </div>
              </div>

              {/* Title and Package Info */}
              <div className="flex-1 w-full sm:w-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{pkg.title}</h3>
                {/* <span className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${pkg.packageClass} bg-gradient-to-r from-emerald-400 to-cyan-400 text-white shadow-lg`}>
                  {pkg.packageName}
                </span> */}
              </div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 mb-6 sm:mb-8">
              {/* Star Rating */}
              <div className="mb-3 sm:mb-4">
                <StarRating rating={pkg.rating} />
              </div>

              {/* Features */}
              {/* <p className="text-gray-200 leading-relaxed text-base sm:text-lg">{pkg.features}</p> */}
            </div>

             {/* Action Section */}
            <div className="relative z-10 sm:flex-row  sm:items-center  space-y-4 sm:space-y-0 ">
              {/* Price Display */}
              <div className="flex-1 order-2 sm:order-1">
                <div className="text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {pkg.price}
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleAmbilPaket(pkg)}
                className="mt-3 w-full sm:w-auto order-1 sm:order-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Ambil</span>
                  <i className="bi bi-arrow-right-circle"></i>
                </span>
              </button>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Bottom Decorative Elements */}
  <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
</div>
  );
}

export default RekomendasiProperti;