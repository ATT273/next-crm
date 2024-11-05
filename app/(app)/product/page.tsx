import React from 'react'
import ProductTable from './components/table'
import NewProduct from './components/new-product-drawer'
import { getProducts } from '../product/actions'

const Product = async () => {
  const res = await getProducts()
  console.log('res prod', res)
  return (
    <div className='p-3 relative'>
      <h1 className='font-bold text-2xl mb-3'>Products list</h1>
      <ProductTable products={res.data} />
      <NewProduct />
    </div>
  )
}

export default Product