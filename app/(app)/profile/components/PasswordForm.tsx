'use client'

import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from "zod"
import { useForm } from '@mantine/form';
import { Button, TextInput } from '@mantine/core';
import { updatePassword } from '../actions';
import { notifications } from '@mantine/notifications';
import { getLocalUser } from '@/utils/session';

const formChangePWSchema = z.object({
  newPassword: z.string().min(6, {
    message: "New password must be at least 6 characters",
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm password must be at least 6 characters",
  })
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Password does not match",
    path: ['confirmPassword']
  },
)

const initalFormPassword = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

const initUser = {
  id: '',
  email: '',
  name: '',
  accessToken: '',
  status: 0
}
const PasswordForm = () => {
  const formPassword = useForm({
    mode: 'controlled',
    initialValues: initalFormPassword,
    validate: zodResolver(formChangePWSchema),
  });

  type LocalUser = {
    id: string
    email: string
    name: string
    accessToken: string,
    status: number
  }

  const handleSubmitChangePW = async (values: z.infer<typeof formChangePWSchema>) => {
    const _localUser = await getLocalUser();
    if (!_localUser?.id) {
      notifications.show({
        title: 'Fail',
        message: 'Can not find your user',
        color: 'red',
        position: 'top-right',
      })
    }
    const res = await updatePassword(values.newPassword, _localUser?.id)
    if (res.status === 200) {
      notifications.show({
        title: 'Success',
        message: 'Password updated successfully',
        color: 'green',
        position: 'top-right',
      })
    }
  }
  return (
    <div>
      <form
        key='passwordForm'
        onSubmit={formPassword.onSubmit(handleSubmitChangePW)}
        className='flex flex-col gap-3 p-3 items-center'>
        <TextInput
          withAsterisk
          label="New Password"
          type='password'
          placeholder="Enter your new password"
          classNames={{ root: 'w-full' }}
          key={formPassword.key('newPassword')}
          {...formPassword.getInputProps('newPassword')}
        />
        <TextInput
          withAsterisk
          label="Confirm Password"
          type='password'
          placeholder="Confirm your password"
          classNames={{ root: 'w-full' }}
          key={formPassword.key('confirmPassword')}
          {...formPassword.getInputProps('confirmPassword')}
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

export default PasswordForm