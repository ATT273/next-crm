import React, { useEffect } from 'react'
import { Button, Table, TextInput, Select, UnstyledButton } from '@mantine/core';
import { ProductType } from '@/types/product.type';
import { mainCategory, subCategory } from '@/constants';
import Check from '@/components/icons/check';
import XMark from '@/components/icons/xmark';
import {updateProduct} from '../actions'
import { notifications } from '@mantine/notifications';
import type { InitialItemType } from './table';

const EditableRow = ({
  item,
  changeEditMode
}: {
  item: ProductType,
  changeEditMode: () => void
}) => {
  const [selectedProduct, setSelectedProduct] = React.useState(item)

  const handleSubmit = async () => {
    const result = await updateProduct(selectedProduct)
    if(result.status === 200) {
      notifications.show({
        title: 'Success',
        message: 'Product updated successfully',
        color: 'green',
        position: 'top-right',
      })
      changeEditMode()
    } else {
      notifications.show({
        title: 'Fail',
        message: `Failed to update product: ${result.message}`,
        color: 'red',
        position: 'top-right',
      })
    }
  }

  useEffect(() => {
    if (item) {
      setSelectedProduct(item)
    }
  }, [item])

  return (
    <>
      <Table.Td>
        <TextInput
          type='text'
          placeholder="Enter item name"
          classNames={{ root: 'w-full' }}
          value={selectedProduct.name}
          onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
        />
      </Table.Td>
      <Table.Td>
        <TextInput
          type='number'
          placeholder="Enter item price"
          classNames={{ root: 'w-full' }}
          value={selectedProduct.price}
          onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseInt(e.target.value) })}
        />
      </Table.Td>
      <Table.Td>
        <TextInput
          type='text'
          placeholder="Enter item quantity"
          classNames={{ root: 'w-full' }}
          value={selectedProduct.qty}
          onChange={(e) => setSelectedProduct({ ...selectedProduct, qty: parseInt(e.target.value) })}
        />
      </Table.Td>
      <Table.Td>
        <Select
          placeholder="Select main category"
          data={mainCategory}
          key={selectedProduct.main_category}
          value={selectedProduct.main_category.toString()}
          classNames={{ root: 'grow' }}
          onChange={(e) => setSelectedProduct({ ...selectedProduct, main_category: parseInt(e!) })}
        />
      </Table.Td>
      <Table.Td>
        <Select
          placeholder="Select main category"
          data={subCategory}
          key={selectedProduct.sub_category}
          value={selectedProduct.sub_category.toString()}
          classNames={{ root: 'grow' }}
          onChange={(e) => setSelectedProduct({ ...selectedProduct, sub_category: parseInt(e!) })}
        />
      </Table.Td>
      <Table.Td>
        <TextInput
          type='text'
          classNames={{ root: 'w-full' }}
          value={selectedProduct.unit}
          onChange={(e) => setSelectedProduct({ ...selectedProduct, unit: e.target.value })}
        /></Table.Td>
      <Table.Td>
        <TextInput
          type='text'
          classNames={{ root: 'w-full' }}
          value={selectedProduct.description}
          onChange={(e) =>setSelectedProduct({ ...selectedProduct, description: e.target.value })}
        />
        </Table.Td>
        <Table.Td>
          <div className='flex gap-2'>
            <UnstyledButton
              onClick={() => handleSubmit()}
              variant='transparent'
              className='grid place-items-center size-8 p-0'>
              <Check className='text-teal-500 size-4' />
            </UnstyledButton>
            <UnstyledButton
              onClick={changeEditMode}
              variant='transparent'
              className='grid place-items-center size-8'>
              <XMark className='text-red-500 size-4' />
            </UnstyledButton>
          </div>
        </Table.Td>
    </>
  )
}

export default EditableRow