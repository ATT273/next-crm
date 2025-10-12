"use client";
import { IProductSku } from "@/types/product.type";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { useProductStore } from "../../_store/product-store";

interface Props {
  updateSkuItems: (value: IProductSku[]) => void;
}
const AttributeSection = ({ updateSkuItems }: Props) => {
  const { control, setValue } = useFormContext();
  const [skuItems, setSKUItems] = useState<IProductSku[]>([]);
  const _mainCategoryId = useWatch({ name: "mainCategory" });
  const _subCategoryId = useWatch({ name: "subCategory" });
  const _sizes = useWatch({ name: "sizes" });
  const { productDetails } = useProductStore();
  const [sizeInput, setSizeInput] = useState<string>("");

  useEffect(() => {
    updateSkuItems(skuItems);
  }, [skuItems]);

  useEffect(() => {
    if (productDetails.skus) {
      setSKUItems(productDetails.skus);
    }
  }, [productDetails]);

  const handleRemoveTag = (index: number) => {
    const newSizes = [..._sizes];
    const updatedSizes = newSizes.filter((_, i) => i !== index);
    setValue("sizes", updatedSizes);
  };

  return (
    <div className="w-full p-2 rounded-md shadow-sm">
      <div className="mb-2">
        <h3 className="text-lg font-semibold">Attribute</h3>
      </div>
      <div className="flex flex-col gap-3">
        {/* <Controller
          name="qty"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              label="Quantity"
              type="number"
              size="sm"
              placeholder="Enter product quantity"
              className="w-full"
              {...field}
            />
          )}
        /> */}
        <Controller
          name="sizes"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              label="Sizes"
              type="text"
              size="sm"
              placeholder="Enter product sizes"
              className="w-full"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              disabled={!_mainCategoryId || !_subCategoryId}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setValue("sizes", [..._sizes, sizeInput]);
                  setSizeInput("");
                }
              }}
            />
          )}
        />
        <div className="flex gap-2 flex-wrap">
          {_sizes.map((item: string, index: number) => {
            return (
              <span
                key={index}
                className="rounded-full hover:bg-gray-100 hover:text-red-300 hover:line-through bg-gray-900 text-white min-w-[50px] px-2 py-0.5 text-center font-semibold cursor-pointer"
                onClick={() => handleRemoveTag(index)}
              >
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttributeSection;
