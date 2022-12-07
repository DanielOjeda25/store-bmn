import Head from 'next/head'
import Link from 'next/link'
import React, { useContext } from 'react'
import { Store } from '../utils/Storage'
const Layout = ({ children, title }) => {
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='website eccomerce' />
        <title>{title ? title + ' - Amazonx' : 'Amazonx'}</title>
      </Head>

      <div className='flex min-h-screen flex-col justify-between'>
        <header>
          <nav className='flex h-12 justify-between shadow items-center px-4'>
            <Link href={'/'} className='text-lg font-bold'>
              Amazonx
            </Link>
            <div>
              <Link href={'/cart'} className='p-2'>
                Cart
                {cart.cartItems.length > 0 && (
                  <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </Link>
              <Link href={'/login'} className='p-2'>
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className='container m-auto mt-4 px-4'>{children}</main>
        <footer className='flex h-10 justify-center items-center shadow-inner'>
          <p>Copyright &#169; 2022 Amazonx</p>
        </footer>
      </div>
    </>
  )
}

export default Layout
