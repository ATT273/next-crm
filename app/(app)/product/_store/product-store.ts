import { ProductType } from "@/types/product.type";
import { create } from "zustand";
interface IState {
  selectedProductId: string;
  productDetails: ProductType;
  setSelectedId: (id: string) => void;
  setProductDetails: (values: ProductType) => void;
}
export const useProductStore = create<IState>((set) => ({
  selectedProductId: "",
  productDetails: {} as ProductType,
  setSelectedId: (id: string) =>
    set((state) => ({ ...state, selectedProductId: id })),
  setProductDetails: (values: ProductType) =>
    set((state) => ({ ...state, productDetails: values })),
}));
