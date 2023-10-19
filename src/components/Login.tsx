import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import Form from './form/Form'
import SubmitButton from './form/SubmitButton'
import TextField from './form/TextField'

const Login = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginHandler = async (data: any) => {
    const username = data?.username?.value
    const password = data?.password?.value

    const res = await signIn('credentials', {
      username,
      password,
      redirect: true,
      callbackUrl: '/profile'
    })

    if (res?.error) {
      toast.error('Somthing is wrong. Try again.')
    } else {
      toast.success('Login successfull.')
      data.reset()
    }
  }
  return (
    <div className="border p-5 md:p-10">
      <Form submitHandler={loginHandler}>
        <TextField label="Username / Email" name="username" required={true} />
        <TextField label="Password" name="password" required={true} />
        <SubmitButton title="Login Now" />
      </Form>
    </div>
  )
}

export default Login
