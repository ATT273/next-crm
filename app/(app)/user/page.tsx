import React from 'react'
import UserTable from './components/table'
import NewUser from './components/new-user-drawer'

const User = async () => {
  return (
    <div className='h-dvh p-3 flex-1'>
      <h1 className='font-bold text-2xl mb-3'>Users</h1>
      <UserTable />
      <NewUser />
    </div>
  )
}

export default User