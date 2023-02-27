export interface Repo<T> {
  query(): Promise<T[]>;
  queryId(_id: string): Promise<T>;
  create(_data: Partial<T>): Promise<T>;
  update(_info: Partial<T>): Promise<T>;
  delete(_id: string): Promise<void>;
}
