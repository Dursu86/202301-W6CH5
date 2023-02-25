import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { booksRouter } from './router/books.router.js';

export type Books = {
  id: number;
  title: string;
  author: string;
};

export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/books', booksRouter);
