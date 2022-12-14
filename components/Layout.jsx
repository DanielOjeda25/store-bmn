import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useState, useEffect } from 'react'
import { Store } from '../utils/Storage'
import { ToastContainer } from 'react-toastify'
import { signOut, useSession } from 'next-auth/react'
import { Menu } from '@headlessui/react'
import DropdownLink from './DropdownLink'
import Cookies from 'js-cookie'
const Layout = ({ children, title }) => {
  const { status, data: session } = useSession()
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const [cartItemsCount, setcartItemsCount] = useState(0)

  useEffect(() => {
    setcartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
  }, [cart.cartItems])

  const logoutClickHandler = () => {
    Cookies.remove('cart')
    dispatch({ type: 'CART_RESET' })
    signOut({ callbackUrl: '/login' })
  }
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='website eccomerce' />
        <title>{title ? title + ' - Amazonx' : 'Amazonx'}</title>
      </Head>
      <ToastContainer position='bottom-center' limit={1} />
      <div className='flex min-h-screen flex-col justify-between'>
        <header>
          <nav className='flex h-12 justify-between shadow items-center px-4'>
            <Link href={'/'} className='text-lg font-bold'>
              Amazonx
            </Link>
            <div>
              <Link href={'/cart'} className='p-2'>
                Cart
                {cartItemsCount > 0 && (
                  <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as='div' className='realative inline-block'>
                  <Menu.Button className='text-blue-500'>
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className='absolute right-0 w-56 origin-top-right shadow-lg bg-white'>
                    <Menu.Item>
                      <DropdownLink className='dropdown-link' href={'/profile'}>
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className='dropdown-link'
                        href={'/order-history'}
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        className='dropdown-link'
                        href={'#'}
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </Link>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link className='p-2' href={'/login'}>
                  Login
                </Link>
              )}
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
