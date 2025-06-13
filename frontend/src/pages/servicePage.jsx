import React, { useState } from 'react';
import { BuildingOffice, FirstAidKit, Car } from "@phosphor-icons/react";
import '../styles/service.css';
import { HashLink } from 'react-router-hash-link';

// Import halaman kalkulator
import PropertiPage from './kalkulator/PropertiPage';
import KesehatanPage from './kalkulator/KesehatanPage';
import KendaraanPage from './kalkulator/KendaraanPage';

// Komponen Modal
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="max-h-[80vh] overflow-y-auto">{children}</div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}

// Data layanan
const servicesData = [
  {
    iconSrc: <BuildingOffice size={32} />,
    altText: 'Ikon Properti',
    title: 'Asuransi Properti',
    description: 'Lindungi investasi properti Anda dari berbagai musibah dengan solusi Asuransi Properti terpercaya dari Finzure.',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: <PropertiPage />
  },
  {
    iconSrc: <FirstAidKit size={32} />,
    altText: 'Ikon Kesehatan',
    title: 'Asuransi Kesehatan',
    description: 'Prioritaskan kesehatan Anda dan keluarga dengan perlindungan menyeluruh dari risiko biaya medis tak terduga bersama Finzure.',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: <KesehatanPage />
  },
  {
    iconSrc: <Car size={32} />,
    altText: 'Ikon Kendaraan',
    title: 'Asuransi Kendaraan',
    description: 'Memberikan perlindungan komprehensif untuk mobil atau motor Anda dari risiko kerusakan, kehilangan, dan tanggung jawab hukum di jalan raya.',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    component: <KendaraanPage />
  },
];

function ServicesPage() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section id="services" className="services-section">
      <div className="services-container" data-aos="fade-up" data-aos-duration="2000">
        <div className="services-header">
          <h1 className="services-title">
            Apa saja yang <span className="highlight">Anda</span> akan dapatkan?
          </h1>
          <p className="services-subtitle">
            Pilihan perlindungan terbaik untuk kebutuhan asuransi Anda
          </p>
        </div>

        <div className="cards-wrapper">
          {servicesData.map((service, index) => (
            <div className="feature-card" key={index}>
              <div className="card-back"></div>
              <div className="card-style">
                <div className="icon-circle" style={{ background: service.gradient }}>
                  {service.iconSrc}
                </div>
                <h3 className="card-title">{service.title}</h3>
                <p className="card-description">{service.description}</p>
                {/* <button
                  className="card-button"
                >
                  <span>Hitung Premi</span>
                  <svg
                    className="button-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button> */}
                {service.title === "Asuransi Properti" ? (
                  <HashLink  to="/properti">
                        <button
                        className="card-button"
                      >
                        <span>Hitung Premi</span>
                        <svg
                          className="button-arrow"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        </button>
                  </HashLink>
                ) : service.title === "Asuransi Kesehatan" ? (
                  <HashLink  to="/kesehatan">
                      <button
                      className="card-button"
                    >
                      <span>Hitung Premi</span>
                      <svg
                        className="button-arrow"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                </HashLink>
                ) : (
                  <HashLink  to="/kendaraan">
                      <button
                      className="card-button"
                    >
                      <span>Hitung Premi</span>
                      <svg
                        className="button-arrow"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                </HashLink>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeModal !== null && (
        <Modal
          title={servicesData[activeModal].title}
          onClose={() => setActiveModal(null)}
        >
          {servicesData[activeModal].component}
        </Modal>
      )}
    </section>
  );
}

export default ServicesPage;
