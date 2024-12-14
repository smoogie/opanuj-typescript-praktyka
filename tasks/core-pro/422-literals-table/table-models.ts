export type Entities = 'user' | 'product' | 'order';

export interface Entity {
  table: string;
  id: number;
}

export interface User  extends Entity {
  table: 'user';
  id: number;
  name: string;
  email: string;
}

export interface Product extends Entity {
  table: 'product';
  id: number;
  name: string;
  price: number;
}

export interface Order extends Entity {
  table: 'order';
  id: number;
  productId: number;
  quantity: number;
}
