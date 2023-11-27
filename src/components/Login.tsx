import { signIn, useSession } from 'next-auth/react'
import Router from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Form from './form/Form'
import SubmitButton from './form/SubmitButton'
import TextField from './form/TextField'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()

  if (session) {
    Router.push('/profile')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginHandler = async (data: any) => {
    setIsLoading(true)
    const username = data?.username?.value
    const password = data?.password?.value

    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
      callbackUrl: ''
    })

    if (res?.ok) {
      toast.success('Login successfull.')
      data.reset()
    } else {
      toast.error('Somthing is wrong. Try again.')
    }
    setIsLoading(false)
  }
  return (
    <div className="border p-5 md:p-10">
      <Form submitHandler={loginHandler}>
        <TextField label="Username / Email" name="username" required={true} />
        <TextField label="Password" name="password" type="password" required={true} />
        <SubmitButton title="Login Now" disabled={isLoading} />
      </Form>
    </div>
  )
}

export default Login
