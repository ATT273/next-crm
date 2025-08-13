"use client";
import { TagsInput, Skeleton, Card, FileInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";

type ClientImage = {
  file: File;
  url: string;
};

interface Props {
  updateImages: (value: ClientImage[]) => void;
}
const ExtraSection = ({ updateImages }: Props) => {
  const { setValue } = useFormContext();
  const [tags, setTags] = useState<string[]>([]);
  const [files, setFiles] = useState<ClientImage[]>([]);

  const handleChangeTags = (values: string[]) => {
    setTags(values);
    setValue("tags", values);
  };

  const handleSelectFile = (value: File[]) => {
    const file = value.map((item) => ({
      file: item,
      url: URL.createObjectURL(item),
    }));
    setFiles([...files, ...file]);
  };

  useEffect(() => {
    updateImages(files);
  }, [files]);
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
      <h3 className="text-lg font-semibold mb-3">Extra Information</h3>
      <TagsInput
        label="Tags"
        data={[]}
        value={tags}
        onChange={handleChangeTags}
      />
      <FileInput
        label="Product Image"
        multiple
        placeholder="upload product image"
        onChange={(value) => handleSelectFile(value)}
      />
      <div className="flex gap-2 flex-wrap p-2">
        {files.length > 0 ? (
          files.map((item, index) => (
            <Image
              key={index}
              alt={item.file.name}
              src={item.url}
              width={100}
              height={100}
              className="object-cover"
            />
          ))
        ) : (
          <Skeleton animate={false} height={100} width={100} radius={"md"} />
        )}
      </div>
    </Card>
  );
};

export default ExtraSection;
