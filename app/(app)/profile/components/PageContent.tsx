'use client'
import { Divider, Accordion } from '@mantine/core';
import { Lock } from '@/components/icons/lock';
import PasswordForm from './PasswordForm';
import InforForm from './InforForm'
const PageContent = () => {
  return (
    <div>
      <title>Profile</title>
      <div className='h-dvh p-3 w-1/3'>
        <h1 className='font-bold text-3xl mb-3'>Profile</h1>
        <div>
          <InforForm />
          <Divider my="md" />
          <Accordion defaultValue="">
            <Accordion.Item value={'password'}>
              <Accordion.Control icon={<Lock className='size-6' />}>
                Change Password
              </Accordion.Control>
              <Accordion.Panel>
                <PasswordForm />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default PageContent