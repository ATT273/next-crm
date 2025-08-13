import { notifications } from "@mantine/notifications";

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
    success: ({ title, message, position }: Props) => {
      notifications.show({
        title,
        message,
        color: "green",
        position: position ?? "top-center",
      });
    },
    error: ({ title, message, position }: Props) => {
      notifications.show({
        title,
        message,
        color: "red",
        position: position ?? "top-center",
      });
    },
  };
  return { toast };
}

export default useToast;
