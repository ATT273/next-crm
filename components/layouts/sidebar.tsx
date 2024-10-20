'use client'
import Link from 'next/link'
import { logOut } from '@/app/(auth)/authenticate/actions'
import { getLocalUser } from '@/utils/session'
import UserControlPanel from './user-controlpanel'
import { CogIcon } from '../icons/cog'
import { User as UserIcon } from '@/components/icons/user'
import { Logout } from '@/components/icons/logout'
import { useEffect, useState } from 'react'
import { ActionIcon, Menu } from '@mantine/core';

const menus = [
  {
    title: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    title: 'Users',
    icon: 'users',
    link: '/user'
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/setting'
  }
]

const Sidebar = () => {
  const [localUser, setLocalUser] = useState(null)
  useEffect(() => {
    const _localUser = getLocalUser();
    setLocalUser(_localUser)
  }, [])
  return (
    <div className='flex flex-col justify-between md:w-[15rem] h-dvh shadow-md absolute top-0 left-0 z-10 p-3'>
      <ul className='p-2'>
        {
          menus.map((menu) => (
            <Link href={menu.link} key={menu.title}>
              <li className='p-2 font-semibold rounded-sm hover:bg-slate-200'>{menu.title}</li>
            </Link>
          ))
        }
      </ul>
      <div className='w-full flex justify-between items-center'>
        <UserControlPanel user={localUser} />
        <Menu shadow="md" width={200} radius={15} position='right-end'>
          <Menu.Target>
            <ActionIcon
              variant='transparent'
              size={'lg'}
              color='gray'
              classNames={{
                root: 'hover:bg-gray-200 rounded-full p-2'
              }}>
              <CogIcon className='size-7' />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Link href='/profile'>
            <Menu.Item leftSection={<UserIcon className='size-7' />}>
              <h3>Profile</h3>
            </Menu.Item>
            </Link>
            <Menu.Item leftSection={<Logout className='size-7' />} onClick={() => logOut()}>
              <h3>Logout</h3>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  )
}

export default Sidebar