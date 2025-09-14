"use client";
import { IUserResponse } from "@/types/user.type";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { useUserContext } from "../_context/user-provider";
import { Button } from "@heroui/button";
import { PenBox, Trash2 } from "lucide-react";
import { deleteUser } from "../actions";
import useToast from "@/app/(app)/_hooks/use-toast";
import NewUser from "./new-user-dialog";
import EditUserDialog from "./edit-user-dialog";
import { useState } from "react";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "dob",
    label: "DOB",
  },
  {
    key: "email",
    label: "EMAIL",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "action",
    label: "",
  },
];

const UserTable = ({ data }: { data: IUserResponse[] | null }) => {
  const { roles, editingUser, setEditingUser } = useUserContext();
  const { toast } = useToast();
  const [opened, setOpened] = useState(false);

  const handleEdit = (item: IUserResponse) => {
    setEditingUser(item);
    setOpened(true);
  };
  const handleDelete = async (id: string) => {
    const result = await deleteUser(id);
    if (result.status === 200) {
      toast.success({
        title: "Success",
        message: "User deleted successfully",
      });
    } else {
      toast.error({
        title: "Failed",
        message: "Failed to delete user",
      });
    }
  };
  return (
    <>
      <Table aria-label="user table" className="table-fixed min-w-full">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>
              <div>{column.label}</div>
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item) => {
              const role = roles.find((role) => role.code === item.roleCode);
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.dob}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{role?.name}</TableCell>
                  <TableCell>
                    {item.active ? (
                      <div className="size-4 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="size-4 bg-gray-300 rounded-full"></div>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[50px]">
                    <Button
                      isIconOnly
                      startContent={<PenBox className="size-4" />}
                      onPress={() => handleEdit(item)}
                      className="text-emerald-500 bg-transparent hover:bg-emerald-500 hover:text-white"
                    />
                    <Button
                      isIconOnly
                      startContent={<Trash2 className="size-4" />}
                      onPress={() => handleDelete(item.id)}
                      className="text-red-500 bg-transparent hover:bg-red-500 hover:text-white"
                    />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <EditUserDialog opened={opened} setOpened={setOpened} />
      {/* <Pagination
        total={10}
        initialPage={1} /> */}
    </>
  );
};

export default UserTable;
