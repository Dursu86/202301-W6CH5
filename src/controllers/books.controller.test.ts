import { BooksFileRepo } from '../repository/books.file.repo';
import { BooksController } from './books.controller';
import { Response, Request, NextFunction } from 'express';

describe('Given books controller ', () => {
  const repo: BooksFileRepo = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const req = {
    body: {},
    params: { id: '' },
  } as unknown as Request;

  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();
  const controller = new BooksController(repo);
  describe('get all ', () => {
    test('Then it there are not errors ', async () => {
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it there are errors ', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });
});
