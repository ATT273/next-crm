
'use client'
import React, { use, useEffect } from 'react'
import { Table } from '@mantine/core';

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "quantity",
    label: "Quantity",
  },
  {
    key: "main_category",
    label: "Main Category",
  },
  {
    key: "sub_category",
    label: "SUb Category",
  },
  {
    key: "unit",
    label: "Unit",
  },
  {
    key: "description",
    label: "Description",
  },
];

const ProductTable = ({ products }: { products: any }) => {
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
            products && products.map((item) => (
              <Table.Tr key={item._id}>
                <Table.Td>{item.name}</Table.Td>
                <Table.Td>{item.price}</Table.Td>
                <Table.Td>{item.qty}</Table.Td>
                <Table.Td>{item.main_category}</Table.Td>
                <Table.Td>{item.sub_category}</Table.Td>
                <Table.Td>{item.unit}</Table.Td>
                <Table.Td>{item.description}</Table.Td>
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

export default ProductTable