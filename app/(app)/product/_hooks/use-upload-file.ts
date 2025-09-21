import { useState } from "react";
import { pinata } from "@/utils/pinata-config";
import { getPresignedUrl } from "../actions";
import useToast from "../../_hooks/use-toast";
import { ClientImage } from "@/types/product.type";

export const useUploadFiles = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadFiles = async (files: ClientImage[]) => {
    try {
      if (!files.length) {
        console.log("No file selected");
        return;
      }

      setUploading(true);
      const { urls } = await getPresignedUrl(files.map((file) => file.file!));
      const uploadPromises = await Promise.all(
        files.map(async (file, index) => {
          return await uploadSingleFile(file.file!, urls[index]);
        })
      );

      const imagesMapper = files.map((file, index) => ({
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
      console.log("Trouble uploading file", e);
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
