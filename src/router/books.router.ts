import { Router } from 'express';
import { BooksController } from '../controllers/books.controller.js';
import { BooksFileRepo } from '../repository/books.file.repo.js';

// eslint-disable-next-line new-cap
export const booksRouter = Router();
const repo = new BooksFileRepo();
const controller = new BooksController(repo);

booksRouter.get('/', controller.getAll.bind(controller));
booksRouter.get('/:id', controller.get.bind(controller));
booksRouter.post('/', controller.post.bind(controller));
booksRouter.patch('/:id', controller.patch.bind(controller));
booksRouter.delete('/:id', controller.delete.bind(controller));
