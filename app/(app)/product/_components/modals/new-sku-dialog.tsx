import { IProductImage, IProductSku } from "@/types/product.type";
import { formatCurrency } from "@/utils/common.util";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { useEffect, useMemo, useState } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import NewSkuForm from "../forms/new-sku-form";
import { ImagePlus, X } from "lucide-react";
import { useProductStore } from "../../_store/product-store";
import Image from "next/image";
import { updateProductSku } from "../../actions";
import useToast from "@/app/(app)/_hooks/use-toast";

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
  const [showImages, setShowImages] = useState<boolean>(false);
  const [productImages, setProductImages] = useState<IProductImage[]>([]);
  const { toast } = useToast();

  const onSubmit = (data: IProductSku) => {
    setSKUItems((prev) => [...prev, data]);
  };

  useEffect(() => {
    if (productDetails && productDetails.skus) setSKUItems(productDetails.skus);
    if (productDetails && productDetails.images) setProductImages(productDetails.images);
  }, [productDetails]);

  const handleRemoveSku = (index: number) => {
    const newSkuItems = skuItems.filter((_, i) => i !== index);
    setSKUItems(newSkuItems);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedId("");
      setProductDetails({} as any);
      setSKUItems([]);
    }
  };

  const handleSelectImage = (skuIndex: number, image: IProductImage) => {
    const newSkus = [...skuItems].map((item: IProductSku, index: number) => {
      if (index === skuIndex) {
        const toAdd = !item.images.some((img) => img.id === image.id);
        const _images = toAdd ? [...item.images, image] : item.images.filter((img) => img.id !== image.id);
        item.images = _images;
      }
      return item;
    });
    setSKUItems(newSkus);
  };

  const handleSubmit = async () => {
    const result = await updateProductSku(selectedProductId, skuItems);
    if (result.status === 200) {
      toast.success({
        title: "Success",
        message: "Product variants updated successfully",
      });
      setOpen(false);
      setSelectedId("");
      setProductDetails({} as any);
      setSKUItems([]);
    } else {
      toast.error({
        title: "Fail",
        message: `Failed to update product variants: ${result.message}`,
      });
    }
  };

  return (
    <Modal isOpen={open} onOpenChange={onOpenChange} size="xl" isDismissable={false}>
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
                          title="link images"
                          variant="light"
                          className="grid place-items-center hover:text-green-500 text-gray-500 data-[hover=true]:bg-transparent"
                          onPress={() => setShowImages(true)}
                          isIconOnly
                        >
                          <ImagePlus className="size-4" />
                        </Button>
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
                    {showImages && (
                      <div className="flex gap-2 flex-wrap">
                        {productImages.map((image, idx) => {
                          const isSelected = item.images?.some((img) => img.id === image.id);
                          return (
                            <div
                              key={idx}
                              className={`
                                relative w-[100px] h-[100px]  rounded-lg overflow-hidden border border-slate-200
                                ${isSelected ? "ring-2 ring-green-500" : "cursor-pointer hover:opacity-80"}
                              `}
                              onClick={() => handleSelectImage(index, image)}
                            >
                              <Image
                                key={index}
                                alt={image.name || "product image"}
                                src={image.url}
                                width={300}
                                height={300}
                                className="object-cover w-[100px] h-[100px]"
                              />
                              {/* <div className="absolute top-1 right-1 cursor-pointer">
                                              <X className="bg-white rounded-full" onClick={() => setFiles(files.filter((_, i) => i !== index))} />
                                            </div> */}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={() => setOpen(false)}>
                Cancel
              </Button>
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
