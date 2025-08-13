"use client";
import { IProductSku } from "@/types/product.type";
import { TagsInput, TextInput, Card } from "@mantine/core";
import { useEffect, useState } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { mainCategory, subCategory } from "@/constants";

interface Props {
  updateSkuItems: (value: IProductSku[]) => void;
}
const AttributeSection = ({ updateSkuItems }: Props) => {
  const { control, getValues, setValue } = useFormContext();
  const [sizes, setSizes] = useState<string[]>([]);
  const [skuItems, setSKUItems] = useState<IProductSku[]>([]);
  const _mainCategoryId = useWatch({ name: "mainCategory" });
  const _subCategoryId = useWatch({ name: "subCategory" });

  useEffect(() => {
    if (sizes.length > 0) {
      const formValues = getValues();
      const mainCode = mainCategory.find(
        (item) => item.value === formValues.mainCategory
      );
      const subCode = subCategory.find(
        (item) => item.value === formValues.subCategory
      );
      const _skuItems = sizes.map((size) => {
        const sku = `${mainCode?.code}.${subCode?.code}.${size}`;
        return {
          sku,
          size,
          qty: 0,
          price: formValues.price,
          properties: {
            size: "",
            color: "",
          },
        };
      });
      setSKUItems(_skuItems);
    }
  }, [sizes]);

  useEffect(() => {
    updateSkuItems(skuItems);
  }, [skuItems]);

  const handleChangeSizes = (values: string[]) => {
    setSizes(values);
    setValue("sizes", values);
  };

  const handleSkuChanges = (type: string, value: string, index: number) => {
    const _skuItems = skuItems.map((item, i) =>
      i === index ? { ...item, [type]: Number(value) } : item
    );
    setSKUItems(_skuItems);
  };
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      classNames={{
        root: "w-full p-2",
      }}
    >
      <h3 className="text-lg font-semibold mb-3">Attribute</h3>
      <Controller
        name="qty"
        control={control}
        render={({ field }) => (
          <TextInput
            withAsterisk
            label="Quantity"
            type="number"
            placeholder="Enter product quantity"
            classNames={{ root: "w-full" }}
            {...field}
            onChange={(e) => field.onChange(parseInt(e.target.value))}
          />
        )}
      />

      <TagsInput
        label="Sizes"
        data={[]}
        value={sizes}
        disabled={!_mainCategoryId || !_subCategoryId}
        onChange={handleChangeSizes}
      />
      {sizes.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          {skuItems.map((item, index) => (
            <div key={index}>
              <p className="font-semibold">SKU:{item.sku}</p>
              <div className="flex gap-2 items-center justify-start w-full">
                <div>
                  <p className="text-white">.</p>
                  <p className="font-semibold min-w-[4rem]">
                    Size: {item.size}
                  </p>
                </div>
                <TextInput
                  withAsterisk
                  label="Price"
                  type="text"
                  placeholder="Enter price"
                  classNames={{ root: "grow" }}
                  onChange={(e) =>
                    handleSkuChanges("price", e.target.value, index)
                  }
                />
                <TextInput
                  withAsterisk
                  label="Quantity"
                  type="text"
                  placeholder="Enter quantity"
                  classNames={{ root: "grow" }}
                  onChange={(e) =>
                    handleSkuChanges("qty", e.target.value, index)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default AttributeSection;
