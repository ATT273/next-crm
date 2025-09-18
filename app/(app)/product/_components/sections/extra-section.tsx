"use client";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { Button, Skeleton } from "@heroui/react";
import { pinata } from "@/utils/pinata-config";
// import { getPresignedUrl } from "../../actions";

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
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState<string>("");

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

  const getPresignedUrl = async (files: File[]) => {
    try {
      const res = await fetch("/api/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          files: files.map((f) => ({ name: f.name })),
        }),
      });
      return await res.json();
    } catch (error) {
      console.log("error presigned", error);
      return null;
    }
  };

  const uploadFile = async () => {
    try {
      if (!files.length) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const { urls } = await getPresignedUrl(files.map((file) => file.file));
      const uploadPromises = await Promise.all(
        files.map(async (file, index) => {
          return await uploadSingleFile(file.file, urls[index]);
        })
      );
      console.log("uploadPromises", uploadPromises);
      const imagesMapper = files.map((file, index) => ({
        file: file.file.name,
        baseUrl: uploadPromises[index] ? uploadPromises[index] : "",
      }));
      setUploading(false);
    } catch (e) {
      console.log("Trouble uploading file", e);
      setUploading(false);
    }
  };

  const uploadSingleFile = async (file: File, getPresignedUrl: string) => {
    try {
      const upload = await pinata.upload.public.file(file).url(getPresignedUrl);
      const fileUrl = await pinata.gateways.public.convert(upload.cid);
      return fileUrl; // Upload the file with the signed URL
    } catch (e) {
      console.log("abc", e);
    }
  };
  useEffect(() => {
    updateImages(files);
  }, [files]);
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
            // console.log(e.target.files);
            handleSelectFile(e.target.files ? Array.from(e.target.files) : []);
          }}
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
            <Skeleton className="rounded-lg overflow-hidden">
              <div className="h-24 w-24 rounded-lg bg-default-300" />
            </Skeleton>
          )}
          {url && <img src={url} alt="Image from Pinata" />}
          <Button type="button" onPress={uploadFile}>
            {uploading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExtraSection;
