import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler.js';
import router from './app/routes/index.js';
import express from 'express';
import { notFound } from './app/middlewares/notFound.js';

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(router);

const getController = (req, res) => {
  res.send('Hello from Product Management !');
};

app.get('/', getController);
app.use(globalErrorHandler);
app.use(notFound);
export default app;