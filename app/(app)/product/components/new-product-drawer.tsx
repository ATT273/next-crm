'use client'
import {
  Drawer, TagsInput,
  Button, Skeleton,
  TextInput, Select, Textarea,
  Card, FileInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { permissionsValue } from '@/constants';
import { mainCategory, subCategory } from '@/constants';
import { InitialItemType } from './table';
import { createProduct } from '../actions';
import { notifications } from '@mantine/notifications';

type SKU = {
  code: string
  size: string
  qty: number
  price: number
}

const formInfoSchema = z.object({
  name: z.string().min(6, {
    message: "Name must be at least 6 characters",
  }),
  mainCategory: z.string().min(1, {
    message: "please select main category",
  }),
  subCategory: z.string().min(1, {
    message: "Please select sub category",
  }),
  unit: z.string().min(1, {
    message: "Unit is required",
  }),
  price: z.number().min(1, { message: "Price is required" }),
  impPrice: z.number().min(1, { message: "Import price is required" }),
  qty: z.number().min(1, { message: "Quantity is required" }),
  sizes: z.array(z.string()).optional(),
  description: z.string().optional(),
})

const NewProduct = () => {
  const [opened, setOpened] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [permissions, setPermissions] = useState({
    access: false,
    edit: false,
    delete: false
  })
  const [skuItems, setSKUItems] = useState<SKU[]>([])
  const formInfo = useForm({
    mode: 'controlled',
    initialValues: {
      mainCategory: '',
      subCategory: '',
      name: '',
      unit: '',
      price: 0,
      impPrice: 0,
      qty: 0,
      sizes: [],
      description: '',
    },
    validate: zodResolver(formInfoSchema),
  });

  const handleSubmit = async (values: z.infer<typeof formInfoSchema>) => {
    const data = {
      ...values,
      main_category: parseInt(values.mainCategory),
      sub_category: parseInt(values.subCategory),
      imp_price: values.impPrice,
      description: values.description ?? "",
      sizes: values.sizes ?? []
    }
    const result = await createProduct(data)
    if (result.status === 200) {
      setOpened(false)
      notifications.show({
        title: 'Success',
        message: 'Product created successfully',
        color: 'green',
        position: 'top-right',
      })
    } else {
      notifications.show({
        title: 'Fail',
        message: `Failed to create product: ${result.message}`,
        color: 'red',
        position: 'top-right',
      })
    }
  }

  useEffect(() => {
    const localUser = localStorage.getItem('user')
    if (localUser) {
      const user = JSON.parse(localUser)
      const _permissions = {
        access: !!(user.permissions & permissionsValue.ACCESS),
        edit: !!(user.permissions & permissionsValue.EDIT),
        delete: !!(user.permissions & permissionsValue.DELETE)
      }
      setPermissions(_permissions)
    }
  }, [])

  useEffect(() => {
    if (sizes.length > 0) {
      const formValues = formInfo.getValues()
      const mainCode = mainCategory.find((item) => item.value === formValues.mainCategory)
      const subCode = subCategory.find((item) => item.value === formValues.subCategory)
      const _skuItems = sizes.map((size) => {
        const code = `${mainCode?.code}.${subCode?.code}.${size}`
        return {
          code,
          size,
          qty: 0,
          price: formValues.price
        }
      })
      setSKUItems(_skuItems)
    }
  }, [sizes])

  const handleChangeSizes = (values: string[]) => {
    setSizes(values)
    formInfo.setValues({ ...formInfo.getValues(), sizes: values })
  }
  const handleChangePrice = (value: string, index: number) => {
    const _skuItems = skuItems.map((item, i) => i === index ? { ...item, price: Number(value) } : item)
    setSKUItems(_skuItems)
  }
  const handleChangeQty = (value: string, index: number) => {
    const _skuItems = skuItems.map((item, i) => i === index ? { ...item, qty: Number(value) } : item)
    setSKUItems(_skuItems)
  }
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position='right'
        size={'lg'}
        classNames={{
          root: 'px-2 pt-2 relative'
        }}
        title={<p className='font-bold text-xl'>Add New Product</p>}>
        <form
          key='productForm'
          onSubmit={formInfo.onSubmit(handleSubmit)}
          className='flex flex-col gap-3 items-center h-[calc(100%-60px)] overflow-y-auto'>
          <Card
            shadow="sm"
            radius="md"
            withBorder
            classNames={{
              root: 'w-full p-2'
            }}>
            <h3 className='text-lg font-semibold mb-3'>Basic Information</h3>
            <TextInput
              withAsterisk
              label="Product name"
              type='text'
              placeholder="Enter product name"
              classNames={{ root: 'w-full' }}
              key={formInfo.key('name')}
              {...formInfo.getInputProps('name')}
            />
            <div className='flex gap-2 w-full'>
              <Select
                label="Sub Category"
                placeholder="Select main category"
                data={mainCategory}
                key={formInfo.key('mainCategory')}
                {...formInfo.getInputProps('mainCategory')}
                classNames={{ root: 'grow' }}
              />
              <Select
                label="Main Category"
                placeholder="Select sub category"
                data={subCategory}
                key={formInfo.key('subCategory')}
                {...formInfo.getInputProps('subCategory')}
                classNames={{ root: 'grow' }}
              />
            </div>
            <TextInput
              label="Unit"
              type='text'
              placeholder="Enter product unit"
              classNames={{ root: 'w-full' }}
              key={formInfo.key('unit')}
              {...formInfo.getInputProps('unit')}
            />
            <Textarea
              label="Description"
              resize="vertical"
              placeholder="Product description"
              classNames={{ root: 'w-full' }}
              key={formInfo.key('description')}
              {...formInfo.getInputProps('description')}
            />
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            classNames={{
              root: 'w-full p-2'
            }}>
            <h3 className='text-lg font-semibold mb-3'>Pricing</h3>
            <TextInput
              withAsterisk
              label="Sell Price"
              type='text'
              placeholder="Enter product sell price"
              classNames={{ root: 'w-full' }}
              {...formInfo.getInputProps('price')}
              key={formInfo.key('price')}
              onChange={(e) => formInfo.setFieldValue('price', parseInt(e.target.value))}
            />
            <TextInput
              withAsterisk
              label="Import Price"
              type='text'
              placeholder="Enter product import price"
              classNames={{ root: 'w-full' }}
              key={formInfo.key('impPrice')}
              {...formInfo.getInputProps('impPrice')}
              onChange={(e) => formInfo.setFieldValue('impPrice', parseInt(e.target.value))}
            />
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            classNames={{
              root: 'w-full p-2'
            }}>
            <h3 className='text-lg font-semibold mb-3'>Attribute</h3>
            <TextInput
              withAsterisk
              label="Quantity"
              type='number'
              placeholder="Enter product quantity"
              classNames={{ root: 'w-full' }}
              key={formInfo.key('qty')}
              {...formInfo.getInputProps('qty')}
              onChange={(e) => formInfo.setFieldValue('qty', parseInt(e.target.value))}
            />
            <TagsInput
              label="Sizes"
              data={[]} value={sizes}
              onChange={(e) => handleChangeSizes(e)} />
            {
              sizes.length > 0 &&
              <div className='flex flex-col gap-2 mt-2'>
                {
                    skuItems.map((item, index) => (
                    <div key={index}>
                        <p className='font-semibold'>SKU:{item.code}</p>
                      <div className='flex gap-2 items-center justify-start w-full'>
                          <div>
                            <p className='text-white'>.</p>
                            <p className='font-semibold min-w-[4rem]'>Size: {item.size}</p>
                          </div>
                        <TextInput
                          withAsterisk
                            label="Price"
                          type='text'
                          placeholder="Enter price"
                          classNames={{ root: 'grow' }}
                          key={formInfo.key('attPrice')}
                          {...formInfo.getInputProps('attPrice')}
                            onChange={(e) => handleChangePrice(e.target.value, index)}
                          />
                        <TextInput
                          withAsterisk
                            label="Quantity"
                          type='text'
                          placeholder="Enter quantity"
                          classNames={{ root: 'grow' }}
                          key={formInfo.key('attQty')}
                          {...formInfo.getInputProps('attQty')}
                            onChange={(e) => handleChangeQty(e.target.value, index)}
                        />
                      </div>
                    </div>

                  ))
                }
              </div>
            }
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            classNames={{
              root: 'w-full p-2'
            }}>
            <h3 className='text-lg font-semibold mb-3'>Extra Information</h3>
            <TagsInput
              label="Tags"
              data={[]} value={tags}
              onChange={setTags} />
            <FileInput
              label="Product Image"
              multiple
              placeholder="upload product image"
            />
            <div className='flex gap-2 flex-wrap p-2'>
              <Skeleton animate={false} height={100} width={100} radius={'md'} />
              <Skeleton animate={false} height={100} width={100} radius={'md'} />
              <Skeleton animate={false} height={100} width={100} radius={'md'} />
              <Skeleton animate={false} height={100} width={100} radius={'md'} />
              <Skeleton animate={false} height={100} width={100} radius={'md'} />
              <Skeleton animate={false} height={100} width={100} radius={'md'} />
            </div>
          </Card>

        </form>
        <footer className='sticky bottom-0 left-0 w-full flex justify-end gap-1 py-2 px-4 bg-white'>
          <Button color='gray' variant='light' type='button' onClick={() => setOpened(false)}>Close</Button>
          <Button color='teal' onClick={() => handleSubmit(formInfo.getValues())}>Save</Button>
        </footer>
      </Drawer>
      <Button
        onClick={() => setOpened(true)}
        disabled={!permissions.edit}>
        Add new product
      </Button>
    </div >
  )
}

export default NewProduct