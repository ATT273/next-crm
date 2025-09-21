import { IProductSku } from "@/types/product.type";
import { formatCurrency } from "@/utils/common.util";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { useEffect, useMemo, useState } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import NewSkuForm from "../forms/new-sku-form";
import { X } from "lucide-react";
import { useProductStore } from "../../_store/product-store";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const initialValue = {
  sku: "",
  size: "",
  qty: 0,
  price: 0,
};
const NewSkuDialog = ({ open, setOpen }: Props) => {
  const { setSelectedId, setProductDetails, selectedProductId, productDetails } = useProductStore();
  const [skuItems, setSKUItems] = useState<IProductSku[]>([]);

  const onSubmit = (data: IProductSku) => {
    setSKUItems((prev) => [...prev, data]);
  };

  useEffect(() => {
    if (productDetails && productDetails.skus) setSKUItems(productDetails.skus);
  }, [productDetails]);

  const handleRemoveSku = (index: number) => {
    const newSkuItems = skuItems.filter((_, i) => i !== index);
    setSKUItems(newSkuItems);
  };

  const handleSubmit = () => {};
  return (
    <Modal isOpen={open} onOpenChange={setOpen} size="xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <p className="text-lg">Create new variant</p>
            </ModalHeader>
            <ModalBody>
              <NewSkuForm open={open} setOpen={setOpen} handleSubmit={onSubmit} />
              <div>
                {skuItems.map((item, index) => (
                  <div key={item.sku} className="p-2 border border-gray-200 rounded-md mb-2">
                    <div className="flex gap-2 items-center justify-between w-full">
                      <p className="font-semibold">SKU: {item.sku}</p>
                      <div className="flex items-center gap-2">
                        <p>
                          Price: <span className="text-gray-500">{formatCurrency(item.price)} VND</span>
                        </p>
                        <p>
                          Quantity: <span className="text-gray-500">{formatCurrency(item.qty)}</span>
                        </p>
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
                  </div>
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button>Cancel</Button>
              <Button className="bg-emerald-500" onPress={handleSubmit}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewSkuDialog;
