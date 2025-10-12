"use client";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { Button, Skeleton } from "@heroui/react";
import { useProductStore } from "../../_store/product-store";
import { ClientImage } from "@/types/product.type";
import { X } from "lucide-react";

// import { getPresignedUrl } from "../../actions";

interface Props {
  updateImages: (value: ClientImage[]) => void;
}
const ExtraSection = ({ updateImages }: Props) => {
  const { setValue } = useFormContext();
  const [tags, setTags] = useState<string[]>([]);
  const [files, setFiles] = useState<ClientImage[]>([]);
  const { productDetails } = useProductStore();

  const handleChangeTags = (values: string[]) => {
    setTags(values);
    setValue("tags", values);
  };

  const handleSelectFile = (value: File[]) => {
    const file = value.map((item) => ({
      file: item,
      url: URL.createObjectURL(item),
      name: item.name,
    }));
    setFiles([...files, ...file]);
  };

  useEffect(() => {
    updateImages(files);
  }, [files]);

  useEffect(() => {
    if (productDetails && productDetails.images?.length > 0) {
      const _files = productDetails.images.map((item) => ({ url: item.url, name: item.name }));
      setFiles(_files);
    }
  }, [productDetails]);

  return (
    <div className="shadow-sm rounded-md w-full p-2">
      <div className="mb-2">
        <h3 className="text-lg font-semibold mb-3">Extra Information</h3>
      </div>
      <div className="flex flex-col gap-3">
        {/* <TagsInput
        label="Tags"
        data={[]}
        value={tags}
        onChange={handleChangeTags}
      /> */}
        <Input
          type="file"
          label="Product Image"
          multiple
          placeholder="upload product image"
          onChange={(e) => {
            handleSelectFile(e.target.files ? Array.from(e.target.files) : []);
          }}
        />
        <div className="flex gap-2 flex-wrap p-2">
          {files.length > 0 ? (
            files.map((item, index) => (
              <div
                key={index}
                className="relative w-[100px] h-[100px]  rounded-lg overflow-hidden border border-slate-200"
              >
                <Image
                  key={index}
                  alt={item.file?.name || "product image"}
                  src={item.url}
                  width={300}
                  height={300}
                  className="object-cover w-[100px] h-[100px]"
                />
                <div className="absolute top-1 right-1 cursor-pointer">
                  <X className="bg-white rounded-full" onClick={() => setFiles(files.filter((_, i) => i !== index))} />
                </div>
              </div>
            ))
          ) : (
            <Skeleton className="rounded-lg overflow-hidden">
              <div className="h-24 w-24 rounded-lg bg-default-300" />
            </Skeleton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtraSection;
