'use client'
import { Button, Card, Drawer, Select, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import { z } from 'zod';

const NewUser = () => {
  const [opened, setOpened] = useState(false);
  const formInfoSchema = z.object({
    email: z.string().email({
      message: "Invalid email address",
    }),
    name: z.string().min(6, {
      message: "Name must be at least 6 characters",
    }),
    dob: z.string(),
  })

  const formInfo = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      name: '',
      dob: ''
    },
    validate: zodResolver(formInfoSchema),
  });

  const handleSubmit = async () => { }
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position='right'
        size={'lg'}
        classNames={{
          content: 'pt-2 relative',
          body: 'h-[calc(100%-60px)]'
        }}
        title={<h1 className='font-bold text-xl'>Add New User</h1>}>
        <form
          key='infoForm'
          onSubmit={formInfo.onSubmit(handleSubmit)}
          className='flex flex-col gap-3 items-center h-[calc(100%-60px)] overflow-y-auto'>
          <Card
            shadow="sm"
            radius="md"
            withBorder
            classNames={{
              root: 'w-full'
            }}>
            <h3 className='text-lg font-semibold mb-3'>Basic Information</h3>
            <TextInput
              withAsterisk
              label="Fullname"
              type='text'
              placeholder="user fullname"
              classNames={{ root: 'w-full' }}
              key={formInfo.key('name')}
              {...formInfo.getInputProps('name')}
            />
            <TextInput
              withAsterisk
              label="Email"
              type='text'
              placeholder="user email"
              classNames={{ root: 'w-full' }}
              key={formInfo.key('email')}
              {...formInfo.getInputProps('email')}
            />
            <Select
              label="Role"
              placeholder="Select role"
              data={['Staff', 'Cashier', 'Manager', 'Super Admin']}
              key={formInfo.key('role')}
              {...formInfo.getInputProps('role')}
              classNames={{ root: 'grow' }}
            />
            <TextInput
              label="Contact number"
              type='number'
              placeholder="Enter user contact number"
              classNames={{ root: 'w-full' }}
              key={formInfo.key('contact')}
              {...formInfo.getInputProps('contact')}
            />
          </Card>
        </form>
        <footer className='sticky bottom-0 left-0 w-full flex justify-end gap-1 py-2 px-4 bg-white'>
          <Button color='gray' variant='light' onClick={() => setOpened(false)}>Close</Button>
          <Button color='teal' onClick={() => formInfo.onSubmit(handleSubmit)}>Save</Button>
        </footer>
      </Drawer>
      <Button onClick={() => setOpened(true)}>Open Drawer</Button>
    </div>
  )
}

export default NewUser