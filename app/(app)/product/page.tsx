import React from 'react'
import ProductTable from './components/table'
import NewProduct from './components/new-product-drawer'
import { getProducts } from '@/app/(app)/product/actions'
import { getSession } from '@/app/actions'
import { redirect } from 'next/navigation'
import { permissionsValue } from '@/constants'
import Forbidden from '@/components/pages/forbiden'

const Product = async () => {
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
  const res = await getProducts()
  return (
    <div className='p-3 relative'>
      <h1 className='font-bold text-2xl mb-3'>Products list</h1>
      <ProductTable products={res.data} />
      <NewProduct />
    </div>
  )
}

export default Product