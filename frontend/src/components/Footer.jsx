// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Impor file CSS yang baru kita buat
import MapComponent from './MapComponent';

function Footer() {
  return (
   <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Kolom 1: Produk */}
          <div className="mb-8 lg:mb-0">
            <h5 className="text-lg font-semibold mb-4 text-white">Produk</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="/properti"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Asuransi Properti
                </a>
              </li>
              <li>
                <a
                  href="/kesehatan"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Asuransi Kesehatan
                </a>
              </li>
              <li>
                <a
                  href="/kendaraan"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Asuransi Kendaraan
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 2: Kontak Kami */}
          <div className="mb-8 lg:mb-0">
            <h5 className="text-lg font-semibold mb-4 text-white">Kontak Kami</h5>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">+62 823-3802-3404</li>
              <li className="text-gray-300 text-sm">08.00 - 17.00</li>
              <li className="text-gray-300 text-sm">Semarang</li>
            </ul>
          </div>

          {/* Kolom 3: Bantuan */}
          <div className="mb-8 md:mb-0">
            <h5 className="text-lg font-semibold mb-4 text-white">Bantuan</h5>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">Pengembangan Premi</li>
              <li className="text-gray-300 text-sm">Syarat, Ketentuan & Privasi</li>
            </ul>
          </div>

          {/* Kolom 4: Lokasi & Sosial Media */}
          <div>
            <div className="mb-6">
              <div className="mb-6">
                <MapComponent />
              </div>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zm0 21.417c-5.185 0-9.431-4.246-9.431-9.43s4.246-9.43 9.431-9.43 9.43 4.246 9.43 9.43-4.245 9.43-9.43 9.43zm4.967-12.47c-.31-.31-.83-.31-1.14 0l-2.673 2.672V6.487c0-.448-.364-.812-.812-.812s-.812.364-.812.812v5.132L8.874 8.947c-.31-.31-.83-.31-1.14 0s-.31.83 0 1.14l3.5 3.5c.155.155.358.233.57.233s.415-.078.57-.233l3.5-3.5c.31-.31.31-.83 0-1.14z"/>
                </svg>
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bagian Copyright di Bawah */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-0">
              Finzure All Right Reserved 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;