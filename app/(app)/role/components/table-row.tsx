import React, { useEffect, useState } from "react";
import { TableRow, TableCell } from "@heroui/table";
import { RoleType } from "@/types/role.type";
import { z } from "zod";
import { updateRole } from "../actions";
import useToast from "../../_hooks/use-toast";
import { Input } from "@heroui/input";
import { Button, Switch } from "@heroui/react";
import Check from "@/components/icons/check";
import XMark from "@/components/icons/xmark";
import Trash from "@/components/icons/trash";
import EditIcon from "@/components/icons/edit";
import { ShieldUser } from "lucide-react";
import AssignRoleDialog from "./assign-role-dialog";

const user = {
  name: "John Doe",
  role: "ADM",
};

const formInfoSchema = z.object({
  name: z.string().min(6, {
    message: "Name must be at least 6 characters",
  }),
  description: z.string().optional(),
  permissions: z.object({}).optional(),
});

const initialValues: RoleType = {
  name: "",
  description: "",
  code: "",
  active: true,
  permissions: { dashboard: 0 },
};

const ACTION_BUTTON_STYLE = "bg-transparent text-emerald-600 hover:bg-emerald-500 hover:text-white";
const DELETE_BUTTON_STYLE = "bg-transparent text-red-600 hover:bg-red-500 hover:text-white";

const RoleTableRow = ({ item }: { item: any }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRole, setSelectedRole] = useState(initialValues);
  const { toast } = useToast();

  useEffect(() => {
    if (user.role === "ADM") {
      setIsAdmin(true);
    }
  }, []);

  const handleSubmit = async () => {
    const validation = formInfoSchema.safeParse(selectedRole);
    if (!validation.success) {
      const error = JSON.parse(validation.error.message)[0];
      toast.error({
        title: "Fail",
        message: error.message,
      });
      return;
    }

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
    } else {
      toast.error({
        title: "Error",
        message: "Role updated failed",
      });
    }
  };

  return (
    <>
      <TableRow key={item.id}>
        <TableCell className="w-[12rem] text-left ">
          {!isEditing ? (
            item.name
          ) : (
            <Input
              isRequired
              type="text"
              placeholder="Enter role name"
              className="w-full"
              value={selectedRole.name}
              onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
            />
          )}
        </TableCell>
        <TableCell className="w-[10rem] text-left ">{item.code}</TableCell>
        <TableCell className="w-[10rem] text-left ">
          {!isEditing ? (
            <Switch isSelected={item.active} isDisabled={true} />
          ) : (
            <Switch
              isSelected={selectedRole.active}
              onValueChange={(value) => {
                setSelectedRole({ ...selectedRole, active: value });
              }}
            />
          )}
        </TableCell>
        <TableCell className="grow text-left">
          {!isEditing ? (
            item.description
          ) : (
            <Input
              isRequired
              type="text"
              placeholder="Enter role description"
              className="w-full"
              value={selectedRole.description}
              onChange={(e) => {
                setSelectedRole({ ...selectedRole, description: e.target.value });
              }}
            />
          )}
        </TableCell>
        <TableCell className="w-[5rem] text-center">
          <Button isIconOnly onPress={() => setShowMore(!showMore)} className={ACTION_BUTTON_STYLE}>
            <ShieldUser className="size-6" />
          </Button>
          <div> {AssignRoleDialog({ item: item, open: showMore, onOpenChange: setShowMore })}</div>
        </TableCell>
        <TableCell className="w-[8rem] text-center">
          {!isEditing ? (
            <Button
              isIconOnly
              onPress={() => {
                setSelectedRole({ ...item });
                setIsEditing(!isEditing);
              }}
              className={`
                ${ACTION_BUTTON_STYLE}
                ${!isAdmin && item.code === "ADM" ? "text-gray-300 cursor-default" : ""}`}
              disabled={!isAdmin && item.code === "ADM"}
            >
              <EditIcon className={`size-6 `} />
            </Button>
          ) : (
            <div className="flex gap-2 justify-center items-center">
              <Button
                isIconOnly
                onPress={() => {
                  handleSubmit();
                  setIsEditing(!isEditing);
                }}
                className={ACTION_BUTTON_STYLE}
              >
                <Check className="size-6" />
              </Button>
              <Button
                isIconOnly
                onPress={() => {
                  setSelectedRole(initialValues);
                  setIsEditing(!isEditing);
                }}
                className={ACTION_BUTTON_STYLE}
              >
                <XMark className="size-6" />
              </Button>
            </div>
          )}
        </TableCell>
        <TableCell className="w-[5rem] text-center">
          <Button isIconOnly onPress={() => setShowMore(!showMore)} className={DELETE_BUTTON_STYLE}>
            <Trash className="size-6" />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RoleTableRow;
