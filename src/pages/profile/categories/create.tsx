/* eslint-disable @typescript-eslint/no-explicit-any */
import CategoryForm from '@/components/CategoryForm'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useCreateCategoryMutation } from '@/redux/api/categoryApi'
import { NextLayout } from '@/types'
import toast from 'react-hot-toast'

const CreateFeedbackPage: NextLayout = () => {
  const [creatCategory] = useCreateCategoryMutation()

  const formHandler = async (data: any) => {
    const res = await creatCategory({ data }).unwrap()

    if (res.status) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium">Create Category</h3>
      <div>
        <CategoryForm formHandler={formHandler} submitButtonText="Create Category" />
      </div>
    </div>
  )
}

export default CreateFeedbackPage

CreateFeedbackPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
