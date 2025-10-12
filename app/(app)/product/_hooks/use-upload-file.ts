import { useState } from "react";
import { pinata } from "@/utils/pinata-config";
// import { getPresignedUrl } from "../actions";
import useToast from "../../_hooks/use-toast";
import { ClientImage } from "@/types/product.type";

export const getPresignedUrl = async (files: File[]) => {
  try {
    const res = await fetch("api/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        files: files.map((f) => ({ name: f.name })),
      }),
    });

    const resJson = await res.json();
    return resJson;
  } catch (error) {
    return { urls: [] };
  }
};

export const useUploadFiles = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadFiles = async (files: ClientImage[]): Promise<{ name: string; url: string }[]> => {
    try {
      if (!files.length) {
        return [];
      }

      setUploading(true);
      const { urls } = await getPresignedUrl(files.map((file) => file.file!));
      const presignedUrls = urls && urls.length > 0 ? urls : [];

      if (presignedUrls.length === 0) return [];

      const uploadPromises = await Promise.all(
        files.map((file, index) => {
          return uploadSingleFile(file.file!, presignedUrls[index]);
        })
      );
      const imagesMapper = files.map((file, index) => ({
        id: index + 1,
        name: file.file!.name,
        url: uploadPromises[index] ? uploadPromises[index] : "",
      }));

      setUploading(false);
      toast.success({
        title: "Success",
        message: "Images uploaded successfully",
      });
      return imagesMapper;
    } catch (e) {
      setUploading(false);
      toast.error({
        title: "Error",
        message: "Failed to upload images",
      });
      return [];
    }
  };

  const uploadSingleFile = async (file: File, getPresignedUrl: string) => {
    try {
      const upload = await pinata.upload.public.file(file).url(getPresignedUrl);
      const fileUrl = await pinata.gateways.public.convert(upload.cid);
      return fileUrl; // Upload the file with the signed URL
    } catch (e) {
      console.log("error", e);
    }
  };

  return {
    uploading,
    uploadFiles,
  };
};
