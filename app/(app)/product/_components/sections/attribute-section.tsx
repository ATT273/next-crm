"use client";
import { IProductSku } from "@/types/product.type";
import { Input } from "@heroui/input";
import { useEffect, useMemo, useState } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { mainCategory, subCategory } from "@/constants";
import { formatCurrency } from "@/utils/common.util";
import { useProductStore } from "../../_store/product-store";
import { Plus, X } from "lucide-react";
import { Button } from "@heroui/button";
import NewSkuDialog from "../modals/new-sku-dialog";
import { updateProductSku } from "../../actions";
import useToast from "../../../_hooks/use-toast";

interface Props {
  updateSkuItems: (value: IProductSku[]) => void;
}
const AttributeSection = ({ updateSkuItems }: Props) => {
  const { control, getValues, setValue } = useFormContext();
  const { toast } = useToast();
  const [skuItems, setSKUItems] = useState<IProductSku[]>([]);
  const _mainCategoryId = useWatch({ name: "mainCategory" });
  const _subCategoryId = useWatch({ name: "subCategory" });
  const _sizes = useWatch({ name: "sizes" });
  const { productDetails } = useProductStore();
  const [sizeInput, setSizeInput] = useState<string>("");

  const [openSkuDialog, setOpenSkuDialog] = useState<boolean>(false);

  const mainCode = useMemo(() => mainCategory.find((item) => item.value === _mainCategoryId)?.code, [_mainCategoryId]);
  const subCode = useMemo(() => subCategory.find((item) => item.value === _subCategoryId)?.code, [_subCategoryId]);
  const enableNewVariant = useMemo(() => {
    return !!_mainCategoryId && !!_subCategoryId;
  }, [_mainCategoryId, _subCategoryId]);

  const handleAddNewSku = (data: IProductSku) => {
    setOpenSkuDialog(false);
    setSKUItems((prev) => [...prev, data]);
  };
  useEffect(() => {
    updateSkuItems(skuItems);
  }, [skuItems]);

  useEffect(() => {
    if (productDetails.skus) {
      setSKUItems(productDetails.skus);
    }
  }, [productDetails]);

  const handleSkuChanges = (type: string, value: string, index: number) => {
    const _skuItems = skuItems.map((item, i) => (i === index ? { ...item, [type]: Number(value) } : item));
    setSKUItems(_skuItems);
  };

  const handleRemoveTag = (index: number) => {
    const newSizes = [..._sizes];
    const updatedSizes = newSizes.filter((_, i) => i !== index);
    setValue("sizes", updatedSizes);
  };

  const handleRemoveSku = (index: number) => {
    const newSkuItems = skuItems.filter((_, i) => i !== index);
    setSKUItems(newSkuItems);
  };

  const handleSave = async () => {
    if (skuItems.length > 0) {
      const skuResult = await updateProductSku(productDetails._id, skuItems);
      if (skuResult.status === 200) {
        toast.success({
          title: "Success",
          message: "SKU created successfully",
        });
      } else {
        toast.error({
          title: "Fail",
          message: `Failed to create SKU: ${skuResult.message}`,
        });
      }
    }
  };
  return (
    <div className="w-full p-2 rounded-md shadow-sm">
      <div className="mb-2">
        <h3 className="text-lg font-semibold">Attribute</h3>
      </div>
      <div className="flex flex-col gap-3">
        <Controller
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
        />
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
        <fieldset className="w-full flex justify-end py-2 border-2 border-gray-300 rounded-md">
          <legend className="flex gap-2 items-center px-2 ml-2">
            Add variant
            <Button
              variant="flat"
              className="bg-emerald-300 h-8 w-8 min-w-1"
              onPress={() => {
                setOpenSkuDialog(true);
              }}
              disabled={!enableNewVariant}
              isIconOnly
            >
              <Plus className="size-3" />
            </Button>
          </legend>
          {_sizes.length > 0 && (
            <div className="w-full flex flex-col gap-2 px-2">
              {skuItems.map((item, index) => (
                <div key={index}>
                  <p className="font-semibold">SKU:{item.sku}</p>
                  <div className="flex gap-2 items-center justify-start w-full">
                    <Input
                      isRequired
                      label="Price"
                      type="text"
                      placeholder="Enter price"
                      className="grow"
                      size="sm"
                      value={formatCurrency(item.price)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        handleSkuChanges("price", isNaN(Number(value)) ? "0" : value, index);
                      }}
                    />
                    <Input
                      isRequired
                      label="Quantity"
                      type="text"
                      placeholder="Enter quantity"
                      className="grow"
                      size="sm"
                      value={formatCurrency(item.qty)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        handleSkuChanges("qty", isNaN(Number(value)) ? "0" : value, index);
                      }}
                    />
                    <Button
                      variant="light"
                      className="grid place-items-center hover:text-red-500 text-gray-500 data-[hover=true]:bg-transparent"
                      onPress={() => handleRemoveSku(index)}
                      isIconOnly
                    >
                      <X className="size-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </fieldset>
        {skuItems.length > 0 && productDetails._id && (
          <Button
            variant="light"
            className="grid place-items-center text-white bg-emerald-500 data-[hover=true]:bg-emerald-600"
            onPress={handleSave}
            disabled={!productDetails._id}
          >
            Save
          </Button>
        )}
      </div>
      <NewSkuDialog
        open={openSkuDialog}
        setOpen={setOpenSkuDialog}
        sizes={_sizes}
        variants={skuItems}
        mainCategoryCode={mainCode}
        subCategoryCode={subCode}
        handleSubmit={handleAddNewSku}
      />
    </div>
  );
};

export default AttributeSection;
