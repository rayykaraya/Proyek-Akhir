// src/pages/ArtikelPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import NavbarSpacer from '../components/NavbarSpace';
// import '/src/ArtikelPage.css'; // Impor CSS yang baru kita buat


// Data untuk setiap artikel
const articlesData = [
  {
    title: 'Asuransi Kesehatan',
    description: 'Asuransi kesehatan adalah sebuah bentuk perlindungan finansial yang menanggung biaya medis tak terduga, mulai dari perawatan di rumah sakit hingga pengobatan, sebagai ganti pembayaran premi secara rutin.',
    icon: 'bi-heart-pulse-fill',
    link: '/artikel/ArtikelKesehatan',
  },
  {
    title: 'Asuransi Kendaraan',
    description: 'Asuransi kendaraan adalah sebuah polis yang memberikan perlindungan finansial atas kerugian atau kerusakan yang terjadi pada kendaraan Anda, sekaligus menanggung tanggung jawab hukum terhadap pihak lain jika terjadi kecelakaan.',
    icon: 'bi-car-front-fill',
    link: '/artikel/ArtikelKendaraan',
  },
  {
    title: 'Asuransi Properti',
    description: 'Asuransi properti memberikan jaminan perlindungan finansial terhadap kerusakan atau kehilangan aset properti Anda, seperti rumah dan isinya, dari risiko tak terduga seperti kebakaran, pencurian, atau bencana alam.',
    icon: 'bi-house-heart-fill',
    link: '/artikel/ArtikelProperti',
  },
];

function ArtikelPage() {
  return (
    <>
     <div className="mt-1 no-underline min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Artikel Asuransi
        </h1>
        <p className="text-gray-600 text-center mb-12 text-lg">
          Pelajari berbagai topik asuransi untuk melindungi masa depan Anda
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.map((article, index) => (
            <Link
              to={article.link}
              key={index}
              className="no-underline group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>

              {/* Icon */}
              <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className={`bi ${article.icon} text-2xl text-white`}></i>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="no-underline text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {article.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600 group-hover:text-purple-600 transition-colors duration-300">
                  Baca Selengkapnya
                </span>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-purple-100 group-hover:translate-x-1 transition-all duration-300">
                  <i className="bi bi-arrow-right text-blue-600 group-hover:text-purple-600"></i>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default ArtikelPage;