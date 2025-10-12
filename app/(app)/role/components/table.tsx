"use client";
import RoleTableRow from "./table-row";
import { RoleType } from "@/types/role.type";
import { Table, TableHeader, TableBody, TableColumn } from "@heroui/table";

const columns = [
  {
    key: "name",
    label: "NAME",
    class: "w-[12rem] text-left",
  },
  {
    key: "code",
    label: "CODE",
    class: "w-[10rem] text-left",
  },
  {
    key: "active",
    label: "Active",
    class: "w-[10rem] text-left",
  },
  {
    key: "description",
    label: "DESCRIPTION",
    class: "grow text-left",
  },
  {
    key: "role",
    label: "Assign Roles",
    class: "w-[5rem] text-center",
  },
  {
    key: "actions",
    label: "Actions",
    class: "w-[8rem] text-center",
  },
  {
    key: "delete",
    label: "Delete",
    class: "w-[5rem] text-center",
  },
];
const RoleTable = ({ roles }: { roles: RoleType[] }) => {
  return (
    <>
      <Table aria-label="Role list" className="p-2">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key} className={column.class}>
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent="No data">
          {roles && roles.length > 0 ? roles.map((item) => RoleTableRow({ item })) : []}
        </TableBody>
      </Table>
      {/* <Pagination
        total={10}
        initialPage={1} /> */}
    </>
  );
};

export default RoleTable;
