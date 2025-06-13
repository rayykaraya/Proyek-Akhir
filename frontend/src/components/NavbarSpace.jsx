// src/components/NavbarSpacer.jsx
import React from 'react';

// Komponen ini hanya sebuah div kosong dengan tinggi seukuran navbar.
// Gunakan ini di halaman yang TIDAK memiliki hero image full-bleed.
function NavbarSpacer() {
  // Sesuaikan '90px' jika tinggi navbar Anda berbeda.
  return <div style={{ height: '90px' }}></div>;
}

export default NavbarSpacer;