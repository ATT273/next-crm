'use client'

import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from "zod"
import { useForm } from '@mantine/form';
import { Button, TextInput } from '@mantine/core';
// import { useState } from 'react';
import { updateInfo } from '../actions';
import { useEffect, useState } from 'react';
import { getLocalUser } from '@/utils/session';
import { getUserDetails } from '@/app/(app)/user/actions'
import { notifications } from '@mantine/notifications';

const formInfoSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  name: z.string().min(6, {
    message: "Name must be at least 6 characters",
  }),
  dob: z.string(),
})

type LocalUser = {
  id: string
  email: string
  name: string
  accessToken: string,
  status: number
}

const initUser = {
  id: '',
  email: '',
  name: '',
  accessToken: '',
  status: 0
}

const InforForm = () => {
  const [localUser, setLocalUser] = useState<LocalUser>(initUser)
  const formInfo = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      name: '',
      dob: ''
    },
    validate: zodResolver(formInfoSchema),
  });
  useEffect(() => {
    const _localUser = getLocalUser();
    if (_localUser.id) {
      getDetail(_localUser.id)
    }
  }, [])

  const getDetail = async (id: string) => {
    const res = await getUserDetails(id)
    if (res.status === 200) {
      formInfo.setValues({ email: res.data.email, name: res.data.name, dob: res.data.dob })
    }
  }
  const handleSubmit = async (values: z.infer<typeof formInfoSchema>) => {
    const res = await updateInfo(values.email, values.name, values.dob, localUser?.id)
    if (res.status === 200) {
      notifications.show({
        title: 'Success',
        message: 'Info updated successfully',
        color: 'green',
        position: 'top-right',
      })
    }
  }
  return (
    <div>
      <h2 className='text-gray-800 text-xl font-semibold'>General Information</h2>
      <form
        key='infoForm'
        onSubmit={formInfo.onSubmit(handleSubmit)}
        className='flex flex-col gap-3 p-3 items-center'>
        <TextInput
          withAsterisk
          label="Email"
          type='text'
          placeholder="your@email.com"
          classNames={{ root: 'w-full' }}
          key={formInfo.key('email')}
          {...formInfo.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label="Name"
          type='text'
          placeholder="Enter your name"
          classNames={{ root: 'w-full' }}
          key={formInfo.key('name')}
          {...formInfo.getInputProps('name')}
        />
        <TextInput
          label="Date of Birth"
          type='date'
          placeholder="YYYY/MM/DD"
          classNames={{ root: 'w-full' }}
          key={formInfo.key('dob')}
          {...formInfo.getInputProps('dob')}
        />
        <div className='flex justify-end w-full'>
          <Button type="submit" color='gray' variant='light' classNames={{
            root: 'w-[3rem]'
          }}>
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

export default InforForm