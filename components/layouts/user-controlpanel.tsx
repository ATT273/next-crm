'use client'
import { Avatar } from '@mantine/core';

const UserControlPanel = ({ user }: { user: any }) => {

  return (
    <div className='flex gap-1'>
      <Avatar radius="xl" />
      <div>
        <h3 className='font-semibold'>{user && user.name}</h3>
        <p className='text-sm italic text-gray-400'>{user && user.email}</p>
      </div>
    </div>
  )
}

export default UserControlPanel