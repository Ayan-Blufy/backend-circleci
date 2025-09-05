import express from 'express';
import injectRouters from './components/injectRouter.js';
import injectMiddlewares from './middlewares/injectMiddlewares.js';

const app = express();

injectMiddlewares(app);
injectRouters(app);





export default app;
