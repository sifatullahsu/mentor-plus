/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from '@/components/form/Form'
import SelectField from '@/components/form/SelectField'
import SubmitButton from '@/components/form/SubmitButton'
import TextField from '@/components/form/TextField'
import TextareaField from '@/components/form/TextareaField'
import { xGender } from '@/global/constants'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/api/usersApi'
import { NextLayout } from '@/types'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

const AccountSettings: NextLayout = () => {
  const { data: user } = useSession()
  const { data, isLoading, isError } = useGetUserQuery({ id: user?.user._id })
  const [userUpdate] = useUpdateUserMutation()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlerFunction = async (data: any) => {
    const username = data?.username?.value
    const firstName = data?.firstName?.value
    const lastName = data?.lastName?.value
    const email = data?.email?.value
    const number = data?.number?.value
    const gender = data?.gender?.value
    const about = data?.about?.value
    const institute = data?.institute?.value
    const passing_year = data?.passing_year?.value
    const cgpa = data?.cgpa?.value
    const password = data?.password?.value

    const responseData: any = {
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
      about,
      education: [
        {
          institute,
          passing_year: parseInt(passing_year),
          cgpa: parseFloat(cgpa)
        }
      ]
    }

    if (password) responseData['password'] = password

    const res = await userUpdate({ id: user?.user._id, data: responseData }).unwrap()

    if (res.status) {
      toast.success('User update successfull.')
    } else {
      toast.error('Somthing is wrong, try again')
    }
  }

  // if (!data || (data && !data.status)) return <div>loading</div>
  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Error</div>

  return (
    <div>
      <h3 className="text-lg font-medium">Account settings</h3>
      <div>
        <Form submitHandler={handlerFunction}>
          <TextField label="Username" name="username" required={true} defaultValue={data?.data?.username} />
          <div className="grid grid-cols-2 gap-x-4">
            <TextField
              label="First Name"
              name="firstName"
              required={true}
              defaultValue={data?.data?.name?.firstName}
            />
            <TextField
              label="Last Name"
              name="lastName"
              required={true}
              defaultValue={data?.data?.name?.lastName}
            />
            <TextField label="Email" name="email" required={true} defaultValue={data?.data?.email?.address} />
            <TextField
              label="Number"
              name="number"
              required={true}
              defaultValue={`${data?.data?.number?.digits}`}
            />
          </div>
          <SelectField
            label="Gender"
            name="gender"
            data={xGender}
            required={true}
            defaultValue={data?.data?.gender}
          />
          <TextareaField label="About" name="about" defaultValue={data?.data?.about} />
          <TextField
            label="Institute"
            name="institute"
            required={true}
            defaultValue={data?.data?.education[0]?.institute}
          />
          <div className="grid grid-cols-2 gap-5">
            <TextField
              type="number"
              label="Passing Year"
              name="passing_year"
              required={true}
              defaultValue={data?.data?.education[0]?.passing_year}
            />
            <TextField
              type="number"
              label="CGPA"
              name="cgpa"
              required={true}
              defaultValue={data?.data?.education[0]?.cgpa}
            />
          </div>
          <div className="p-10 bg-gray-300 mt-5 rounded-xl">
            <TextField label="Want to change password? Otherwise make empty." name="password" />
          </div>
          <SubmitButton title="Update Profile" />
        </Form>
      </div>
    </div>
  )
}

export default AccountSettings

AccountSettings.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
