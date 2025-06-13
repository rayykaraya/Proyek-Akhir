// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { hashPassword } from '../utils/auth';
import fotoImage from '../assets/images/foto.png';


function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}


function RegisterPage() {
   const [isLoading, setIsLoading] = useState(false);
  // 2. State untuk mengelola semua data form
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    address: '',
    email: '',
    password: '',
    employmentStatus: '', // Nilai default untuk select
    profileImage: fotoImage,
  });

  const navigate = useNavigate(); // Hook untuk mengontrol navigasi

  // 3. Fungsi generik untuk menangani perubahan pada semua input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 4. Fungsi untuk menangani proses submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    // HASILKAN HASH DARI PASSWORD ASLI
    const hashedPassword = await hashPassword(formData.password);

    const registrationData = {
      namaLengkap: formData.fullName,
      tanggalLahir: formData.birthDate,
      email: formData.email,
      alamat: formData.address,
      statusPekerjaan: formData.employmentStatus,
      // SIMPAN HASH PASSWORD, BUKAN PASSWORD ASLI
      password: hashedPassword,
    };

    try {
      let users = JSON.parse(localStorage.getItem('finzureUsers')) || [];
      if (!Array.isArray(users)) {
        users = [];
      }

      const emailExists = users.some(user => user.email === registrationData.email);
      if (emailExists) {
        toast.error('Email ini sudah terdaftar. Silakan gunakan email lain.');
        return;
      }

      users.push(registrationData);
      localStorage.setItem('finzureUsers', JSON.stringify(users));

      toast.success(`Registrasi untuk ${registrationData.namaLengkap} berhasil!`);

      // Mengarahkan pengguna ke halaman login setelah registrasi berhasil
      navigate('/login');

    } catch (error) {
      console.error('Gagal menyimpan data ke Local Storage:', error);
      toast.error('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    }
  };


  // 5. Render JSX (tampilan form)
return (
    // 1. Ganti 'container my-5' dengan wrapper full-width.
    // Kelas 'd-flex' dan 'align-items-center' membantu memusatkan kartu secara vertikal.
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
  <div className="w-full max-w-2xl">
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-white/20 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Buat Akun Baru</h2>
          <p className="text-blue-100 text-sm mt-1">Daftar untuk menjadi bagian dari Finzure</p>
        </div>
      </div>

      {/* Form */}
      <div className="p-8">
        <form id="registerForm" autoComplete="off" onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Masukkan nama sesuai KTP"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                />
                <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir</label>
              <div className="relative">
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                />
                {/* <svg className="absolute right-6 top-3. w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg> */}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
            <div className="relative">
              <textarea
                id="address"
                name="address"
                rows="3"
                placeholder="Masukkan alamat lengkap Anda"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                required
              ></textarea>
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="contoh@email.com"
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                />
                <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Masukkan password"
                  autoComplete="off"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                />
                <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700 mb-2">Apakah Anda sudah Bekerja?</label>
            <div className="relative">
              <select
                id="employmentStatus"
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white"
                required
              >
                <option value="belum">Belum</option>
                <option value="sudah">Sudah</option>
              </select>
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </div>
            ) : 'Daftar Akun'}
          </button>

          <div className="text-center mt-6">
            <span className="text-gray-600 text-sm">
              Sudah punya akun?
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium ml-1 hover:underline">
                Masuk Sekarang
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  );
}

export default RegisterPage;