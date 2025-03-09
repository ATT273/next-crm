
'use client'
import React from 'react'
import { Button, Table, Popover, UnstyledButton, Modal } from '@mantine/core';
import { ProductType } from '@/types/product.type';
import EditIcon from '@/components/icons/edit';
import Trash from '@/components/icons/trash';
import EditableRow from './editable-row';
import ThreeDots from '@/components/icons/three-dot';
import { mainCategory, subCategory } from '@/constants';
import { deleteProduct } from '../actions';
import { notifications } from '@mantine/notifications';
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
  {
    key: "edit",
    label: "Action",
  }
];

const initialItem = {
  _id: '',
  name: '',
  price: 0,
  qty: 0,
  main_category: 0,
  sub_category: 0,
  unit: "",
  description: '',
  imp_price: 0,
  sizes: []
}
export type InitialItemType = typeof initialItem
const ProductTable = ({ products }: { products: ProductType[] }) => {
  const [deletedProduct, setDeletedProduct] = React.useState<string>("");
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<ProductType>(initialItem);



  const handleDeleteProduct = async (id: string) => {
    const result = await deleteProduct(id)
    if (result.status === 200) {
      setOpenDeleteConfirm(false)
      notifications.show({
        title: 'Success',
        message: 'Product deleted successfully',
        color: 'green',
        position: 'top-right',
      })
    } else {
      notifications.show({
        title: 'Fail',
        message: `Failed to delete product: ${result.message}`,
        color: 'red',
        position: 'top-right',
      })
    }
  }
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
            products && products.map((item) =>

              <Table.Tr key={item._id}>
                {!(item._id === selectedProduct?._id)
                  ? <><Table.Td>{item.name}</Table.Td>
                    <Table.Td>{item.price}</Table.Td>
                    <Table.Td>{item.qty}</Table.Td>
                    <Table.Td>{mainCategory.find(c => c.value === item.main_category.toString())?.label}</Table.Td>
                    <Table.Td>{subCategory.find(sc => sc.value === item.sub_category.toString())?.label}</Table.Td>
                    <Table.Td>{item.unit}</Table.Td>
                    <Table.Td>{item.description}</Table.Td>
                    <Table.Td>
                      <Popover width={150} position="bottom" shadow="md">
                        <Popover.Target>
                          <Button
                            variant='transparent'>
                            <ThreeDots className='text-slate-900 size-4' />
                          </Button>
                        </Popover.Target>
                        <Popover.Dropdown
                          className='rounded-md'>
                          <ul>
                            <li>
                              <Button
                                onClick={() => setSelectedProduct(item)}
                                variant='transparent'>
                                <EditIcon className='text-teal-500 size-4' /><p className='text-slate-900 ml-2'>Edit</p>
                              </Button>
                            </li>
                            <li>
                              <Button
                                onClick={() => {
                                  setOpenDeleteConfirm(true)
                                  setDeletedProduct(item._id)
                                }}
                                variant='transparent'>
                                <Trash className='text-red-500 size-4' /> <p className='text-slate-900 ml-2'>Delete</p>
                              </Button>
                            </li>
                          </ul>
                        </Popover.Dropdown>
                      </Popover>
                    </Table.Td>
                  </>
                  : <EditableRow key={item._id} item={item} changeEditMode={() => setSelectedProduct(initialItem)} />
                }
              </Table.Tr>
            )
          }

        </Table.Tbody>
      </Table >
      <Modal opened={openDeleteConfirm} onClose={() => setOpenDeleteConfirm(false)} title="Confirm delete" centered>
        <p className='text-slate-900 mb-2'> Are you sure you want to delete this product?</p>
        <div className='flex gap-2 w-full justify-end'>
          <Button
            onClick={() => setOpenDeleteConfirm(false)}
            variant='default'
            className='grid place-items-center size-8 p-0 text-slate-900'>
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteProduct(deletedProduct)}
            variant='filled'
            color='red'
            className='grid place-items-center size-8 text-white'>
            Delete
          </Button>
        </div>
      </Modal>
      {/* <Pagination
        total={10}
        initialPage={1} /> */}
    </>
  )
}

export default ProductTable