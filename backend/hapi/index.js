const Hapi = require('@hapi/hapi');
const kesehatanRoutes = require('./routes/kesehatan');
const kendaraanRoutes = require('./routes/kendaraan');
const propertiRoutes = require('./routes/properti');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin:'*'
      }
    }
  });

  server.route([...kesehatanRoutes, ...kendaraanRoutes, ...propertiRoutes]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
