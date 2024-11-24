'use client'
import { Table } from '@mantine/core';
import RoleTableRow from './table-row';
import { RoleType } from '@/types/role.type';

const columns = [
  {
    key: "name",
    label: "NAME",
    class: 'w-[12rem] text-center'
  },
  {
    key: "code",
    label: "CODE",
    class: 'w-[10rem] text-center'
  },
  {
    key: "active",
    label: "Active",
    class: 'w-[10rem] text-center'
  },
  {
    key: "description",
    label: "DESCRIPTION",
    class: 'grow text-center'
  },
  {
    key: "show",
    label: "Show",
    class: 'w-[8rem] text-center'
  },
  {
    key: "actions",
    label: "Actions",
    class: 'w-[8rem] text-center'
  },
  {
    key: "delete",
    label: "Delete",
    class: 'w-[8rem] text-center'
  }
];
const RoleTable = ({ roles }: { roles: RoleType[] }) => {

  return (
    <>
      <Table
        classNames={{
          thead: 'bg-gray-100 font-semibold text-black',
        }}>
        <Table.Thead>
          <Table.Tr className='flex'>
            {
              columns.map((column) => (
                <Table.Td key={column.key} className={column.class} classNames={{
                  td: `bg-emerald-100 ${column.class}`,

                }}>
                  {column.label}
                </Table.Td>
              ))
            }
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            roles && roles.length > 0 && roles.map((item) => (
              <RoleTableRow item={item} key={item.code} />
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