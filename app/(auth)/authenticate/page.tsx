'use client'

import { z } from "zod"
import { useRouter } from 'next/navigation';
import LogInForm from './component/login-form';
import SignUpForm from './component/signup-form';
import { Tabs } from '@mantine/core'
type Inputs = {
  example: string
  exampleRequired: string
}

export type FormData = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters",
  }),
})

const initalForm = {
  email: "",
  password: "",
}
const Login = () => {
  return (
    <div className='h-full w-full'>
      <div
        className='flex flex-col gap-3 p-3 absolute w-1/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md rounded-md'>
        <Tabs
          defaultValue="log_in"
          classNames={{
            list: 'flex justify-center w-full ',
            tab: 'text-center w-1/2',
          }}
        >
          <Tabs.List>
            <Tabs.Tab value="log_in">
              Log In
            </Tabs.Tab>
            <Tabs.Tab value="sign_up">
              Sign up
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="log_in">
            <LogInForm />
          </Tabs.Panel>
          <Tabs.Panel value="sign_up">
            <SignUpForm />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  )
}

export default Login