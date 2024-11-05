'use client'
import ChevronDown from '@/components/icons/chevron-down';
import { Button, Table } from '@mantine/core';
import { useState } from 'react';

const rows = [
  {
    key: "1",
    name: "Super Admin",
    code: "SADM",
    status: "Active",
  },
  {
    key: "2",
    name: "Manager",
    code: "MNGR",
    status: "Paused",
  },
  {
    key: "3",
    name: "Staff",
    code: "STFF",
    status: "Active",
  },
  {
    key: "4",
    name: "Cashier",
    code: "CSHR",
    status: "Active",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
    class: 'w-[10rem]'
  },
  {
    key: "code",
    label: "CODE",
    class: 'w-[10rem]'
  },
  {
    key: "status",
    label: "STATUS",
    class: ''
  },
];
const RoleTable = () => {
  const [showMore, setShowMore] = useState(false)
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
                <Table.Td key={column.key} className={column.class} classNames={{
                  td: 'bg-red-100',

                }}>
                  {column.label}
                </Table.Td>
              ))
            }
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            rows.map((item) => (
              <Table.Tr key={item.key}>
                <Table.Td colSpan={3}>
                  <Table
                    classNames={{
                      thead: 'bg-gray-100 font-semibold text-black',
                    }}>
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Td className='w-[10rem]'>{item.name}</Table.Td>
                        <Table.Td className='w-[10rem]'>{item.code}</Table.Td>
                        <Table.Td className=''>{item.status}</Table.Td>
                        <Table.Td className='w-[10rem]'>
                          <Button
                            variant='transparent'
                            onClick={() => setShowMore(!showMore)}>
                            <ChevronDown className='size-6' />
                          </Button>
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr >

                        {showMore &&
                          <Table.Td colSpan={4}>
                            <div className='h-[300px]'>
                              <div>Dashboard: access:x, Edit: x</div>
                              <div>Products: access:x, Edit: x</div>
                              <div>Users: access:x, Edit: x</div>
                              <div>Roles: access:x, Edit: x</div>
                            </div>
                          </Table.Td>
                        }

                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                </Table.Td>
                {/* <Table.Td>{item.code}</Table.Td>
                <Table.Td>{item.status}</Table.Td> */}
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

export default RoleTable