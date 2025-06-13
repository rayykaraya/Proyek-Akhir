// src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import fotoImage from '../assets/images/foto.png'; // Ini adalah gambar default, namanya tetap.
import { HashLink } from 'react-router-hash-link';

function DashboardPage() {

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState('tentang-saya');
  const [userActivities, setUserActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- PERBAIKAN NAMA STATE DI SINI ---
  const [editFormData, setEditFormData] = useState({});
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  useEffect(() => {
    const loggedInUserText = localStorage.getItem('loggedInUser');
    if (!loggedInUserText) {
      navigate('/login');
      return;
    }
    try {
      const user = JSON.parse(loggedInUserText);
      if (!user || !user.email) throw new Error("Data pengguna tidak valid.");

      user.profileImage = user.profileImage || fotoImage;
      setUserData(user);

      setEditFormData({
        namaLengkap: user.namaLengkap || '',
        tanggalLahir: user.tanggalLahir || '',
        alamat: user.alamat || '',
      });
      loadUserActivities(user.email);
    } catch (error) {
      console.error("Gagal memproses sesi:", error);
      localStorage.clear();
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const loadUserActivities = (userEmail) => {
    if (!userEmail) return;
    const activitiesText = localStorage.getItem(`userActivities_${userEmail}`);
    const activities = activitiesText ? JSON.parse(activitiesText) : [];
    setUserActivities(Array.isArray(activities) ? activities.reverse() : []);
  };

  const handleHapusAktivitas = (timestampToDelete) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus aktivitas ini?")) {
      const updatedActivities = userActivities.filter(activity => activity.timestamp !== timestampToDelete).reverse();
      localStorage.setItem(`userActivities_${userData.email}`, JSON.stringify(updatedActivities));
      loadUserActivities(userData.email);
      toast.success("Aktivitas berhasil dihapus!");
    }
  };

  const handleNavClick = (sectionId) => {
    if (sectionId === 'edit-profile') {
      setEditFormData({
        namaLengkap: userData.namaLengkap || '',
        tanggalLahir: userData.tanggalLahir || '',
        alamat: userData.alamat || '',
      });
      setProfileImagePreview(null);
    }
    setActiveSection(sectionId);
  };

  const handleLogout = () => {
  // HANYA HAPUS DATA SESI, BUKAN DATA PERMANEN PENGGUNA
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('authToken'); // Hapus token jika ada

  // JANGAN HAPUS 'finzureUsers' atau 'userActivities_...'

  // Kirim sinyal ke komponen lain (seperti Navbar) bahwa status otentikasi berubah
  window.dispatchEvent(new CustomEvent('authChange'));

  // Tampilkan notifikasi
  toast.error('Anda telah berhasil logout.');

  // Arahkan pengguna ke halaman utama setelah beberapa saat
  setTimeout(() => navigate('/'), 1000);
};

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };
  const getIconForActivity = (activityType = '') => {
    // Menggunakan .includes() agar berfungsi untuk "Kalkulator Properti" maupun "Pengambilan Paket Properti"
    if (activityType.includes('Properti')) {
      return 'bi-house-heart-fill'; // Ikon rumah
    }
    if (activityType.includes('Kendaraan')) {
      return 'bi-car-front-fill'; // Ikon mobil
    }
    if (activityType.includes('Kesehatan')) {
      return 'bi-heart-pulse-fill'; // Ikon kesehatan
    }

    // Ikon default jika tidak ada yang cocok
    return 'bi-calculator';
  };

  // --- PENAMBAHAN FUNGSI YANG HILANG (1) ---
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Maks 2MB
        toast.error("Ukuran file gambar terlalu besar (maks 2MB).");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- PENAMBAHAN FUNGSI YANG HILANG (2) ---
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUserData = {
      ...userData,
      ...editFormData,
      profileImage: profileImagePreview || userData.profileImage,
    };

    setUserData(updatedUserData);
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUserData));

    try {
      let users = JSON.parse(localStorage.getItem('finzureUsers')) || [];
      const userIndex = users.findIndex(user => user.email === updatedUserData.email);
      if (userIndex !== -1) {
        users[userIndex] = updatedUserData;
        localStorage.setItem('finzureUsers', JSON.stringify(users));
      }
    } catch (error) {
      console.error("Gagal memperbarui database pengguna:", error);
    }
    toast.success('Profil berhasil diperbarui!');
    setActiveSection('tentang-saya');
  };

  const scrollToServices = () => {
  const homeElement = document.getElementById('services');
  if (homeElement) {
    homeElement.scrollIntoView({ behavior: 'smooth' });
  }
};
  // --- FUNGSI-FUNGSI RENDER ---

