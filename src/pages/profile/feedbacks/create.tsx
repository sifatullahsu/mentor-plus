/* eslint-disable @typescript-eslint/no-explicit-any */
import FeedbackForm from '@/components/FeedbackForm'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useCreateFeedbackMutation } from '@/redux/api/feedbackApi'
import { NextLayout } from '@/types'
import toast from 'react-hot-toast'

const CreateFeedbackPage: NextLayout = () => {
  const [creatFeedback] = useCreateFeedbackMutation()

  const formHandler = async (data: any) => {
    const res = await creatFeedback({ data }).unwrap()

    if (res.status) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium">Give Feedback</h3>
      <div>
        <FeedbackForm formHandler={formHandler} submitButtonText="Send Feedback" />
      </div>
    </div>
  )
}

export default CreateFeedbackPage

CreateFeedbackPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
