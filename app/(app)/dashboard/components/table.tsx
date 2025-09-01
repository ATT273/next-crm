"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
const rows = [
  {
    key: "1",
    name: "IPhone 13",
    sales: "150",
    income: "156,000,000",
  },
  {
    key: "2",
    name: "IPhone 14",
    sales: "145",
    income: "189,000,000",
  },
  {
    key: "3",
    name: "IPhone 15",
    sales: "200",
    income: "346,000,000",
  },
  {
    key: "4",
    name: "IPhone 16",
    sales: "50",
    income: "156,000,000",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "sales",
    label: "SALES",
  },
  {
    key: "income",
    label: "INCOME",
  },
];

const DashboardTable = () => {
  return (
    <>
      <Table>
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {rows.map((item) => (
            <TableRow key={item.key}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.sales}</TableCell>
              <TableCell>{item.income}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Pagination
        total={10}
        initialPage={1} /> */}
    </>
  );
};

export default DashboardTable;
