import React from 'react'
import UserTable from './components/table'

const User = () => {
  const handlePageChange = (page: number) => {
    console.log(page)
  }
  return (
    <div className='h-dvh p-3 flex-1'>
      <h1 className='font-bold text-2xl mb-3'>Users</h1>
      <UserTable />
    </div>
  )
}

export default User