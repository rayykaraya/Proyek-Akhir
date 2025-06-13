// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import googleLogo from '../assets/images/google-logo.svg';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email || !password) {
      toast.error('Email dan password tidak boleh kosong!');
      setIsLoading(false);
      return;
    }
    try {
      const users = JSON.parse(localStorage.getItem('finzureUsers')) || [];
      const foundUser = users.find(user => user.email === email);
      if (!foundUser) {
        toast.error('Email tidak terdaftar.');
        setIsLoading(false);
        return;
      }
      const enteredHashedPassword = await hashPassword(password);
      if (enteredHashedPassword === foundUser.password) {
        toast.success(`Selamat datang, ${foundUser.namaLengkap}!`);
        localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
        window.dispatchEvent(new CustomEvent('authChange'));
        navigate('/dashboard');
      } else {
        toast.error('Password salah.');
      }
    } catch (err) {
      toast.error("Gagal melakukan login.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        const googleProfile = {
          namaLengkap: userInfo.data.name,
          email: userInfo.data.email,
          profileImage: userInfo.data.picture,
          isGoogleUser: true,
        };

        let users = JSON.parse(localStorage.getItem('finzureUsers')) || [];
        const existingUser = users.find(user => user.email === googleProfile.email);

        let finalUserData;

        if (existingUser) {
          console.log("Pengguna sudah ada, menggabungkan data...");

          // --- PERBAIKAN DI SINI: Balik urutannya ---
          // Prioritaskan data yang sudah ada di database kita
          finalUserData = { ...googleProfile, ...existingUser };

          const userIndex = users.findIndex(user => user.email === finalUserData.email);
          users[userIndex] = finalUserData;

        } else {
          console.log("Pengguna Google baru, menambahkan ke database...");
          finalUserData = googleProfile;
          users.push(finalUserData);
        }

        localStorage.setItem('finzureUsers', JSON.stringify(users));
        localStorage.setItem('loggedInUser', JSON.stringify(finalUserData));
        localStorage.setItem('authToken', tokenResponse.access_token);

        toast.success(`Login sebagai ${finalUserData.namaLengkap} berhasil!`);
        window.dispatchEvent(new CustomEvent('authChange'));
        navigate('/dashboard');

      } catch (error) {
        console.error("Login Google gagal:", error);
        toast.error("Gagal mengambil data dari Google.");
      }
    },
    onError: () => toast.error('Login Google gagal.'),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
  <div className="w-full max-w-md">
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-white/20 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Masuk</h2>
          <p className="text-blue-100 text-sm mt-1">Akses akun asuransi Anda</p>
        </div>
      </div>

      {/* Form */}
      <div className="p-8">
        <form onSubmit={handleEmailLogin} autoComplete="off" className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="nama@email.com"
                required
              />
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Masukkan password"
                required
              />
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
            ) : 'Masuk'}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-4 text-gray-500 text-sm">atau</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <button
          onClick={() => handleGoogleLogin()}
          className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium py-3 rounded-lg flex items-center justify-center space-x-3 transition-colors duration-200"
        >
          <img src={googleLogo} alt="Google logo" className="w-5 h-5" />
          <span>Masuk dengan Google</span>
        </button>

        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm">
            Belum punya akun?
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium ml-1 hover:underline">
              Daftar Sekarang
            </Link>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
export default LoginPage;