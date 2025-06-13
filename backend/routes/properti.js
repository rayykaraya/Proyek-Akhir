const axios = require('axios');

module.exports = [
  {
    method: 'POST',
    path: '/predict/properti',
    handler: async (request, h) => {
      try {
        const response = await axios.post('http://localhost:8000/predict/properti', request.payload);
        return h.response(response.data).code(200);
      } catch (error) {
        console.error('Error predict properti:', error.message);
        return h.response({ error: 'Gagal prediksi properti' }).code(500);
      }
    }
  },
  {
    method: 'POST',
    path: '/rekomendasi/properti',
    handler: async (request, h) => {
      try {
        const response = await axios.post('http://localhost:8000/rekomendasi/properti', request.payload);
        return h.response(response.data).code(200);
      } catch (error) {
        console.error('Error rekomendasi properti:', error.message);
        return h.response({ error: 'Gagal rekomendasi properti' }).code(500);
      }
    }
  }
];
