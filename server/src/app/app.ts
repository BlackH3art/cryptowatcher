import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import tokensRouter from '../modules/tokens/tokens.router';
import userRouter from '../modules/user/user.router';

import { swaggerConfig } from '../configs/swaggerConfig';
import { initializeUser } from '../utils/initializeUser';
import { auth } from '../middlewares/auth';
import { updateTokensPricesCronJob } from '../modules/cron/cron.controller';

const buildApp = () => {
  const app = express(); 

  app.use(express.json());
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
  
  app.get('/', (req, res) => {
    res.send('Hello world');
  });

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerConfig)));
  app.use('/user', userRouter);
  // app.use('/tokens', auth, tokensRouter);
  app.use('/tokens', tokensRouter);

  initializeUser();
  updateTokensPricesCronJob();

  return app;
};

const app = buildApp();

export default app;