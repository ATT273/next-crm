import React from 'react'
import RoleTable from './components/table'

const Role = () => {
  return (
    <div className='p-3 relative'>
      <h1 className='font-bold text-2xl mb-3'>Roles</h1>
      <RoleTable />
      {/* <NewUser /> */}
    </div>
  )
}

export default Role