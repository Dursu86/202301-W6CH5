import { Response, Request } from 'express';
import { BooksFileRepo } from '../repository/books.file.repo.js';

export class BooksController {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars
  constructor(public repo: BooksFileRepo) {}

  getAll(_req: Request, resp: Response) {
    this.repo.read().then((data) => {
      resp.json(data);
    });
  }

  get(req: Request, resp: Response) {
    resp.send('This is a book ' + req.params.id);
  }

  post(_req: Request, _resp: Response) {}

  patch(_req: Request, _resp: Response) {}

  delete(_req: Request, _resp: Response) {}
}
