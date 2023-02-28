import { BooksFileRepo } from './books.file.repo';
import fs from 'fs/promises';
import { BooksController } from '../controllers/books.controller';
import exp from 'constants';
import { Book } from '../entities/book.entity';
import { writeFile } from 'fs';

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
        const id = '[]';
        expect(async () => await repo.queryId(id)).rejects.toThrow();
        expect(fs.readFile).toHaveBeenCalled();
      });
    });
    describe('Given the post method', () => {
      describe('When it is called', () => {
        test('Then it should ', async () => {
          (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
          const info = { id: '1' } as unknown as Book;
          const result = await repo.create(info);
          expect(result).toEqual(info);
        });
      });
    });
    describe('Given the update method', () => {
      describe('When it is called', () => {
        test('Then it should return updated data', async () => {
          (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
          const info = { id: '1' } as unknown as Book;
          const result = await repo.update(info);
          expect(result).toEqual(info);
        });
      });
    });
    describe('Given the update method', () => {
      describe('When it is called', () => {
        test('Then it should return updated data', async () => {
          (fs.readFile as jest.Mock).mockResolvedValue(
            '[{"id": "1"}, {"id": "2"}]'
          );
          const info = { id: '1' } as unknown as Book;
          const result = await repo.update(info);
          expect(result).toEqual(info);
        });
      });
    });
    // describe('Given the delete method', () => {
    //   describe('When we pass a item', () => {
    //     test('Then it should call writefile function', async () => {
    //       const value = [{ id: 5, name: 'Test' }];
    //       (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(value));
    //       await repo.delete('id: 5');
    //       expect(fs.writeFile).toHaveBeenCalled();
    //     });
    //   });
    // });
  });
});
