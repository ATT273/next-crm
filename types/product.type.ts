export type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  main_category: number;
  sub_category: number;
  unit: string;
  qty: number;
  sizes: string[];
  imp_price: number;
};

export type CreateProductType = {
  name: string;
  description: string;
  price: number;
  main_category: number;
  sub_category: number;
  unit: string;
  qty: number;
  sizes: string[];
  imp_price: number;
};

export interface IProductSku {
  sku: string;
  size: string;
  qty: number;
  price: number;
  properties: {
    size: string;
    color: string;
  };
}
