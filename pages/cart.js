import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { Store } from '../utils/Storage'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const CartScreen = () => {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems }
  } = state
  const router = useRouter()
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty)
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
  }
  return (
    <Layout title={'Shopping Cart'}>
      <h1 className='mb-4 text-xl'>Shopping Cart</h1>
      {
        cartItems.length === 0 ?
          (<div>Cart is empty. <Link href={'/'}>go to shipping</Link></div>) : (
            <div className='grid md:grid-cols-4 md:gap-5'>
              <div className='overflow-x-auto md:col-span-3'>
                <table className='min-w-full'>
                  <thead className='border-b'>
                    <tr>
                      <th className='px-5 text-left'>Item</th>
                      <th className='p-5 text-right'>Quantity</th>
                      <th className='p-5 text-right'>Price</th>
                      <th className='p-5'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.slug} className='border-b'>
                        <td>
                          <Link href={`/product/${item.slug}`} className='flex items-center'>
                            <Image src={item.image} alt={item.name} width={50} height={50} />
                            &nbsp;
                            {item.name}
                          </Link>
                        </td>
                        <td className='p-5 text-right'>
                          <select name="" id="" value={item.quantity} onChange={(e) => updateCartHandler(item, e.target.value)}>                   {
                            [...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))
                          }
                          </select>
                        </td>
                        <td className='p-5 text-right'>{item.quantity}</td>
                        <td className='p-5 text-centert'>
                          <button onClick={() => removeItemHandler(item)}>
                            <XCircleIcon className='h-5 w-5'></XCircleIcon>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card p-5">
                <ul>
                  <li>
                    <div className="pb-3 text-xl">Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)})
                      {' '}
                      : $
                      {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </div>
                  </li>
                  <li>
                    <button className='primary-button w-full' onClick={() => router.push('login?redirect=/shipping')}>check out</button>
                  </li>
                </ul>
              </div>
            </div>
          )
      }
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })