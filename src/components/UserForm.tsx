/* eslint-disable @typescript-eslint/no-explicit-any */

import { xGender, xRole, xStatus } from '@/global/constants'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import Form from './form/Form'
import SelectField from './form/SelectField'
import SubmitButton from './form/SubmitButton'
import TextField from './form/TextField'
import TextareaField from './form/TextareaField'

type iProps = {
  formHandler: (data: any) => void
  defaultValue?: Record<string, any>
  submitButtonText?: string
  isAccountSettings?: boolean
}

const UserForm = ({
  formHandler,
  defaultValue,
  submitButtonText = 'Submit',
  isAccountSettings = false
}: iProps) => {
  const { data: session } = useSession()

  const localFormHandler = (from: any) => {
    const username = from?.username?.value
    const firstName = from?.firstName?.value
    const lastName = from?.lastName?.value
    const email = from?.email?.value
    let number: string = from?.number?.value
    const gender = from?.gender?.value
    const about = from?.about?.value
    const institute = from?.institute?.value
    const passing_year = from?.passing_year?.value
    const cgpa = from?.cgpa?.value
    const password = from?.password?.value
    const role = from?.role?.value
    const status = from?.status?.value

    if (!number.startsWith('01') || number.length !== 11 || isNaN(Number(number))) {
      toast.error('Number is incorrect.')
      return
    }

    if (role && session?.user.role === 'admin' && (role === 'admin' || role === 'super_admin')) {
      toast.error('admin cant update to admin or super_admin')
      return
    }

    number = number.substring(1)

    const result: any = {
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
        digits: number,
        is_verified: true
      },
      gender,
      about,
      education: [
        {
          institute,
          passing_year: parseInt(passing_year),
          cgpa: parseFloat(cgpa)
        }
      ]
    }

    if (password) result['password'] = password
    if (role) result['role'] = role
    if (status) result['status'] = status

    formHandler(result)
  }

  return (
    <Form submitHandler={localFormHandler}>
      <TextField label="Username" name="username" required={true} defaultValue={defaultValue?.username} />
      <div className="grid grid-cols-2 gap-x-4">
        <TextField
          label="First Name"
          name="firstName"
          required={true}
          defaultValue={defaultValue?.name?.firstName}
        />
        <TextField
          label="Last Name"
          name="lastName"
          required={true}
          defaultValue={defaultValue?.name?.lastName}
        />
        <TextField label="Email" name="email" required={true} defaultValue={defaultValue?.email?.address} />
        <TextField
          label="Number (without +88)"
          name="number"
          required={true}
          defaultValue={defaultValue ? `0${defaultValue?.number?.digits}` : undefined}
        />
      </div>
      <SelectField
        label="Gender"
        name="gender"
        data={xGender}
        required={true}
        defaultValue={defaultValue?.gender}
      />
      <TextareaField label="About" name="about" defaultValue={defaultValue?.about} />
      <TextField
        label="Institute"
        name="institute"
        required={true}
        defaultValue={defaultValue?.education[0]?.institute}
      />
      <div className="grid grid-cols-2 gap-5">
        <TextField
          type="number"
          label="Passing Year"
          name="passing_year"
          required={true}
          defaultValue={defaultValue?.education[0]?.passing_year}
        />
        <TextField
          type="number"
          label="CGPA"
          name="cgpa"
          required={true}
          defaultValue={defaultValue?.education[0]?.cgpa}
        />
      </div>

      <TextField
        label={`Password ${defaultValue ? '(Change the password or leave it empty.)' : ''}`}
        name="password"
        required={defaultValue ? false : true}
      />

      {(session?.user.role === 'admin' || session?.user.role === 'super_admin') && !isAccountSettings && (
        <>
          <SelectField
            label="Role"
            name="role"
            data={xRole}
            required={true}
            defaultValue={defaultValue ? defaultValue?.role : 'student'}
          />
          <SelectField
            label="Status"
            name="status"
            data={xStatus}
            required={true}
            defaultValue={defaultValue ? defaultValue?.status : 'active'}
          />
        </>
      )}

      <SubmitButton title={submitButtonText} />
    </Form>
  )
}

export default UserForm
