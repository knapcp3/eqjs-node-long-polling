type whereParams = {
  [key: string]: string | boolean | null | number;
};

export type CRUDArgParams = {
  where: whereParams;
} | undefined;

export interface ICRUDService<T, U> {
  existsById: (id: string) => Promise<boolean>;
  findById: (id: string) => Promise<T | undefined>;
  findAll: (params: CRUDArgParams) => Promise<T[]>;
  deleteById: (id: string) => void;
  deleteAll: (params: CRUDArgParams) => void;
  updateById: (id: string, item: T) => Promise<T>;
  updateAll: (params: CRUDArgParams) => Promise<T[]>;
  create: (item: U) => Promise<T>;
  createAll: (items: U[]) => Promise<T[]>;
}
