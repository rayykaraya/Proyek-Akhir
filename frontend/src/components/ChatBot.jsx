import React, { useState, useEffect, useRef } from 'react';
import { ChatCircleDots } from "@phosphor-icons/react";
// import chatIcon from '../assets/images/icons8-chat-100.png';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // ... (kode untuk fungsi drag-and-drop tidak perlu diubah) ...
  const [position, setPosition] = useState({ x: window.innerWidth - 90, y: window.innerHeight / 2 - 30 });
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({ offsetX: 0, offsetY: 0 });
  const buttonRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // Fungsi untuk membuka/menutup jendela chat
  const toggleChat = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    // 1. TAMBAHKAN PESAN AWAL DENGAN SARAN/PILIHAN
    if (newIsOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "Halo! Saya Finzure Bot. Pilih salah satu topik di bawah atau ketik pertanyaan Anda.",
          sender: 'bot',
          // Ini adalah daftar pertanyaan default
          suggestions: ['Info Asuransi Kesehatan', 'Premi Asuransi Kendaraan', 'Tentang Finzure']
        }
      ]);
    }
  };

  // Fungsi untuk memproses jawaban bot
  const getBotResponse = (userMessage) => {
    const userMessageLower = userMessage.toLowerCase();
    let botText = "Maaf, saya tidak mengerti. Coba pilih salah satu topik yang tersedia atau tanyakan tentang jenis asuransi (kesehatan, properti, kendaraan).";

    if (userMessageLower.includes('kesehatan')) {
      botText = "Asuransi kesehatan kami memberikan perlindungan biaya medis yang komprehensif. Anda bisa menghitung preminya di halaman layanan kami.";
    } else if (userMessageLower.includes('kendaraan') || userMessageLower.includes('mobil')) {
      botText = "Tentu, untuk asuransi kendaraan, kami melindungi dari risiko TLO hingga All Risk. Halaman kalkulator kendaraan siap membantu Anda.";
    } else if (userMessageLower.includes('properti') || userMessageLower.includes('rumah')) {
      botText = "Kami melindungi aset properti Anda dari kebakaran, pencurian, dan bencana alam. Silakan cek kalkulator properti kami.";
    } else if (userMessageLower.includes('tentang finzure')) {
      botText = "Finzure adalah platform yang membantu Anda menemukan dan membandingkan produk asuransi terbaik di Indonesia.";
    }

    return botText;
  };

  // Fungsi untuk mengirim pesan (dari input teks)
  const handleSendMessage = (e) => {
    e.preventDefault();
    const userMessageText = inputValue.trim();
    if (!userMessageText) return;

    // Tambahkan pesan pengguna
    const newUserMessage = { id: Date.now(), text: userMessageText, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');

    // Dapatkan dan tambahkan jawaban bot
    setTimeout(() => {
      const botText = getBotResponse(userMessageText);
      const botResponse = { id: Date.now() + 1, text: botText, sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  // 2. FUNGSI BARU UNTUK MENANGANI KLIK PADA TOMBOL SARAN
  const handleSuggestionClick = (suggestionText) => {
    // Tambahkan pesan dari tombol saran seolah-olah pengguna yang mengetik
    const newUserMessage = { id: Date.now(), text: suggestionText, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);

    // Dapatkan dan tambahkan jawaban bot
    setTimeout(() => {
      const botText = getBotResponse(suggestionText);
      const botResponse = { id: Date.now() + 1, text: botText, sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };


   return (
   <>
      {!isOpen && (
        <button
          className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 group animate-pulse ${isOpen ? 'hidden' : ''}`}
          onClick={toggleChat}
          aria-label="Buka Chat"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full animate-spin-slow opacity-75"></div>
          <div className="relative w-full h-full flex items-center justify-center">
            {/* <img src={chatIcon} alt="Ikon Chat" className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300 filter brightness-0 invert" /> */}
            <ChatCircleDots className='w-8 h-8 group-hover:rotate-12 transition-transform duration-300 filter brightness-0 invert' size={32} />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
        </button>
      )}

      <div className={`fixed bottom-6 right-6 z-50 w-96 transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95 pointer-events-none'}`}>
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Animated background */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-gradient-xy"></div> */}

          <header className="relative px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span className="font-bold text-lg">Finzure Assistant</span>
              </div>
              <button
                className="w-8 h-8 hover:bg-white/20 rounded-full transition-all duration-300 hover:rotate-90"
                onClick={toggleChat}
              >
                <span className="text-xl font-light">&times;</span>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </header>

          <div className="relative h-96 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
            {messages.map(msg => (
              <div key={msg.id} className="space-y-3">
                <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white ml-auto'
                      : 'bg-white/80 backdrop-blur-sm text-gray-800 border border-white/30'
                  }`}>
                    <div className="text-sm leading-relaxed">{msg.text}</div>
                  </div>
                </div>

                {msg.suggestions && (
                  <div className="flex flex-wrap gap-2 px-2">
                    {msg.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-blue-300/30 text-sm text-gray-700 hover:from-blue-500/30 hover:to-purple-500/30 hover:scale-105 transition-all duration-300 hover:shadow-lg"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="relative p-4 bg-white/5 backdrop-blur-sm border-t border-white/10"
            onSubmit={handleSendMessage}
          >
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 p-2 focus-within:ring-2 focus-within:ring-purple-500/50 transition-all duration-300">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ketik pesan Anda..."
                className="flex-1 bg-transparent px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Kirim Pesan"
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white hover:scale-110 hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 flex items-center justify-center"
              >
                <i className="bi bi-send-fill text-sm"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-xy {
          0%, 100% { transform: translateX(-50%) translateY(-50%) rotate(0deg); }
          25% { transform: translateX(-50%) translateY(-50%) rotate(90deg); }
          50% { transform: translateX(-50%) translateY(-50%) rotate(180deg); }
          75% { transform: translateX(-50%) translateY(-50%) rotate(270deg); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-gradient-xy {
          animation: gradient-xy 4s ease infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }

        .scrollbar-thumb-purple-300::-webkit-scrollbar-thumb {
          background: rgba(196, 181, 253, 0.5);
          border-radius: 2px;
        }

        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </>
  );
}

export default Chatbot;