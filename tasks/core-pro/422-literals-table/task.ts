import type { Entity } from './table-models.ts';

type Get<Model extends Entity> = {
  [Prop in `get${Capitalize<Model["table"]>}`]: (id: number) => Model;
};

type Update<Model extends Entity>  = {
  [Prop in `update${Capitalize<Model["table"]>}`]: (id: number, update: Partial<Model>) => Model;
};

type Delete<Model extends Entity>  = {
  [Prop in `delete${Capitalize<Model["table"]>}`]: (id: number) => Model;
};

export type Table<Model extends Entity> = Get<Model> &
  Update<Model> &
  Delete<Model>;
