import { BooksFileRepo } from './books.file.repo';
import fs from 'fs/promises';
import { BooksController } from '../controllers/books.controller';
import exp from 'constants';

jest.mock('fs/promises');

describe('Given the BooksFileRepo class', () => {
  const repo = new BooksFileRepo();
  test('It should be instanziated', () => {
    expect(repo).toBeInstanceOf(BooksFileRepo);
  });

  describe('When I use query ', () => {
    test('It should return the data', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const result = await repo.query();
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
    test('If there is an error it should return the data', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const result = await repo.query();
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual('1');
    });
  });

  describe('When I use queryID', () => {
    test('Then it should return  a single element', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      const id = '1';
      const result = await repo.queryId(id);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
    test('If there is an error then it should return', () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const id = '1';
      expect(async () => await repo.queryId(id)).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });
  describe('Given the post method', () => {
    describe('When it is called', () => {
      test('Then it should ', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
        const info = [{ id: '1' }] as Book[];
        const result = await repo.update(info);
        expect(result).toEqual(info);
      });
    });
  });
});
