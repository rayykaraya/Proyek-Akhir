// src/App.jsx
import React from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastProvider from './components/ToastProvider';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// Import semua halaman Anda
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PropertiPage from './pages/kalkulator/PropertiPage';
import KendaraanPage from './pages/kalkulator/KendaraanPage';
import KesehatanPage from './pages/kalkulator/KesehatanPage';
import RekomendasiKesehatan from './pages/rekomendasi/RekomendasiKesehatan';
import RekomendasiKendaraan from './pages/rekomendasi/RekomendasiKendaraan';
import RekomendasiProperti from './pages/rekomendasi/RekomendasiProperti';
import ArtikelPage from './pages/ArtikelPage';
import ArtikelKesehatan from './pages/artikel/ArtikelKesehatan';
import ArtikelKendaraan from './pages/artikel/ArtikelKendaraan';
import ArtikelProperti from './pages/artikel/ArtikelProperti';

// Komponen kecil untuk mengelola layout
const AppLayout = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  // Dapatkan lokasi saat ini
  const location = useLocation();

  // Tentukan halaman mana yang tidak perlu navbar
  const hideNavbar = ['/login', '/register'].includes(location.pathname);

  // Tentukan halaman mana yang tidak perlu footer
  const hideFooter = ['/login', '/register'].includes(location.pathname) ||
                     location.pathname.startsWith('/dashboard');

  return (
    <div className="app-wrapper">
      {!hideNavbar && <Navbar />}
      <ToastProvider />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/properti" element={<PropertiPage />} />
          <Route path="/kendaraan" element={<KendaraanPage />} />
          <Route path="/kesehatan" element={<KesehatanPage />} />
          <Route path="/rekomendasi/kesehatan" element={<RekomendasiKesehatan />} />
          <Route path="/rekomendasi/kendaraan" element={<RekomendasiKendaraan />} />
          <Route path="/rekomendasi/properti" element={<RekomendasiProperti />} />
          <Route path="/artikel" element={<ArtikelPage />} />
          <Route path="/artikel/ArtikelKesehatan" element={<ArtikelKesehatan/>} />
          <Route path="/artikel/ArtikelKendaraan" element={<ArtikelKendaraan/>} />
          <Route path="/artikel/ArtikelProperti" element={<ArtikelProperti/>} />
          {/* Rute yang dilindungi */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }/>
        </Routes>
      </main>

      {/* Footer hanya ditampilkan jika bukan di halaman login, register, atau dashboard */}
      {!hideFooter && <Footer />}
    </div>
  );
};

// Komponen App utama sekarang hanya membungkus Router dan Layout
function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}

export default App;