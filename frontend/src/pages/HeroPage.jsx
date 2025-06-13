import React from 'react';
import homeBackground from '../assets/images/heroBackground.png';
import '../styles/hero.css';
import { HashLink } from 'react-router-hash-link';

function Hero() {

  const scrollToServices = () => {
  const homeElement = document.getElementById('services');
  if (homeElement) {
    homeElement.scrollIntoView({ behavior: 'smooth' });
  }
};
 const heroStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <section id="home" className="finzure-hero">
      {/* Floating background elements */}
      <div className="floating-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="floating-circle circle-4"></div>
        <div className="floating-circle circle-5"></div>
      </div>

      {/* Grid background */}
      <div className="grid-background"></div>

      <div className="hero-container">
        {/* Left content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">🚀 Powered by AI & ML</span>
          </div>

          <h1 className="hero-title">
            <span className="title-gradient">Finzure</span>
          </h1>

          <p className="hero-subtitle">
            Inovasi Asuransi Digital dengan Kecerdasan Buatan
          </p>

          <p className="hero-description">
            Finzure mengintegrasikan teknologi terkini, termasuk model machine learning untuk menciptakan solusi asuransi yang adaptif,
            efisien, dan terpercaya.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="number-stat">99.9%</span>
              <span className="label-stat_item">Uptime</span>
            </div>
            <div className="stat-item">
              <span className="number-stat">24/7</span>
              <span className="label-stat_item">AI Support</span>
            </div>
            <div className="stat-item">
              <span className="number-stat">1M+</span>
              <span className="label-stat_item">Protected Users</span>
            </div>
          </div>

          <div className="hero-buttons">
            <button className="cta-primary" onClick={scrollToServices}>
              <span>Eksplorasi Inovasi Finzure</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* <button className="cta-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M8 12L16 12M16 12L12 8M16 12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Lihat Artikel</span>
            </button> */}
              <HashLink className='no-underline' to="/artikel">
                <button className="cta-secondary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M8 12L16 12M16 12L12 8M16 12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Lihat Artikel</span>
                </button>
              </HashLink>
          </div>
        </div>

        {/* Right image */}
        <div className="hero-image">
          <div className="image-container">
            <div className="image-backdrop"></div>
            <div className="main-illustration">
              {/* AI/ML themed illustration */}
              <div className="ai-brain">
                <div className="brain-core"></div>
                <div className="neural-networks">
                  <div className="network-node node-1"></div>
                  <div className="network-node node-2"></div>
                  <div className="network-node node-3"></div>
                  <div className="network-node node-4"></div>
                  <div className="network-node node-5"></div>
                  <div className="network-connection conn-1"></div>
                  <div className="network-connection conn-2"></div>
                  <div className="network-connection conn-3"></div>
                  <div className="network-connection conn-4"></div>
                </div>
              </div>

              {/* Floating cards */}
              {/* <div className="floating-cards">
                <div className="card card-1">
                  <div className="card-icon">🛡️</div>
                  <div className="card-text">Secure</div>
                </div>
                <div className="card card-2">
                  <div className="card-icon">⚡</div>
                  <div className="card-text">Fast</div>
                </div>
                <div className="card card-3">
                  <div className="card-icon">🤖</div>
                  <div className="card-text">Smart</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
