"use client";
import { Drawer, Button } from "@mantine/core";
// import { useForm, zodResolver } from '@mantine/form';
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { permissionsValue } from "@/constants";
import { createProduct, createProductSku } from "../actions";
import { IProductSku } from "@/types/product.type";
import BasicSection from "./sections/basic-section";
import PricingSection from "./sections/pricing-section";
import AttributeSection from "./sections/attribute-section";
import ExtraSection from "./sections/extra-section";
import useToast from "../../_hooks/use-toast";

type ClientImage = {
  file: File;
  url: string;
};

interface IProductForm {
  name: string;
  mainCategory: string;
  subCategory: string;
  unit: string;
  price: number;
  impPrice: number;
  qty: number;
  sizes?: string[];
  tags?: string[];
  description?: string;
}
const formInfoSchema = z.object({
  name: z.string().min(6, {
    message: "Name must be at least 6 characters",
  }),
  mainCategory: z.string().min(1, {
    message: "please select main category",
  }),
  subCategory: z.string().min(1, {
    message: "Please select sub category",
  }),
  unit: z.string().min(1, {
    message: "Unit is required",
  }),
  price: z.number().min(1, { message: "Price is required" }),
  impPrice: z.number().min(1, { message: "Import price is required" }),
  qty: z.number().min(1, { message: "Quantity is required" }),
  sizes: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
});

const NewProduct = () => {
  const [opened, setOpened] = useState(false);
  const [permissions, setPermissions] = useState({
    access: false,
    edit: false,
    delete: false,
  });
  const [skuItems, setSKUItems] = useState<IProductSku[]>([]);
  const [files, setFiles] = useState<ClientImage[]>([]);
  const { toast } = useToast();
  const formInfo = useForm<z.infer<typeof formInfoSchema>>({
    resolver: zodResolver(formInfoSchema),
    defaultValues: {
      mainCategory: "",
      subCategory: "",
      name: "",
      unit: "",
      price: 0,
      impPrice: 0,
      qty: 0,
      sizes: [],
      description: "",
    },
    mode: "onSubmit",
  });

  const handleSubmit: SubmitHandler<IProductForm> = async (
    values: IProductForm
  ) => {
    const data = {
      ...values,
      main_category: parseInt(values.mainCategory),
      sub_category: parseInt(values.subCategory),
      imp_price: values.impPrice,
      description: values.description ?? "",
      sizes: values.sizes ?? [],
    };

    const result = await createProduct(data);
    if (result.status === 200) {
      const productId = result.data._id;
      const skuResult = await createProductSku(productId, skuItems);
      if (skuResult.status === 200) {
        toast.success({
          title: "Success",
          message: "SKU created successfully",
        });
      } else {
        toast.error({
          title: "Fail",
          message: `Failed to create SKU: ${result.message}`,
        });
      }
      toast.success({
        title: "Success",
        message: "Product created successfully",
      });
      setOpened(false);
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
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        size={"lg"}
        classNames={{
          root: "px-2 pt-2 relative",
        }}
        title={<p className="font-bold text-xl">Add New Product</p>}
      >
        <FormProvider {...formInfo}>
          <form
            key="productForm"
            onSubmit={formInfo.handleSubmit(handleSubmit)}
            className="flex flex-col gap-3 items-center h-[calc(100%-60px)] overflow-y-auto"
          >
            <BasicSection />
            <PricingSection />
            <AttributeSection updateSkuItems={setSKUItems} />
            <ExtraSection updateImages={setFiles} />
          </form>
          <footer className="sticky bottom-0 left-0 w-full flex justify-end gap-1 py-2 px-4 bg-white">
            <Button
              color="gray"
              variant="light"
              type="button"
              onClick={() => setOpened(false)}
            >
              Close
            </Button>
            <Button
              color="teal"
              onClick={() => handleSubmit(formInfo.getValues())}
            >
              Save
            </Button>
          </footer>
        </FormProvider>
      </Drawer>
      <Button onClick={() => setOpened(true)} disabled={!permissions.edit}>
        Add new product
      </Button>
    </div>
  );
};

export default NewProduct;
