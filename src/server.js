import app from './app.js';
import handleShutdown from './shutdown.js';
import { DB, DB_HOST, DB_PARAMETERS, PORT } from './variables/env.js';
import client from 'prom-client';

const collectDefaultMetrics = client.collectDefaultMetrics;

// enable collection of default metrics
collectDefaultMetrics({register: client.register});

// function to start the server
const server = (app, port) => {
  return app.listen(port, () => {
    console.log('Express started');
    console.log(`Listening  port ${port}`);
    console.log(`Health route GET http://127.0.0.1:${port}/api/health`);
  });
};

// start server
server(app, PORT);

// connectToDatabase(DB_HOST, DB, DB_PARAMETERS)
//   .then((_info) => {
//     console.log('Mongoose connected to the Server 🤝');
//     const s = server(app, PORT);
//     handleShutdown(s);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
