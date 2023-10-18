/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetFeedbackQuery } from '@/redux/api/feedbackApi'
import { NextLayout } from '@/types'

import { useRouter } from 'next/router'

const ViewFeedback: NextLayout = () => {
  const { id } = useRouter().query
  const { data, isLoading } = useGetFeedbackQuery({ id })

  if (isLoading) return <div>Loading</div>

  let feedback
  if (data.status) feedback = data.data

  return (
    <div>
      <h3 className="text-lg font-medium">View Feedback</h3>
      <div>
        <p className="text-lg font-medium mb-5 mt-10">Title: {feedback?.title}</p>
        <p>
          <span className="font-medium">Description:</span> {feedback?.description}
        </p>
      </div>
    </div>
  )
}

export default ViewFeedback

ViewFeedback.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
