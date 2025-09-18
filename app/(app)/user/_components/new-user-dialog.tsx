"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import NewUserForm from "./new-user-form";
import { IFormUser } from "@/types/user.type";
import { createUser } from "../actions";
import useToast from "../../_hooks/use-toast";

export const NewUser = () => {
  const [opened, setOpened] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: IFormUser) => {
    const result = await createUser(data);
    if (result.status === 201) {
      toast.success({
        title: "Success",
        message: "User has been created successfully",
      });
      setOpened(false);
    } else {
      toast.error({
        title: "Fail",
        message: `Failed to create user: ${result.message}`,
      });
    }
  };

  return (
    <div className="w-full flex justify-end">
      <Modal isOpen={opened} onOpenChange={() => setOpened(false)} size="xl" className="pt-2 relative">
        <ModalContent>
          <NewUserForm setOpen={setOpened} handleSubmit={handleSubmit} />
        </ModalContent>
      </Modal>
      <Button onPress={() => setOpened(true)}>Add new user</Button>
    </div>
  );
};

export default NewUser;
