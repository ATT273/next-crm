import { addToast } from "@heroui/toast";

interface Props {
  title: string;
  message: string;
  position?:
    | "top-center"
    | "top-right"
    | "top-left"
    | "bottom-center"
    | "bottom-right"
    | "bottom-left";
}
function useToast() {
  const toast = {
    success: ({ title, message }: Props) => {
      addToast({
        title,
        description: message,
        color: "success",
      });
    },
    error: ({ title, message }: Props) => {
      addToast({
        title,
        description: message,
        color: "danger",
      });
    },
  };
  return { toast };
}

export default useToast;
