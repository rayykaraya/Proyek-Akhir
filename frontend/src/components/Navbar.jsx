// // src/components/Navbar.jsx

// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate, useLocation } from 'react-router-dom';
// import { HashLink } from 'react-router-hash-link';
// import finzureLogo from '/favicon.png';

// function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('loggedInUser'));

//   // 1. STATE BARU untuk mengontrol menu
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Efek untuk memantau status login (ini sudah benar)
//   useEffect(() => {
//     const handleAuthChange = () => {
//       setIsLoggedIn(!!localStorage.getItem('loggedInUser'));
//     };
//     window.addEventListener('authChange', handleAuthChange);
//     return () => window.removeEventListener('authChange', handleAuthChange);
//   }, []);

//   // 2. EFEK YANG DIPERBARUI untuk menutup menu
//   // Setiap kali URL berubah, kita paksa state 'isMenuOpen' menjadi false.
//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [location]);

//   const handleTogglerClick = () => {
//     setIsMenuOpen(!isMenuOpen); // Toggle state menu
//   };

//   return (
//     <header>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
//         <div className="container-fluid">
//           <HashLink className="navbar-brand d-flex align-items-center" to="/#home">
//             <img src={finzureLogo} alt="Finzure Logo" width="100" height="50" className="d-inline-block align-text-top mx-5" />
//           </HashLink>

//           {/* 3. TOMBOL SEKARANG DIKONTROL OLEH REACT */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             onClick={handleTogglerClick} // Memanggil fungsi untuk mengubah state
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* 4. KELAS 'show' DIKONTROL OLEH STATE 'isMenuOpen' */}
//           <div
//             className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
//             id="navbarNav"
//           >
//             <ul className={`navbar-nav mx-auto mb-50 mb-lg-0`}>
//               {/* Saat link di bawah ini diklik, 'location' akan berubah,
//                   useEffect akan berjalan, dan setIsMenuOpen(false) akan dipanggil */}
//               <li className="nav-item mx-5"><HashLink className="nav-link" to="/#home">Home</HashLink></li>
//               <li className="nav-item mx-5"><HashLink className="nav-link" to="/#services">Services</HashLink></li>
//               <li className="nav-item mx-5"><HashLink className="nav-link" to="/#about">About Us</HashLink></li>
//               {isLoggedIn && <li className="nav-item mx-5"><NavLink className="nav-link" to="/dashboard">Dashboard</NavLink></li>}
//             </ul>
//             <div className="d-flex">
//               {!isLoggedIn && (
//                 <>
//                   <HashLink to="/login" className="btn btn-primary me-3">Login</HashLink>
//                   <NavLink to="/register" className="btn btn-outline-dark">Register</NavLink>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }
// export default Navbar;

// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import finzureLogo from '/favicon.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Monitor authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const user = localStorage.getItem('loggedInUser');
        setIsLoggedIn(!!user);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(false);
      }
    };

    // Initial check
    checkAuthStatus();

    // Listen for auth changes
    const handleAuthChange = () => checkAuthStatus();
    window.addEventListener('authChange', handleAuthChange);

    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('loggedInUser');
      setIsLoggedIn(false);
      window.dispatchEvent(new Event('authChange'));
      navigate('/');
      closeMobileMenu();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `no-underline relative text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-50 ${
      isActive ? 'text-blue-600 bg-blue-50' : ''
    }`;

  const hashLinkClass = "no-underline text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-50 block";

  return (
    <header className="relative">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <HashLink
              className="flex items-center flex-shrink-0 hover:opacity-80 transition-opacity duration-300"
              to="/#home"
              onClick={closeMobileMenu}
              aria-label="Finzure Home"
            >
              <img
                src={finzureLogo}
                alt="Finzure"
                className="h-10 w-auto"
                loading="lazy"
              />
            </HashLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              <ul className="mt-3 flex items-center space-x-1">
                <li className="no-underline decoration-none">
                  <HashLink className={hashLinkClass} to="/#home">
                    Home
                  </HashLink>
                </li>
                <li>
                  <HashLink className={hashLinkClass} to="/#services">
                    Services
                  </HashLink>
                </li>
                <li>
                  <HashLink className={hashLinkClass} to="/#about">
                    About Us
                  </HashLink>
                </li>
                <li className="nav-item mx-3">
                  <NavLink className={hashLinkClass} to="/artikel">
                    Artikel
                  </NavLink>
                </li>
                {isLoggedIn && (
                  <li>
                    <NavLink className={navLinkClass} to="/dashboard">
                      Dashboard
                    </NavLink>
                  </li>
                )}
              </ul>

              {/* Desktop Auth Buttons */}
              <div className="flex  items-center space-x-3 ml-6">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className=" no-underline bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className=" no-underline border-2 border-gray-800 hover:border-blue-600 text-gray-800 hover:text-blue-600 font-medium px-6 py-2 rounded-lg transition-all duration-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-2"
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span
                className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? 'max-h-screen opacity-100 visible'
                : 'max-h-0 opacity-0 invisible'
            } overflow-hidden`}
          >
            <div className="bg-white shadow-lg rounded-b-lg">
              <ul className="py-4 space-y-2">
                <li>
                  <HashLink
                    className={hashLinkClass}
                    to="/#home"
                    onClick={closeMobileMenu}
                  >
                    Home
                  </HashLink>
                </li>
                <li>
                  <HashLink
                    className={hashLinkClass}
                    to="/#services"
                    onClick={closeMobileMenu}
                  >
                    Services
                  </HashLink>
                </li>
                <li>
                  <HashLink
                    className={hashLinkClass}
                    to="/#about"
                    onClick={closeMobileMenu}
                  >
                    About Us
                  </HashLink>
                </li>
                {isLoggedIn && (
                  <li>
                    <NavLink
                      className={navLinkClass}
                      to="/dashboard"
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
              </ul>

              {/* Mobile Auth Buttons */}
              <div className="px-4 pb-4 pt-2">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="space-y-3">
                    <NavLink
                      to="/login"
                      className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={closeMobileMenu}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="block w-full text-center border-2 border-gray-800 hover:border-blue-600 text-gray-800 hover:text-blue-600 font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={closeMobileMenu}
                    >
                      Register
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;