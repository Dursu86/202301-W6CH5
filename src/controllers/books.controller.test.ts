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
  describe('Using getAll method ', () => {
    test('Then, function query has to be called with no errors ', async () => {
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('If there are errors it should throw a new error ', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('Using get method ', () => {
    test('Then, function queryId has to be called with no errors ', async () => {
      await controller.get(req, resp, next);
      expect(repo.queryId).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('If there are errors it should throw a new error ', async () => {
      (repo.queryId as jest.Mock).mockRejectedValue(new Error());
      await controller.get(req, resp, next);
      expect(repo.queryId).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('Using post method ', () => {
    test('Then, function post has to be called with no errors ', async () => {
      await controller.post(req, resp, next);
      expect(repo.create).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('If there are errors it should throw a new error ', async () => {
      (repo.create as jest.Mock).mockRejectedValue(new Error());
      await controller.post(req, resp, next);
      expect(repo.create).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });
  describe('Using patch method ', () => {
    test('Then, function patch has to be called with no errors ', async () => {
      await controller.patch(req, resp, next);
      req.body.id = '1';
      expect(req.body.id).toBe('1');
      expect(repo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then, function patch has to be called with no errors ', async () => {
      await controller.patch(req, resp, next);
      req.params.id = '1';
      expect(req.body.id).toBe('1');
      expect(repo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('If there are errors it should throw a new error ', async () => {
      (repo.update as jest.Mock).mockRejectedValue(new Error());
      await controller.patch(req, resp, next);
      expect(repo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });
  describe('Using delete method ', () => {
    test('Then, function delete has to be called with no errors ', async () => {
      await controller.delete(req, resp, next);
      expect(repo.delete).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('If there are errors it should throw a new error ', async () => {
      (repo.delete as jest.Mock).mockRejectedValue(new Error());
      await controller.delete(req, resp, next);
      expect(repo.delete).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });
});
