import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button, Checkbox } from "@heroui/react";
import { useEffect, useState } from "react";
import { RoleType } from "@/types/role.type";
import { MENU, permissionsValue } from "@/constants";
import { updateRole } from "@/app/(app)/role/actions";
import useToast from "../../_hooks/use-toast";

const AssignRoleDialog = ({
  item,
  open,
  onOpenChange,
}: {
  item: RoleType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>(item);
  const { toast } = useToast();
  const handleAssignPermission = (menu: string, value: number, isChecked: boolean) => {
    const permissions = selectedRole.permissions;
    if (isChecked) {
      permissions[menu] |= value;
    } else {
      permissions[menu] &= ~value;
    }

    setSelectedRole({ ...selectedRole, permissions });
  };

  const onSubmit = async () => {
    const data = {
      ...selectedRole,
      permissions: JSON.stringify(selectedRole.permissions),
      id: item.id,
    };

    const res = await updateRole(data);
    if (res.status === 200) {
      toast.success({
        title: "Success",
        message: "Role updated successfully",
      });
      onOpenChange(false);
    } else {
      toast.error({
        title: "Error",
        message: "Role updated failed",
      });
    }
  };

  useEffect(() => {
    setSelectedRole(item);
  }, [item]);

  return (
    <Modal isOpen={open} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Roles: {item.name}</ModalHeader>
            <ModalBody>
              <div className="max-h-[300px] flex flex-col gap-2">
                {MENU.map((menu) => {
                  const permissions = selectedRole.permissions[menu.key] || 0;
                  return (
                    <div className="flex gap-2" key={menu.key}>
                      <h3 className="font-semibold text-md min-w-[6rem]">{menu.title}</h3>
                      <div className="flex gap-2 px-3">
                        {menu.permissions.map((permission) => {
                          const _permission = permissionsValue[permission as keyof typeof permissionsValue];
                          return (
                            <div key={permission}>
                              <Checkbox
                                isSelected={!!(permissions & _permission)}
                                onChange={(e) => handleAssignPermission(menu.key, _permission, e.currentTarget.checked)}
                              >
                                {permission}
                              </Checkbox>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-end"></div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Close
              </Button>
              <Button className="hover:bg-emerald-500 hover:text-white font-semibold" onPress={onSubmit}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AssignRoleDialog;
