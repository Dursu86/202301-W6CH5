/* eslint-disable no-unused-vars */
import fs from 'fs/promises';

const file = 'data/data.json';

type Book = {
  id: number;
  name: string;
  author: string;
  price: string;
  synopsis: string;
};

export interface BooksRepoStructure {
  viewAll(): Promise<Book[]>;
  viewOne(id: Book['id']): Promise<Book>;
  write(data: Book): Promise<void>;
  update(id: number, newData: {}): Promise<void>;
  // Delete(info: Scrub['id']): Promise<void>;
}
export class BooksFileRepo implements BooksRepoStructure {
  viewAll() {
    return fs
      .readFile(file, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data) as Book[]);
  }

  viewOne(id: Book['id']) {
    return fs.readFile(file, { encoding: 'utf-8' }).then((data) => {
      const parsedData: Book[] = JSON.parse(data);
      return parsedData.filter((item) => item.id === id)[0];
    });
  }

  async write(info: Book) {
    const data = await fs.readFile(file, 'utf-8');
    const parsedData: Book[] = JSON.parse(data);
    const newID: number = parsedData.length;
    info.id = newID + 1;
    const finalData = JSON.stringify([...parsedData, info]);
    await fs.writeFile(file, finalData, 'utf-8');
  }

  async update(id: number, newData: any) {
    const data = await fs.readFile(file, 'utf-8');
    const parseJSON = JSON.parse(data);
    const updatedData = parseJSON.map((item: { id: number }) => {
      if (item.id === id) {
        return { ...item, ...newData };
      }

      return item;
    });
    const finalFile = JSON.stringify(updatedData);
    await fs.writeFile(file, finalFile, 'utf-8');
  }

  delete(id: Book['id']) {
    const data = fs.readFile(file, 'utf-8').then((data) => {
      const parsed = JSON.parse(data) as Book[];
      const deleted = parsed.filter((item) => item.id !== id);
      fs.writeFile(file, JSON.stringify(deleted));
      return deleted;
    });
    return data;
  }
}
