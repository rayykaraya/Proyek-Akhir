// src/pages/artikel/ArtikelKes.jsx

import React from 'react';
import Chatbot from '../../components/ChatBot';

// Data artikel tidak berubah
const kesehatanArticles = [
  {
    title: "5 Alasan Anda Harus Punya Asuransi Kesehatan Pribadi",
    summary: "Biaya medis meningkat cepat, data menunjukkan inflasi kesehatan di Indonesia mencapai hampir 10% pada 2019 dan diperkirakan naik hingga 11% di tahun berikutnya. Di tengah kondisi ini, asuransi kesehatan pribadi penting dimiliki karena memberi akses ke rumah sakit rekanan, proses layanan yang cepat tanpa rujukan, serta kemudahan pembayaran lewat sistem cashless.",
    link: "https://www.manulife.co.id/id/artikel/5-alasan-anda-harus-punya-asuransi-kesehatan-pribadi.html"
  },
  {
    title: "7 Hal Penting yang Patut Diperhatikan Nasabah Asuransi Kesehatan",
    summary: "Biaya medis di Indonesia diperkirakan naik hingga 19,4% pada 2025, sehingga penting bagi nasabah memahami cara memaksimalkan manfaat asuransi kesehatan. Penting untuk membaca polis dengan teliti, memahami perbedaan asuransi kesehatan dan jiwa, serta memanfaatkan fasilitas rekanan untuk layanan cashless.",
    link: "https://www.prudential.co.id/id/pulse/article/7-hal-penting-nasabah-asuransi-kesehatan-manfaat-proteksi-optimal/"
  },
  {
    title: "Memahami Tentang Asuransi Kesehatan Reimbursement",
    summary: "Asuransi reimbursement adalah sistem di mana nasabah membayar biaya medis terlebih dahulu, lalu mengajukan klaim untuk diganti oleh pihak asuransi. Kelebihannya adalah bebas memilih rumah sakit, tapi kekurangannya klaim butuh waktu dan dokumen lengkap.",
    link: "https://www.cermati.com/artikel/asuransi-reimbursement"
  },
  {
    title: "Perbedaan Asuransi Jiwa dan Kesehatan, Jangan Salah Pilih",
    summary: "Asuransi jiwa berfokus memberikan uang pertanggungan kepada ahli waris saat tertanggung meninggal, sedangkan asuransi kesehatan menanggung biaya medis saat Anda sakit. Memahami perbedaan ini krusial agar tidak salah memilih proteksi sesuai kebutuhan.",
    link: "https://www.chubb.com/id-id/articles/personal/perbedaan-asuransi-jiwa-kesehatan.html"
  },
  {
    title: "Asuransi Kesehatan: Manfaat, Jenis, dan Tips Memilih",
    summary: "Asuransi kesehatan adalah produk yang memberikan perlindungan finansial atas risiko biaya kesehatan, mencakup rawat inap, jalan, hingga pemeriksaan. Jenisnya beragam mulai dari perorangan, keluarga, hingga BPJS, sehingga penting untuk memilih sesuai kebutuhan dan cakupan manfaat.",
    link: "https://sundayinsurance.co.id/blog/?p=5064"
  },
  {
    title: "Anak Masih Bayi, Perlu Dilindungi dengan Asuransi Kesehatan?",
    summary: "Bayi sangat rentan sakit dan butuh pemantauan rutin, sehingga asuransi kesehatan penting untuk meringankan biaya tak terduga dan memberi ketenangan. Perlindungan ini sebaiknya dilengkapi juga dengan asuransi jiwa dan pendidikan untuk jaminan finansial jangka panjang.",
    link: "https://www.sequis.co.id/id/tentang-sequis/update/article/anak-masih-bayi-perlu-dilindungi-dengan-asuransi-kesehatan"
  },
  {
    title: "Perbedaan Asuransi Penyakit Kritis dan Asuransi Kesehatan",
    summary: "Asuransi kesehatan menanggung biaya pengobatan, sementara asuransi penyakit kritis memberikan uang tunai (lump sum) saat terdiagnosis penyakit berat seperti kanker atau stroke. Uang ini berfungsi sebagai pengganti penghasilan agar bisa fokus pada pemulihan.",
    link: "https://infobanknews.com/jangan-salah-kaprah-ini-perbedaan-asuransi-penyakit-kritis-dan-asuransi-kesehatan/"
  },
  {
    title: "Asuransi Kesehatan dan Urgensi Kaum Muda",
    summary: "Anak muda sering merasa tidak butuh asuransi karena sehat, padahal ini adalah waktu terbaik untuk memulai dengan premi murah. Ahli keuangan menyarankan alokasi 10-15% penghasilan untuk proteksi kesehatan demi mengantisipasi biaya medis yang terus naik.",
    link: "https://validnews.id/kultura/asuransi-kesehatan-dan-urgensi-kaum-muda"
  },
  {
    title: "Menkes Sebut BPJS Tak Mampu Cover Semua Biaya Berobat",
    summary: "Menteri Kesehatan menyatakan BPJS tidak dapat menanggung 100% biaya semua jenis penyakit. Oleh karena itu, masyarakat disarankan memiliki asuransi tambahan untuk menutupi sisa biaya pengobatan yang bisa mencapai puluhan hingga ratusan juta.",
    link: "https://health.detik.com/berita-detikhealth/d-7736597/menkes-sebut-bpjs-tak-mampu-cover-semua-biaya-berobat-sarankan-asuransi-tambahan"
  },
  {
    title: "Kata Ekonom UI soal 10% Beban Klaim Asuransi Kesehatan",
    summary: "Mulai 2026, konsumen wajib menanggung 10% klaim asuransi kesehatan (co-payment) untuk menekan moral hazard dan menjaga industri. Kebijakan ini dinilai bermanfaat jangka panjang jika disosialisasikan dengan baik kepada masyarakat.",
    link: "https://investor.id/finance/399891/kata-ekonom-ui-soal-10-beban-klaim-asuransi-kesehatan-ditanggung-konsumen"
  },
];

const truncateSummary = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  // Potong teks dan tambahkan elipsis (...)
  return text.slice(0, maxLength) + '...';
};

function ArtikelKesehatan() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20">
        <header className="text-center mb-16 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Artikel Asuransi Kesehatan
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pentingnya memiliki perlindungan kesehatan untuk masa depan yang lebih aman dan tenang.
          </p>
        </header>

        <main className="pb-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kesehatanArticles.map((article, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
                >
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500 opacity-50"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed text-sm line-clamp-4">
                      {truncateSummary(article.summary, 70)}
                    </p>

                    <a
                      href={article.link}
                      className="inline-flex items-center gap-2 text-green-600 hover:text-emerald-600 font-medium transition-colors duration-300 no-underline group/link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Baca Selengkapnya</span>
                      <i className="bi bi-arrow-right group-hover/link:translate-x-1 transition-transform duration-300"></i>
                    </a>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
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

export default ArtikelKesehatan;