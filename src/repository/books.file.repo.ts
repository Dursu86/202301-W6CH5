import fs from 'fs/promises';
import { Book } from '../entities/book.entity';
import { Repo } from './repo.interface';

const file = 'data/data.json';

export class BooksFileRepo implements Repo<Book> {
  async query(): Promise<Book[]> {
    const data: string = await fs.readFile(file, { encoding: 'utf-8' });
    return JSON.parse(data);
  }

  async queryId(id: string): Promise<Book> {
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: Book[] = JSON.parse(initialData);
    const finalData = data.find((item) => item.id === id);
    if (!finalData) throw new Error('Error id not found');
    return finalData;
  }

  async create(info: Partial<Book>): Promise<Book> {
    // Podriamos añadir una función para validar. Nunca nos podemos fiar de
    // las validaciones del front.
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: Book[] = JSON.parse(initialData);
    info.id = String(Math.floor(Math.random() * 1000_000));
    const finalData = [...data, info];
    await fs.writeFile(file, JSON.stringify(finalData), { encoding: 'utf-8' });
    return info as Book;
  }

  async update(info: Partial<Book>): Promise<Book> {
    if (!info.id) throw new Error('Not valid data');
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: Book[] = JSON.parse(initialData);
    let updatedItem: Book = {} as Book;
    const finalData = data.map((item) => {
      if (item.id === info.id) {
        updatedItem = { ...item, ...info };
        return updatedItem;
      }

      return item;
    });

    if (!updatedItem.id) throw new Error('Id not found');
    await fs.writeFile(file, JSON.stringify(finalData), 'utf-8');
    return updatedItem as Book;
  }

  async delete(id: Book['id']): Promise<void> {
    const initialData: string = await fs.readFile(file, {
      encoding: 'utf-8',
    });
    const data: Book[] = JSON.parse(initialData);
    const index = data.findIndex((item) => item.id === id);
    if (index < 0) throw new Error('Id not found');
    data.slice(index, 1);
    await fs.writeFile(file, JSON.stringify(data), 'utf-8');
  }
}