const renderTentangSaya = () => (
   <div className="relative max-w-4xl mx-auto p-8">
      {/* Background gradient dengan glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl"></div>
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl"></div>

      {/* Decorative elements */}
      <div className="absolute top-6 right-6 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-6 left-6 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-xl"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">Informasi Profil Anda</h2>
          </div>
          <p className="text-gray-600 text-sm">Data pribadi untuk layanan asuransi terbaik</p>
        </div>

        {/* Profile Info Grid */}
        <div className="space-y-4">
          {/* Nama Lengkap */}
          <div className="group relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/80">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-500 mb-1">Nama Lengkap</div>
                <div className="text-lg font-bold text-gray-800 tracking-wide">{userData.namaLengkap?.toUpperCase() || '-'}</div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="group relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/80">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-500 mb-1">Email</div>
                <div className="text-lg font-semibold text-gray-800">{userData.email || '-'}</div>
              </div>
            </div>
          </div>

          {/* Tanggal Lahir */}
          <div className="group relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/80">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-500 mb-1">Tanggal Lahir</div>
                <div className="text-lg font-semibold text-gray-800">{userData.tanggalLahir || '-'}</div>
              </div>
            </div>
          </div>

          {/* Alamat */}
          <div className="group relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/80">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-500 mb-1">Alamat</div>
                <div className="text-lg font-semibold text-gray-800 leading-relaxed">{userData.alamat || '-'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer dengan trust indicators */}
        <div className="mt-8 pt-6 border-t border-gray-200/50">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </div>
            <span>Data terverifikasi dan aman</span>
          </div>
        </div>
      </div>
    </div>
  );

