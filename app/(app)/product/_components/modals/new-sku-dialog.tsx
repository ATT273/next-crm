import { IProductSku } from "@/types/product.type";
import { formatCurrency } from "@/utils/common.util";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { useEffect, useMemo, useState } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  sizes: string[];
  variants: IProductSku[];
  mainCategoryCode?: string;
  subCategoryCode?: string;
  handleSubmit: (data: IProductSku) => void;
}

const initialValue = {
  sku: "",
  size: "",
  qty: 0,
  price: 0,
};
const NewSkuDialog = ({
  open,
  setOpen,
  sizes,
  variants,
  mainCategoryCode,
  subCategoryCode,
  handleSubmit,
}: Props) => {
  const [newSku, setNewSku] = useState<IProductSku>(initialValue);
  const [isValid, setIsValid] = useState<{
    size: boolean;
    qty: boolean;
    price: boolean;
  }>({
    size: true,
    qty: true,
    price: true,
  });
  const selectedSizes = useMemo(() => {
    return variants.map((item) => item.sku.split(".")[2]);
  }, [variants]);

  useEffect(() => {
    if (mainCategoryCode && subCategoryCode) {
      setNewSku({
        ...newSku,
        sku: `${mainCategoryCode}.${subCategoryCode}.${newSku.size}`,
      });
    }
  }, [mainCategoryCode, subCategoryCode, newSku.size]);

  const validateForm = () => {
    setIsValid({
      size: newSku.size !== "",
      qty: newSku.qty > 0,
      price: newSku.price > 0,
    });
  };
  const onSubmit = () => {
    validateForm();
    if (newSku.size === "" || newSku.price === 0 || newSku.qty === 0) return;
    setNewSku(initialValue);
    handleSubmit(newSku);
  };

  useEffect(() => {
    if (
      initialValue.size !== newSku.size &&
      initialValue.price !== newSku.price &&
      initialValue.qty !== newSku.qty
    ) {
      validateForm();
    }
  }, [newSku]);
  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <p className="text-lg">Create new variant</p>
              <p className="text-sm text-gray-500">SKU: {newSku.sku}</p>
            </ModalHeader>
            <ModalBody>
              <Select
                isRequired
                className="w-full"
                label="Size"
                size="sm"
                placeholder="Select size"
                disabledKeys={selectedSizes}
                selectedKeys={newSku.size ? [newSku.size] : []}
                errorMessage={
                  newSku.size === "" ? "Size is required" : undefined
                }
                isInvalid={!isValid.size}
                onChange={(value) => {
                  setNewSku({ ...newSku, size: value.target.value });
                }}
              >
                {sizes.map((item) => (
                  <SelectItem aria-disabled="true" key={item}>
                    {item}
                  </SelectItem>
                ))}
              </Select>
              <Input
                isRequired
                label="Sell price"
                type="text"
                placeholder="Enter product sell price"
                className="w-full"
                size="sm"
                errorMessage={
                  newSku.price === 0
                    ? "Price must be greater than 0"
                    : undefined
                }
                isInvalid={!isValid.price}
                value={formatCurrency(newSku.price)}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setNewSku({
                    ...newSku,
                    price: isNaN(Number(value)) ? 0 : Number(value),
                  });
                }}
              />
              <Input
                isRequired
                label="Quantity"
                type="text"
                placeholder="Enter product quantity"
                className="w-full"
                size="sm"
                errorMessage={
                  newSku.qty === 0
                    ? "Quantity must be greater than 0"
                    : undefined
                }
                isInvalid={!isValid.qty}
                value={formatCurrency(newSku.qty)}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setNewSku({
                    ...newSku,
                    qty: isNaN(Number(value)) ? 0 : Number(value),
                  });
                }}
              />
            </ModalBody>
            <ModalFooter>
              <div className="flex gap-2 w-full justify-end">
                <Button
                  onPress={() => {
                    setNewSku(initialValue);
                    setOpen(false);
                  }}
                  className="grid place-items-center size-8 p-0 text-slate-900"
                >
                  Cancel
                </Button>
                <Button
                  onPress={onSubmit}
                  className="grid place-items-center size-8 bg-emerald-500 text-white"
                >
                  Save
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewSkuDialog;
