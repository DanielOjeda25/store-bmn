import Link from 'next/link'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { getError } from '../utils/error'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
const Login = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { redirect } = router.query
  
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/')
    }
  }, [redirect, router, session])
  
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      })
      if (result.error) {
        toast.error(result.error)
      }
    } catch (e) {
      toast.error(getError(e))
    }
  }
  return (
    <Layout title={'Login'}>
      <form action="" className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-xl'>Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input type="email" className='w-full' id='email' autoFocus
            {...register('email', {
              required: 'Please enter a valid email', pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email'
              }
            })}
          />
          {errors.email && (<div className='text-red-500'>{errors.email.message}</div>)}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input type="password" className='w-full' id='password' autoFocus
            {...register('password',
              {
                required: 'Please enter your password',
                minLength: { value: 5, message: 'password must be at least 5 characters' }
              }
            )}
          />
          {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}
        </div>
        <div className="mb-4">
          <button className='primary-button'>Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href={'register'}>Register</Link>
        </div>
      </form>
    </Layout>
  )
}

export default Login