import errorHandler from '../middlewares/errorHandler.js';
import client from 'prom-client';
const injectRouters = (app) => {
  app.use('/api/health', (_req, res, _next) => {
    res.status(200).send({
      status: true,
      statusCode: 200,
      error: null,
      data: {
        message: 'looks good server1 👍',
      },
    });
  });
  
  app.get("/metrics", async (req, res) => {
  try {
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

  // all routes here ...

  app.use('*', (req, res, _next) => {
    res.status(404).send({
      status: false,
      message: `Route: "${req.originalUrl}" Not Found`,
    });
  });

  app.use(errorHandler);
};

export default injectRouters;
