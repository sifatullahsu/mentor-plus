/* eslint-disable @typescript-eslint/no-explicit-any */
import FaqForm from '@/components/FaqForm'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useCreatefaqMutation } from '@/redux/api/faqApi'
import { NextLayout } from '@/types'
import toast from 'react-hot-toast'

const CreateFeedbackPage: NextLayout = () => {
  const [creatItem] = useCreatefaqMutation()

  const formHandler = async (data: any) => {
    const res = await creatItem({ data }).unwrap()

    if (res.status) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium">Create Faq</h3>
      <div>
        <FaqForm formHandler={formHandler} submitButtonText="Create Faq" />
      </div>
    </div>
  )
}

export default CreateFeedbackPage

CreateFeedbackPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
