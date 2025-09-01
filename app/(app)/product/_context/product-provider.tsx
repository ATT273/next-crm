import React, { createContext, useContext } from "react";

export type ProductContextType = {
  selectedProductId?: string;
  productDetails: any;
};
export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);
const ProductProvider = ({
  selectedProductId,
  productDetails,
  children,
}: {
  children: React.ReactNode;
} & Partial<ProductContextType>) => {
  return (
    <ProductContext.Provider
      value={{
        selectedProductId,
        productDetails,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);

  if (!context || Object.keys(context).length === 0) {
    throw new Error(
      "useTourProductContext must be used within a TourProductProvider"
    );
  }

  return context as ProductContextType;
};

export default ProductProvider;
