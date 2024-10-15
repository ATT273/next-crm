'use client'
import React, { use, useEffect } from 'react'
import { Table } from '@mantine/core';
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
                <Table.Td>{item.sales}</Table.Td>
                <Table.Td>{item.income}</Table.Td>
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

export default DashboardTable