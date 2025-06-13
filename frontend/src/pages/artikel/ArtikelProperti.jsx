// src/pages/artikel/ArtikelKes.jsx

import React from 'react';
import Chatbot from '../../components/ChatBot';

// Data artikel tidak berubah
const propertiArticles = [
  {
    title: "Pemicu Asuransi Properti Bertumbuh 2025",
    summary: "OJK memproyeksikan pertumbuhan asuransi properti mencapai Rp 1.141 triliun pada 2025, didorong oleh peningkatan aktivitas sektor properti dan kesadaran akan pentingnya proteksi aset di tengah stabilitas suku bunga.",
    link: "https://keuangan.kontan.co.id/news/read/2025/04/15/pemicu-asuransi-properti-bertumbuh-2025" // Note: Dummy link
  },
  {
    title: "Apa Itu Asuransi Properti? Manfaat, Jenis, dan Cara Klaimnya",
    summary: "Asuransi properti adalah perlindungan finansial untuk bangunan dan isinya dari risiko seperti kebakaran, banjir, hingga pencurian. Memahami jenis polis dan proses klaim yang sederhana dapat memberikan rasa aman dan stabilitas keuangan.",
    link: "https://protect.cermati.com/asuransi-properti/"
  },
  {
    title: "Melindungi Hunian dengan Asuransi Properti",
    summary: "Perlindungan properti mencakup risiko sesuai Polis Standar Asuransi Kebakaran Indonesia (PSAKI), dengan manfaat tambahan seperti santunan dan jasa arsitek pasca-musibah. Premi ditentukan oleh nilai, lokasi, dan material bangunan.",
    link: "https://axa.co.id/artikel/melindungi-hunian-dengan-asuransi-properti"
  },
  {
    title: "Kemudahan Menghitung Premi dengan Kalkulator Simulasi Online",
    summary: "Inovasi kalkulator simulasi premi online memudahkan calon pelanggan merencanakan asuransi properti secara mandiri, cepat, dan transparan sesuai kebutuhan serta anggaran, mendorong digitalisasi di industri asuransi.",
    link: "https://www.liputan6.com/lifestyle/read/5748290/kemudahan-menghitung-premi-asuransi-properti-sampai-perjalanan-dengan-kalkulator-simulasi-online"
  },
  {
    title: "Roadmap OJK 2023–2027 untuk Industri Perasuransian",
    summary: "Roadmap OJK bertujuan memperkuat ketahanan industri asuransi nasional melalui 4 pilar utama: penguatan tata kelola, pengembangan ekosistem inklusif, akselerasi transformasi digital, dan penguatan regulasi untuk menciptakan industri yang adaptif.",
    link: "https://ojk.go.id/id/regulasi/otoritas-jasa-keuangan/rancangan-regulasi/Documents/Draft%20Roadmap%20Pengembangan%20Perasuransian%20Indonesia.pdf"
  },
  {
    title: "Tren Baru Investasi Properti 2025: Fokus pada Cash Flow",
    summary: "Pola investasi properti bergeser dari capital gain ke cash flow positif sejak awal. Di tengah kenaikan suku bunga KPR, investor kini memilih properti yang pendapatan sewanya bisa menutupi angsuran dan memberikan keuntungan langsung.",
    link: "https://wartaekonomi.co.id/read561795/tren-baru-investasi-properti-2025-komodo-tidak-lagi-andalkan-capital-gain"
  },
  {
    title: "Model Asuransi Parametrik untuk Korban Bencana Iklim",
    summary: "Inovasi asuransi properti kini mengarah pada model parametrik, di mana klaim dibayarkan secara otomatis berdasarkan indikator cuaca atau kerusakan tertentu, memberikan perlindungan yang lebih cepat dan transparan bagi pemilik properti di daerah rawan bencana.",
    link: "https://www.ft.com/content/d480bf32-4819-4286-9f88-ad917651f155"
  },
  {
    title: "Pilihan Produk Asuransi Properti Unggulan di Indonesia",
    summary: "Pasar asuransi properti lokal menawarkan fitur premi kompetitif, cakupan luas untuk kebakaran dan banjir, serta proses klaim yang semakin cepat dan mudah berkat digitalisasi layanan.",
    link: "https://aksi.co/2025/04/15/asuransi-properti-terbaik-indonesia"
  },
  {
    title: "Pengaruh AI, ESG, dan IoT pada Asuransi Properti",
    summary: "Teknologi seperti AI membantu penilaian risiko dan otomatisasi klaim. Prinsip ESG juga mulai dihargai, di mana bangunan hijau dan tahan bencana berpotensi mendapatkan premi yang lebih baik dari perusahaan asuransi.",
    link: "https://www.onarchipelago.com/blog/property-insurance-trends"
  },
  {
    title: "Kondisi Pasar Asuransi Properti Global",
    summary: "Pasar asuransi properti global menunjukkan stabilitas tarif di layer atas akibat tekanan persaingan. Banyak program underwriting fleksibel yang dijalankan karena optimasi kapasitas dan kondisi pasar yang melunak (soft market).",
    link: "https://blog.ryanspecialty.com/may-2025-us-property-insurance-review"
  },
];

const truncateSummary = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  // Potong teks dan tambahkan elipsis (...)
  return text.slice(0, maxLength) + '...';
};

function ArtikelProperti() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-20">
        <header className="text-center mb-16 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Artikel Asuransi Properti
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Melindungi aset paling berharga Anda dari risiko tak terduga.
          </p>
        </header>

        <main className="pb-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {propertiArticles.map((article, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
                >
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500 opacity-50"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed text-sm line-clamp-4">
                      {truncateSummary(article.summary, 70)}
                    </p>

                    <a
                      href={article.link}
                      className="inline-flex items-center gap-2 text-amber-600 hover:text-orange-600 font-medium transition-colors duration-300 no-underline group/link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Baca Selengkapnya</span>
                      <i className="bi bi-arrow-right group-hover/link:translate-x-1 transition-transform duration-300"></i>
                    </a>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
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

export default ArtikelProperti;