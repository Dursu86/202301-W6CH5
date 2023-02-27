import { BooksFileRepo } from './books.file.repo';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('Given', () => {
  const repo = new BooksFileRepo();

  test('Then it should be instanziated', () => {
    expect(repo).toBeInstanceOf(BooksFileRepo);
  });

  describe('When I use query ', () => {
    test('Then should return the data', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const result = await repo.query();
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When I use queryID', () => {
    test('Then it should', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');

      const id = '1';
      const result = await repo.queryId(id);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
    test('Then it should', () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "2"}]');

      const id = '1';
      expect(async () => await repo.queryId(id)).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });
});
