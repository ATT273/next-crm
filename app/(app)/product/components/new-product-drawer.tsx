'use client'
import {
  Drawer, TagsInput,
  Button, Skeleton,
  TextInput, Select, Textarea,
  Card, FileInput
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import { z } from 'zod';
import { createProduct } from '../actions';
import InforForm from '../../profile/components/InforForm';

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
  sizes: z.array(z.string()),
})


const NewProduct = () => {
  const [opened, setOpened] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
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
    },
    validate: zodResolver(formInfoSchema),
  });

  const handleSubmit = async (values: z.infer<typeof formInfoSchema>) => {
    console.log('values', values)
    // const res = await createProduct(values)
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
            <h3 className='text-lg font-semibold mb-3'>Basic Information - SKU: N-POLO1</h3>
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
                label="Main Category"
                placeholder="Select main category"
                data={['', 'Nam', 'Nữ', 'Bé trai', 'Bé gái']}
                key={formInfo.key('mainCategory')}
                {...formInfo.getInputProps('mainCategory')}
                classNames={{ root: 'grow' }}
              />
              <Select
                label="Sub Category"
                placeholder="Select sub category"
                data={['Quần dài', 'Quần đùi', 'Áo', 'Váy']}
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
              onChange={setSizes} />
            {
              sizes.length > 0 &&
              <div className='flex flex-col gap-2 mt-2'>
                {
                  sizes.map((size, index) => (
                    <div key={index}>
                      <p className='font-semibold'>N-POLO1-{size}01</p>
                      <div className='flex gap-2 items-center justify-start w-full'>
                        <p className='font-semibold min-w-[4rem]'>Size: {size}</p>
                        <TextInput
                          withAsterisk
                          type='text'
                          placeholder="Enter price"
                          classNames={{ root: 'grow' }}
                          key={formInfo.key('attPrice')}
                          {...formInfo.getInputProps('attPrice')}
                        />
                        <p className='font-semibold min-w-[3rem]'>Qty: </p>
                        <TextInput
                          withAsterisk
                          type='text'
                          placeholder="Enter quantity"
                          classNames={{ root: 'grow' }}
                          key={formInfo.key('attQty')}
                          {...formInfo.getInputProps('attQty')}
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
      <Button onClick={() => setOpened(true)}>Open Drawer</Button>
    </div >
  )
}

export default NewProduct