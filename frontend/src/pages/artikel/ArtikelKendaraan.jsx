// src/pages/artikel/ArtikelKes.jsx

import React from 'react';
import Chatbot from '../../components/ChatBot';

// Data artikel tidak berubah
const kendaraanArticles = [
  {
    title: "Mengenal Ciri–Ciri Asuransi Mobil dan Manfaat Penggunaannya",
    summary: "Asuransi mobil yang baik memiliki cakupan luas, kemudahan klaim, jaringan bengkel rekanan yang banyak, serta transparan dalam syarat dan ketentuan polis. Mengenali ciri-ciri ini membantu konsumen memilih perlindungan yang tepat.",
    link: "https://www.cermati.com/artikel/ciri-ciri-asuransi-mobil"
  },
  {
    title: "Cari Tahu Manfaat Asuransi Mobil Sebelum Kamu Membelinya",
    summary: "Asuransi mobil memberikan ketenangan dengan menanggung biaya perbaikan akibat kecelakaan, pencurian, atau bencana alam. Manfaat lainnya termasuk layanan darurat 24 jam dan perlindungan pihak ketiga, serta membantu menjaga stabilitas keuangan.",
    link: "https://www.qoala.app/id/blog/perlindungan-diri/manfaat-asuransi-mobil/"
  },
  {
    title: "Mengenal Jenis-jenis Asuransi Kendaraan dan Cara Mengurusnya",
    summary: "Pahami perbedaan antara asuransi All Risk (perlindungan menyeluruh) dan Total Loss Only (TLO) untuk kehilangan total. Pengurusan klaim memerlukan kelengkapan dokumen seperti polis, SIM, STNK, dan pelaporan tepat waktu.",
    link: "https://www.seva.id/blog/mengenal-jenis-jenis-asuransi-kendaraan-dan-cara-mengurusnya-bikinkamusiap-hadapibanjir"
  },
  {
    title: "2 Jenis Asuransi Mobil dan Manfaatnya yang Harus Kamu Tahu",
    summary: "Asuransi All Risk melindungi dari kerusakan kecil hingga besar, sementara TLO hanya menanggung jika kerusakan atau kehilangan di atas 75%. Memilih jenis yang tepat sesuai kebutuhan dan kondisi kendaraan adalah kunci proteksi optimal.",
    link: "https://mypage.axa.co.id/news/id/2-jenis-asuransi-mobil-dan-manfaatnya-yang-harus-kamu-tahu"
  },
  {
    title: "Mengapa Asuransi Mobil Itu Penting? Temukan Jawabannya di Sini!",
    summary: "Memiliki asuransi mobil penting untuk melindungi diri, kendaraan, dan keuangan dari risiko tak terduga seperti kecelakaan atau bencana alam. Asuransi memberikan ketenangan pikiran dan membantu memenuhi persyaratan hukum yang berlaku.",
    link: "https://www.seva.id/blog/mengapa-asuransi-mobil-itu-penting-temukan-jawabannya-di-sini"
  },
  {
    title: "Sobat SEVA, Yuk Pahami Cara Klaim Asuransi Mobil dengan Mudah!",
    summary: "Proses klaim asuransi mobil melibatkan pelaporan kejadian dalam 3x24 jam, melengkapi dokumen seperti polis dan foto kerusakan, serta mengikuti proses survei dari pihak asuransi. Kunci agar klaim disetujui adalah kecepatan melapor dan kelengkapan dokumen.",
    link: "https://www.seva.id/blog/sobat-seva-yuk-pahami-cara-klaim-asuransi-mobil-dengan-mudah"
  },
  {
    title: "Asuransi Mobil Terbaik: Pilihan dan Manfaatnya",
    summary: "Selain TLO dan All Risk, ada juga asuransi perluasan untuk risiko spesifik seperti banjir, gempa bumi, hingga perlindungan Personal Injury Protection (PIP) untuk biaya medis pengemudi dan penumpang.",
    link: "https://www.asuransiku.id/blog/asuransi-mobil-terbaik-2022"
  },
  {
    title: "5 Tips untuk Menghemat Premi Asuransi Mobil",
    summary: "Hemat premi dengan memilih jenis asuransi yang tepat (All Risk/TLO), memasang fitur keamanan tambahan, membayar premi tahunan untuk diskon, serta membandingkan penawaran dari berbagai perusahaan untuk mendapatkan harga terbaik.",
    link: "https://www.astra-daihatsu.id/berita-dan-tips/tips-menghemat-premi-asuransi-mobil"
  },
  {
    title: "Kelebihan dan Kekurangan Asuransi Mobil Bekas, Wajib Tahu!",
    summary: "Kelebihan asuransi mobil bekas adalah proteksi terhadap risiko pada kendaraan yang rentan. Kekurangannya meliputi batasan usia kendaraan yang bisa diasuransikan dan proses perbaikan yang cenderung lebih lama.",
    link: "https://moladin.com/blog/kelebihan-dan-kekurangan-asuransi-mobil-bekas/"
  },
  {
    title: "Simulasi Asuransi Mobil All Risk dan TLO",
    summary: "Premi asuransi dihitung berdasarkan tarif OJK dikalikan harga mobil, dengan mempertimbangkan faktor seperti jenis asuransi, usia pengemudi, dan wilayah. Melakukan simulasi online membantu mendapatkan gambaran biaya sebelum membeli polis.",
    link: "https://www.cekpremi.com/blog/simulasi-asuransi-mobil/"
  },
];

const truncateSummary = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  // Potong teks dan tambahkan elipsis (...)
  return text.slice(0, maxLength) + '...';
};

function ArtikelKendaraan() {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20">
      <header className="text-center mb-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Artikel Asuransi Kendaraan
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Memahami cara terbaik untuk melindungi aset berharga Anda di jalan raya.
        </p>
      </header>

      <main className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kendaraanArticles.map((article, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
              >
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500 opacity-50"></div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed text-sm line-clamp-4">
                    {truncateSummary(article.summary, 70)}
                  </p>

                  <a
                    href={article.link}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-indigo-600 font-medium transition-colors duration-300 no-underline group/link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Baca Selengkapnya</span>
                    <i className="bi bi-arrow-right group-hover/link:translate-x-1 transition-transform duration-300"></i>
                  </a>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
    <Chatbot />
    </>
  );
}

export default ArtikelKendaraan;