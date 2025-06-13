import React from 'react';
import '../styles/about.css';
import '../styles/teamkode.css';

import team1 from '../assets/images/team-1.jpg';
import team2 from '../assets/images/team-2.png';
import team3 from '../assets/images/team-3.jpg';
import team4 from '../assets/images/team-4.JPG';
import team5 from '../assets/images/team-5.jpg';
import team6 from '../assets/images/team-6.jpg';

const teamData = [
  { name: 'Ajwa Nabawiya', role: 'Team Machine Learning', imgSrc: team1 },
  { name: 'Natanael Henry Christiantoro', role: 'Team Front End & Back End', imgSrc: team2 },
  { name: 'Cahya Navila', role: 'Team Machine Learning', imgSrc: team3 },
  { name: 'Argi Al Furqon Muntaha', role: 'Team Front End & Back End', imgSrc: team4 },
  { name: 'Agil Ammar Habibi', role: 'Team Machine Learning', imgSrc: team5 },
  { name: 'Jihan \ Afina', role: 'Team Front End & Back End', imgSrc: team6 },
];

function AboutPage() {
  return (
   // 1. Jadikan <section> sebagai elemen full-width (HAPUS kelas 'container' dari sini)
  <div id="about" class="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 relative overflow-hidden">
    {/* Grid Background */}
    <div class="absolute top-0 left-0 w-full h-full bg-grid opacity-30 z-0" style={{
      backgroundImage: `
        linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px'
    }}></div>

    {/* Floating Elements */}
    <div class="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse z-1"></div>
    <div class="absolute bottom-0 right-0 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000 z-1"></div>

    <div class="container mx-auto px-6 py-20 relative z-10">
      {/* Header Section */}
      <div class="text-center mb-16 mt-20" id="about-header">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-6xl font-bold text-gray-800 mb-6 scroll-mt-20">
            Tentang <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Proyek Kami</span>
          </h1>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
          <p class="text-xl text-gray-600 leading-relaxed">
            Revolusi teknologi asuransi untuk Indonesia yang lebih cerdas
          </p>
        </div>
      </div>

      {/* Main Content - Image Left, Text Right */}
      <div class="mb-20">
        <div class="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Image Section - Left */}
          <div class="flex justify-center lg:justify-start">
            <div class="relative group w-full">
              <div class="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div class="relative bg-white rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col" data-aos="fade-right">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration and innovation"
                  class="w-full flex-1 object-cover transition-transform duration-500 group-hover:scale-105"

                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 class="text-xl font-bold mb-1">Tim Capstone</h4>
                  <p class="text-sm opacity-90">Lord Lembah Gelap</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section - Right */}
          <div class="space-y-6">
            <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 h-full flex flex-col">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-white">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-800">Inovasi Teknologi Asuransi</h3>
              </div>

              <p class="text-gray-600 leading-relaxed mb-6 text-base flex-1">
                Proyek ini mengembangkan sistem rekomendasi asuransi cerdas untuk mengatasi masalah utama dalam industri asuransi di Indonesia. Banyak nasabah kesulitan memilih produk asuransi yang tepat karena ketidakjelasan perhitungan premi dan kurangnya akses terhadap ulasan produk yang objektif.
              </p>

              {/* Features */}
              <div class="grid md:grid-cols-2 gap-4">
                <div class="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
                  <span class="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xs px-2 py-1 rounded-full shadow-lg flex-shrink-0">01</span>
                  <div class="flex-1">
                    <h4 class="font-bold text-gray-800 text-sm mb-1">Analisis Profil Risiko</h4>
                    <p class="text-gray-600 text-xs leading-relaxed">
                      Sistem menganalisis profil risiko nasabah kemudian menghitung premi yang sesuai.
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-500">
                  <span class="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs px-2 py-1 rounded-full shadow-lg flex-shrink-0">02</span>
                  <div class="flex-1">
                    <h4 class="font-bold text-gray-800 text-sm mb-1">Rekomendasi Berbasis Rating</h4>
                    <p class="text-gray-600 text-xs leading-relaxed">
                      Sistem menyaring produk berdasarkan hasil analisis premi nasabah dan rating tertinggi dari ulasan nyata nasabah.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div class="text-center p-6">
        <div class="mb-15">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            Tim Capstone <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Lord Lembah Gelap</span>
          </h2>
          <p class=" mb-8 text-xl text-gray-600">Kami didukung oleh para ahli di bidangnya.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamData.map((member, index) => (
            <div className="group" key={index}
            data-aos="zoom-in-up"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-4 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all duration-300">
                    <img src={member.imgSrc} alt={`Foto ${member.name}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"/>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-center">
                  <h5 className="text-lg font-bold text-gray-800 mb-2">{member.name}</h5>
                  <p className="text-gray-600 font-medium text-sm">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
}

export default AboutPage;