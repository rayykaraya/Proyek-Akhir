const axios = require('axios');

module.exports = [
  {
    method: 'POST',
    path: '/predict/kendaraan',
    handler: async (request, h) => {
      try {
        const response = await axios.post('http://localhost:8000/predict/kendaraan', request.payload);
        return h.response(response.data).code(200);
      } catch (error) {
        console.error('Error predict kendaraan:', error.message);
        return h.response({ error: 'Gagal prediksi kendaraan' }).code(500);
      }
    }
  },
  {
    method: 'POST',
    path: '/api/rekomendasi/kendaraan',
    handler: async (request, h) => {
      try {
        const response = await axios.post('http://localhost:8000/rekomendasi/kendaraan', request.payload);
        return h.response(response.data).code(200);
      } catch (error) {
        console.error('Error rekomendasi kendaraan:', error.message);
        return h.response({ error: 'Gagal rekomendasi kendaraan' }).code(500);
      }
    }
  }
];
