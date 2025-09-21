"use client";
import { SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { permissionsValue } from "@/constants";
import { updateProduct } from "../../actions";
import { ClientImage, IProductForm, IProductSku } from "@/types/product.type";
import useToast from "../../../_hooks/use-toast";
import ProductForm from "./product-form";
import { useProductStore } from "../../_store/product-store";
import { Drawer, DrawerContent } from "@heroui/drawer";

const EditProduct = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  // const [opened, setOpened] = useState(false);
  const [permissions, setPermissions] = useState({
    access: false,
    edit: false,
    delete: false,
  });
  const { toast } = useToast();
  const { setSelectedId, selectedProductId } = useProductStore();
  const handleSubmit: SubmitHandler<IProductForm & { skuItems: IProductSku[]; files: ClientImage[] }> = async (
    values: IProductForm & { skuItems: IProductSku[]; files: ClientImage[] }
  ) => {
    const { skuItems, files, ...data } = values;
    const _data = {
      ...data,
      mainCategory: values.mainCategory,
      subCategory: values.subCategory,
      importPrice: values.importPrice,
      description: values.description ?? "",
      sizes: values.sizes ?? [],
    };

    const result = await updateProduct(selectedProductId, _data);
    if (result.status === 200) {
      toast.success({
        title: "Success",
        message: "Product created successfully",
      });
      setOpen(false);
    } else {
      toast.error({
        title: "Fail",
        message: `Failed to create SKU: ${result.message}`,
      });
    }
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const user = JSON.parse(localUser);
      const _permissions = {
        access: !!(user.permissions & permissionsValue.ACCESS),
        edit: !!(user.permissions & permissionsValue.EDIT),
        delete: !!(user.permissions & permissionsValue.DELETE),
      };
      setPermissions(_permissions);
    }
  }, []);

  return (
    <div>
      <Drawer isOpen={open} onOpenChange={setOpen} size="xl">
        <DrawerContent className="">
          {(onClose) => <ProductForm closeDrawer={setOpen} handleSubmit={handleSubmit} />}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default EditProduct;
