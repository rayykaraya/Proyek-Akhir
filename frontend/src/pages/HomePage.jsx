import React from 'react';
import { NavLink } from 'react-router-dom'; // Menggunakan NavLink untuk link di masa depan


// KUMPULAN SEMUA IMPORT GAMBAR DARI KETIGA FILE
import heroImage from '../assets/images/Keluarga.png';
// import propertiIcon from '../assets/images/Properti.png';
// import kesehatanIcon from '../assets/images/Kesehatan.png';
// import kendaraanIcon from '../assets/images/Kendaraan.png';
import team1 from '../assets/images/team-1.jpg';
import team2 from '../assets/images/team-2.png';
import team3 from '../assets/images/team-3.jpg';
import team4 from '../assets/images/team-4.JPG';
import team5 from '../assets/images/team-5.jpg';
import team6 from '../assets/images/team-6.jpg';
import homeBackground from '../assets/images/Background-Home.png';

import Hero from './HeroPage';
import ServicesPage from './servicePage';
import AboutPage from './AboutPage';
// =================================================================
// BAGIAN 1: HERO SECTION (DARI HomePage.jsx LAMA)
// =================================================================
function HeroSection() {
  // const heroStyle = {
  //   // Terapkan gambar sebagai background, dengan overlay gelap tipis di atasnya
  //   backgroundImage: `
  //     linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
  //     url(${homeBackground})
  //   `,
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   backgroundRepeat: 'no-repeat',
  // };

  return (
    <Hero />
  );
}

// =================================================================
// BAGIAN 2: SERVICES SECTION (DARI ServicesPage.jsx LAMA)
// =================================================================
// const servicesData = [
//   { iconSrc: propertiIcon, altText: 'Ikon Properti', title: 'Asuransi Properti', description: 'Lindungi investasi properti Anda dari berbagai musibah dengan solusi Asuransi Properti terpercaya dari Finzure.', link: '/properti' },
//   { iconSrc: kesehatanIcon, altText: 'Ikon Kesehatan', title: 'Asuransi Kesehatan', description: 'Prioritaskan kesehatan Anda dan keluarga dengan perlindungan menyeluruh dari risiko biaya medis tak terduga bersama Finzure.', link: '/kesehatan' },
//   { iconSrc: kendaraanIcon, altText: 'Ikon Kendaraan', title: 'Asuransi Kendaraan', description: 'Asuransi Kendaraan Finzure memberikan perlindungan komprehensif untuk mobil atau motor Anda dari risiko kerusakan, kehilangan, dan tanggung jawab hukum di jalan raya.', link: '/kendaraan' },
// ];

function ServicesSection() {
  return (
    // // Kita tambahkan id="services" di sini agar link dari Hero Section bisa scroll ke sini
    // <section id="services" className="services-section section-padding">
    //   <div className="container text-center">
    //     <h1 className="section-title text-white">Apa saja yang anda akan dapatkan?</h1>
    //     <div className="row g-4 justify-content-center mt-4">
    //       {servicesData.map((service, index) => (
    //         <div className="col-lg-4 col-md-6" key={index}>
    //           <div className="card h-100 text-center">
    //             <div className="card-body d-flex flex-column align-items-center">
    //               <img src={service.iconSrc} alt={service.altText} className="card-icon" />
    //               <h5 className="card-title">{service.title}</h5>
    //               <p className="card-text small">{service.description}</p>
    //               <NavLink
    //                 to={service.link}
    //                 // Ganti 'btn-custom-teal' dengan 'btn-hitung' dan hapus padding
    //                 className="btn-hitung mt-auto rounded-pill"
    //               >
    //                 Hitung Premi
    //               </NavLink>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>``
    //   </div>
    // </section>
    <ServicesPage />
  );
}

// =================================================================
// BAGIAN 3: ABOUT SECTION (DARI AboutPage.jsx LAMA)
// =================================================================
const teamData = [
  { name: 'Ajwa Nabawiya', role: 'Team Machine Learning', imgSrc: team1 },
  { name: 'Natanael Henry Christiantoro', role: 'Team Front End & Back End', imgSrc: team2 },
  { name: 'Cahya Navila', role: 'Team Machine Learning', imgSrc: team3 },
  { name: 'Argi Al Furqon Muntaha', role: 'Team Front End & Back End', imgSrc: team4 },
  { name: 'Agil Ammar Habibi', role: 'Team Machine Learning', imgSrc: team5 },
  { name: 'Jihan \'Afina', role: 'Team Front End & Back End', imgSrc: team6 },
];

// PERBAIKAN PADA AboutSection di file HomePage.jsx

function AboutSection() {
  return (
   <AboutPage />
  );
}

// =================================================================
// KOMPONEN UTAMA HomePage YANG MENGGABUNGKAN SEMUANYA
// =================================================================
// Di dalam komponen utama HomePage

// Di dalam komponen utama HomePage
function HomePage() {
  return (
    <div className="home-page-wrapper">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
    </div>
  );
}


export default HomePage;