const axios = require('axios');

module.exports = [
  {
    method: 'POST',
    path: '/predict/kesehatan',
    handler: async (request, h) => {
      try {
        const response = await axios.post('http://localhost:8000/predict/kesehatan', request.payload);
        return h.response(response.data).code(200);
      } catch (error) {
        console.error('Error predict kesehatan:', error.message);
        return h.response({ error: 'Gagal prediksi kesehatan' }).code(500);
      }
    }
  },
  {
    method: 'POST',
    path: '/rekomendasi/kesehatan',
    handler: async (request, h) => {
      try {
        const response = await axios.post('http://localhost:8000/rekomendasi/kesehatan', request.payload);
        return h.response(response.data).code(200);
      } catch (error) {
        console.error('Error rekomendasi kesehatan:', error.message);
        return h.response({ error: 'Gagal rekomendasi kesehatan' }).code(500);
      }
    }
  }
];
