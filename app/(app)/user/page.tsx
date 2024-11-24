import React from 'react'
import UserTable from './components/table'
import NewUser from './components/new-user-drawer'
import { getSession } from '@/app/actions'
import { redirect } from 'next/navigation'
import Forbidden from '@/components/pages/forbiden'
import { permissionsValue } from '@/constants'

const User = async () => {
  const session = await getSession()
  if (!session) {
    redirect('/authenticate')
  } else {
    if (!(session.permissions & permissionsValue.ACCESS)) {
      return (
        <Forbidden />
      )
    }
  }
  return (
    <div className='h-dvh p-3 flex-1'>
      <h1 className='font-bold text-2xl mb-3'>Users</h1>
      <UserTable />
      <NewUser />
    </div>
  )
}

export default User