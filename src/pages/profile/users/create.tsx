/* eslint-disable @typescript-eslint/no-explicit-any */
import UserForm from '@/components/UserForm'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useCreateUserMutation } from '@/redux/api/usersApi'
import { NextLayout } from '@/types'
import toast from 'react-hot-toast'

const CreateTopicPage: NextLayout = () => {
  const [createItem] = useCreateUserMutation()

  const formHandler = async (data: any) => {
    const res = await createItem({ data }).unwrap()

    if (res.status) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium">Create User</h3>
      <div>
        <UserForm formHandler={formHandler} submitButtonText="Create User" />
      </div>
    </div>
  )
}

export default CreateTopicPage

CreateTopicPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