const renderRiwayatAktivitas = () => (
      <div className="relative max-w-4xl mx-auto p-8">
      {/* Background dengan glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-3xl"></div>
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl"></div>

      {/* Decorative elements */}
      <div className="absolute top-6 right-6 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-6 left-6 w-24 h-24 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-xl"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Riwayat Aktivitas
            </h2>
          </div>
          <p className="text-gray-600 ml-16">Pantau semua aktivitas asuransi Anda dalam satu tempat</p>
        </div>

        {/* Activity List */}
        {userActivities.length > 0 ? (
          <div className="space-y-4">
            {userActivities.map((activity, index) => (
              <div key={index} className="group relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] hover:bg-white/80">
                {/* Gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Dynamic Icon */}
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <i className={`${getIconForActivity(activity.type)} text-white text-xl`}></i>
                    </div>

                    {/* Activity Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                          {activity.type}
                        </h3>
                        <div className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                          Selesai
                        </div>
                      </div>

                      {/* Activity Details */}
                      <div className="space-y-1">
                        {activity.description && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <small className="text-gray-600 font-medium">{activity.description}</small>
                          </div>
                        )}

                        {activity.hasilPremi && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                            <small className="text-green-600 font-semibold">{activity.hasilPremi}</small>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    className="ml-4 group/btn relative overflow-hidden px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-200"
                    onClick={() => handleHapusAktivitas(activity.timestamp)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      <span>Hapus</span>
                    </div>
                  </button>
                </div>

                {/* Timeline indicator */}
                <div className="absolute left-6 top-0 w-0.5 h-full bg-gradient-to-b from-blue-200 via-indigo-200 to-purple-200"></div>
                <div className="absolute left-5 top-6 w-2.5 h-2.5 bg-blue-500 rounded-full shadow-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">Belum Ada Aktivitas</h3>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              Aktivitas asuransi Anda akan muncul di sini. Mulai dengan mengajukan klaim atau memperbarui polis Anda.
            </p>
            <div className="mt-6">
              {/* <button onClick={scrollToServices}  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Mulai Aktivitas
              </button> */}
               <HashLink  to="/#services">
                  <button onClick={scrollToServices}  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Mulai Aktivitas
                  </button>
               </HashLink>
            </div>
          </div>
        )}

        {/* Statistics Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200/50">
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Total: {userActivities.length} aktivitas</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Tersinkronisasi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
// Bagian edit profile
// |---------------------------------------------------------------------|
const renderEditProfile = () => (
    <div className="relative max-w-6xl mx-auto p-8">
      {/* Background dengan glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl"></div>
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl"></div>

      {/* Decorative elements */}
      <div className="absolute top-6 right-6 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-6 left-6 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-xl"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">Edit Profil Anda</h2>
          </div>
          <p className="text-gray-600 text-sm">Perbarui informasi pribadi Anda dengan mudah</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSaveProfile} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Profile Image Section */}
            <div className="lg:col-span-2">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-lg text-center">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Foto Profil</h3>
                  <p className="text-sm text-gray-600">Klik untuk mengganti foto profil Anda</p>
                </div>

                <div className="relative inline-block mb-6">
                  <div className="relative group cursor-pointer" onClick={() => document.getElementById('profileImageInput').click()}>
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 p-1 shadow-2xl">
                      <img
                        src={profileImagePreview || userData.profileImage}
                        alt="Pratinjau Profil"
                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <input
                  type="file"
                  id="profileImageInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />

                <button
                  type="button"
                  className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-3"
                  onClick={() => document.getElementById('profileImageInput').click()}
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Pilih Foto Baru
                </button>

                <p className="text-xs text-gray-500">Format: JPG, PNG. Maksimal 2MB</p>
              </div>
            </div>

            {/* Form Fields Section */}
            <div className="lg:col-span-3">
              <div className="space-y-6">

                {/* Nama Lengkap */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
                  <label htmlFor="editNamaLengkap" className="block text-sm font-semibold text-gray-700 mb-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      Nama Lengkap
                    </div>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium"
                    id="editNamaLengkap"
                    name="namaLengkap"
                    value={editFormData.namaLengkap}
                    onChange={handleEditFormChange}
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                {/* Tanggal Lahir */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
                  <label htmlFor="editTanggalLahir" className="block text-sm font-semibold text-gray-700 mb-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Tanggal Lahir
                    </div>
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 text-gray-800 font-medium"
                    id="editTanggalLahir"
                    name="tanggalLahir"
                    value={editFormData.tanggalLahir}
                    onChange={handleEditFormChange}
                  />
                </div>

                {/* Alamat */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
                  <label htmlFor="editAlamat" className="block text-sm font-semibold text-gray-700 mb-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      Alamat
                    </div>
                  </label>
                  <textarea
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 text-gray-800 font-medium resize-none"
                    id="editAlamat"
                    name="alamat"
                    rows="4"
                    value={editFormData.alamat}
                    onChange={handleEditFormChange}
                    placeholder="Masukkan alamat lengkap Anda"
                  ></textarea>
                </div>

                {/* Email (Read Only) */}
                <div className="bg-gray-50/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                  <label htmlFor="editEmailDisplay" className="block text-sm font-semibold text-gray-500 mb-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      Email (Tidak dapat diubah)
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-100/70 border border-gray-200 rounded-xl text-gray-600 font-medium cursor-not-allowed"
                    id="editEmailDisplay"
                    value={userData.email}
                    readOnly
                    disabled
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 group relative overflow-hidden px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-200"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Simpan Perubahan</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className="flex-1 group relative overflow-hidden px-6 py-4 bg-white/80 border-2 border-gray-300 text-gray-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200"
                    onClick={() => handleNavClick('tentang-saya')}
                  >
                    <div className="relative flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      <span>Batal</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-blue-800 mb-2">Tips Mengisi Profil</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Pastikan nama lengkap sesuai dengan dokumen resmi</li>
                <li>• Gunakan foto profil yang jelas dan profesional</li>
                <li>• Isi alamat dengan lengkap untuk memudahkan proses klaim</li>
                <li>• Data yang akurat membantu proses verifikasi yang lebih cepat</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

// bagian profile user
//  |-------------------------------------------------------------|
  if (isLoading || !userData) { return <div className="d-flex justify-content-center align-items-center vh-100"><div className="spinner-border"></div></div>; }

  return (
    <div className=" min-h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-10 lg:p-10">
  <div className="max-w-7xl mx-auto mt-5">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

      {/* Sidebar Profile */}
      <div className="lg:col-span-1">
        <div className="relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10"></div>

          <div className="relative z-10 p-8">
            {/* Profile Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 p-1 shadow-2xl">
                  <img
                    src={userData.profileImage}
                    alt="Foto Profil"
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                {/* Status indicator */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              <h5 className="text-xl font-bold text-gray-800 mb-4 leading-tight">
                {userData.namaLengkap}
              </h5>

              <button
                className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200"
                onClick={() => handleNavClick('edit-profile')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  <span>Ubah Profil</span>
                </div>
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              <div className="space-y-1">
                <button
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl font-semibold transition-all duration-300 text-left ${
                    activeSection === 'tentang-saya'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-white/50 hover:text-blue-600 hover:scale-102'
                  }`}
                  onClick={() => handleNavClick('tentang-saya')}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeSection === 'tentang-saya'
                      ? 'bg-white/20'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <span>Tentang Saya</span>
                  {activeSection === 'tentang-saya' && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>

                <button
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl font-semibold transition-all duration-300 text-left ${
                    activeSection === 'riwayat-aktivitas'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-white/50 hover:text-blue-600 hover:scale-102'
                  }`}
                  onClick={() => handleNavClick('riwayat-aktivitas')}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeSection === 'riwayat-aktivitas'
                      ? 'bg-white/20'
                      : 'bg-purple-100 text-purple-600'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <span>Riwayat Aktivitas</span>
                  {activeSection === 'riwayat-aktivitas' && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              </div>

              {/* Logout Button */}
              <div className="pt-6 mt-6 border-t border-gray-200/50">
                <button
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-xl font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 hover:scale-102 transition-all duration-300 text-left"
                  onClick={() => handleLogout()}
                >
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                  </div>
                  <span>Keluar</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <div className="relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl min-h-[600px]">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-400/10 to-transparent rounded-full blur-2xl"></div>

          {/* Content Area */}
          <div className="relative z-10 p-8">
            {/* Dynamic Content */}
            <div className="transition-all duration-500 ease-in-out">
              {activeSection === 'tentang-saya' && (
                <div className="animate-fade-in">
                  {renderTentangSaya()}
                </div>
              )}
              {activeSection === 'riwayat-aktivitas' && (
                <div className="animate-fade-in">
                  {renderRiwayatAktivitas()}
                </div>
              )}
              {activeSection === 'edit-profile' && (
                <div className="animate-fade-in">
                  {renderEditProfile()}
                </div>
              )}
            </div>
          </div>

          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>

    {/* Floating Action Button (Optional) */}
    {/* <div className="fixed bottom-8 right-8 z-50">
      <button className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center group">
        <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </button>
    </div> */}
  </div>

  <style jsx>{`
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in {
      animation: fade-in 0.5s ease-out;
    }
  `}</style>
 </div>
  );
}

export default DashboardPage;