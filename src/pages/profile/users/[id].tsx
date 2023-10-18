/* eslint-disable @typescript-eslint/no-explicit-any */
import UserForm from '@/components/UserForm'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/api/usersApi'
import { NextLayout } from '@/types'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const EditUserPage: NextLayout = () => {
  const { id } = useRouter().query
  const { data, isLoading } = useGetUserQuery({ id })
  const [updateItem] = useUpdateUserMutation()

  const formHandler = async (data: any) => {
    const res = await updateItem({ id, data }).unwrap()

    if (res.status) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  if (isLoading) return <div>Loading</div>

  return (
    <div>
      <h3 className="text-lg font-medium">Edit User</h3>
      <div>
        <UserForm formHandler={formHandler} submitButtonText="Update User" defaultValue={data.data} />
      </div>
    </div>
  )
}

export default EditUserPage

EditUserPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
