import { xGender } from '@/global/constants'
import { useUserRegistrationMutation } from '@/redux/api/authApi'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Form from './form/Form'
import SelectField from './form/SelectField'
import SubmitButton from './form/SubmitButton'
import TextField from './form/TextField'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Registration = ({ setIsLogin }: { setIsLogin?: any }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userRegistration] = useUserRegistrationMutation()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginHandler = async (data: any) => {
    setIsLoading(true)
    const username = data?.username?.value
    const firstName = data?.firstName?.value
    const lastName = data?.lastName?.value
    const email = data?.email?.value
    const number = data?.number?.value
    const gender = data?.gender?.value
    const password = data?.password?.value

    const res = await userRegistration({
      username,
      name: {
        firstName,
        lastName
      },
      email: {
        address: email,
        is_verified: true
      },
      number: {
        cc: '+880',
        digits: number.substring(1),
        is_verified: true
      },
      gender,
      password
    }).unwrap()

    if (res.status) {
      toast.success('Registration successfull. Please login.')
      data.reset()
      if (setIsLogin) setIsLogin(true)
    } else {
      toast.error('Somthing is wrong, try again')
    }
    setIsLoading(false)
  }

  return (
    <div className="border p-5 md:p-10">
      <Form submitHandler={loginHandler}>
        <TextField label="Username" name="username" required={true} />
        <div className="grid grid-cols-2 gap-x-4">
          <TextField label="First Name" name="firstName" required={true} />
          <TextField label="Last Name" name="lastName" required={true} />
          <TextField label="Email" name="email" required={true} />
          <TextField label="Number" name="number" required={true} />
        </div>
        <SelectField label="Gender" name="gender" required={true} data={xGender} />
        <TextField label="Password" name="password" required={true} />
        <SubmitButton title="Register Now" disabled={isLoading} />
      </Form>
    </div>
  )
}

export default Registration
