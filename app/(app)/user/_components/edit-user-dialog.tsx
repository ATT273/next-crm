import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import NewUserForm from "./new-user-form";
import { useUserContext } from "../_context/user-provider";
import useToast from "../../_hooks/use-toast";
import { IFormUser } from "@/types/user.type";
import { updateUser } from "../actions";

interface EditUserDialogProps {
  opened: boolean;
  setOpened: (open: boolean) => void;
}
const EditUserDialog = ({ opened, setOpened }: EditUserDialogProps) => {
  const { editingUser } = useUserContext();
  const { toast } = useToast();

  const handleSubmit = async (data: IFormUser) => {
    const result = await updateUser(editingUser?.id!, data);

    if (result.status === 200) {
      toast.success({
        title: "Success",
        message: "User has been updated successfully",
      });
      setOpened(false);
    } else {
      toast.error({
        title: "Fail",
        message: `Failed to update user: ${result.message}`,
      });
    }
  };

  return (
    <Modal isOpen={opened} onOpenChange={() => setOpened(false)} size="xl" className="pt-2 relative">
      <ModalContent>
        <NewUserForm setOpen={setOpened} initialData={editingUser} handleSubmit={handleSubmit} />
      </ModalContent>
    </Modal>
  );
};

export default EditUserDialog;
