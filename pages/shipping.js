import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { Store } from '../utils/Storage'

const ShippingScreen = () => {
  const { handleSubmit, register, formState: { errors }, setValue } = useForm()
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const { shippingAddress } = cart

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName)
    setValue('address', shippingAddress.address)
    setValue('city', shippingAddress.city)
    setValue('postalcode', shippingAddress.postalcode)
    setValue('country', shippingAddress.country)
  }, [setValue, shippingAddress])

  const submitHandler = ({ fullName, address, city, postalcode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, city, postalcode, country, address }
    })
    Cookies.set('cart', JSON.stringify({
      ...cart, shippingAddress: {
        fullName, address, city, postalcode, country
      }
    }))
    router.push('/payment')
  }
  return (
    <Layout title={'Shipping Address'}>
      <CheckoutWizard activeStep={1} />
      <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-xl'>Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            className='w-full'
            id='fullName'
            autoFocus
            {...register('fullName', {
              required: 'Please enter full name'
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            className='w-full'
            id='address'
            autoFocus
            {...register('address', {
              required: 'Please enter a password',
              minLength: { value: 3, message: 'Address is more than 2 chars' }
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            className='w-full'
            id='city'
            autoFocus
            {...register('city', {
              required: 'Please enter city',
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalcode">Postal Code</label>
          <input
            className='w-full'
            id='postalcode'
            autoFocus
            {...register('postalcode', {
              required: 'Please enter your postal code',
            })}
          />
          {errors.postalcode && (
            <div className="text-red-500">{errors.postalcode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            className='w-full'
            id='country'
            autoFocus
            {...register('country', {
              required: 'Please enter your country',
            })}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className='primary-button'>Next</button>
        </div>
      </form>
    </Layout>
  )
}
ShippingScreen.auth = true
export default ShippingScreen