// src/components/ScrollToTop.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  // Ekstrak 'pathname' dari objek lokasi
  const { pathname } = useLocation();

  // Gunakan useEffect untuk menjalankan side effect (scrolling)
  useEffect(() => {
    // Scroll window ke posisi paling atas (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // <-- KUNCI UTAMA: Efek ini akan berjalan HANYA SAAT pathname berubah

  return null; // Komponen ini tidak perlu merender apa-apa, tugasnya hanya side effect
}

export default ScrollToTop;