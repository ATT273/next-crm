import React, { useState } from 'react'
// import { useForm, Controller } from "react-hook-form"
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button";
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from "zod"
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react"
import { useForm } from '@mantine/form';
import { TextInput } from '@mantine/core';
import { logIn } from '../actions';

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

const LogInForm = () => {
  const router = useRouter()
  const [error, setError] = useState("");
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initalForm,
    validate: zodResolver(formSchema),
  });

  const onlogIn = async (values: z.infer<typeof formSchema>) => {
    const response = await logIn(values)
    if (response.status === 400) {
      setError(response.message)
    }
    if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify(response))
      router.replace("/dashboard");
    }
  }

  return (
    <div>
      <form
        key='logInForm'
        onSubmit={form.onSubmit(onlogIn)}
        className='flex flex-col gap-3 p-3 items-center'>
        <h3 className='font-bold text-2xl text-center'>Log In</h3>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          classNames={{ root: 'w-full' }}
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label="Password"
          type='password'
          placeholder="Enter your password"
          classNames={{ root: 'w-full' }}
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <p className='text-red-500'>{error}</p>
        <Button type="submit" className='bg-slate-800 text-white w-full'>Login</Button>
      </form>
    </div>
  )
}

export default LogInForm