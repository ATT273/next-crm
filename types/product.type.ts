export type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  mainCategory: number;
  subCategory: number;
  unit: string;
  qty: number;
  sizes: string[];
  importPrice: number;
  skus: IProductSku[];
};

export type CreateProductType = {
  name: string;
  description: string;
  price: number;
  mainCategory: number;
  subCategory: number;
  unit: string;
  qty: number;
  sizes: string[];
  importPrice: number;
};

export interface IProductSku {
  sku: string;
  size: string;
  qty: number;
  price: number;
}

export interface IProductForm {
  name: string;
  mainCategory: string;
  subCategory: string;
  unit: string;
  price: number;
  importPrice: number;
  qty: number;
  sizes?: string[];
  tags?: string[];
  description?: string;
}
