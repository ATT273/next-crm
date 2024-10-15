'use client'
import { Table } from '@mantine/core';

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];
const UserTable = () => {
  return (
    <>
      <Table
        classNames={{
          thead: 'bg-gray-100 font-semibold text-black',
        }}>
        <Table.Thead>
          <Table.Tr>
            {
              columns.map((column) => (
                <Table.Td key={column.key}>{column.label}</Table.Td>
              ))
            }
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            rows.map((item) => (
              <Table.Tr key={item.key}>
                <Table.Td>{item.name}</Table.Td>
                <Table.Td>{item.role}</Table.Td>
                <Table.Td>{item.status}</Table.Td>
              </Table.Tr>
            ))
          }
        </Table.Tbody>
      </Table >
      {/* <Pagination
        total={10}
        initialPage={1} /> */}
    </>
  )
}

export default UserTable