/* eslint-disable @typescript-eslint/no-explicit-any */
import TopicForm from '@/components/TopicForm'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useCreateTopicMutation } from '@/redux/api/topicApi'
import { NextLayout } from '@/types'
import toast from 'react-hot-toast'

const CreateTopicPage: NextLayout = () => {
  const [createItem] = useCreateTopicMutation()

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
      <h3 className="text-lg font-medium">Create Topic</h3>
      <div>
        <TopicForm formHandler={formHandler} submitButtonText="Create Topic" />
      </div>
    </div>
  )
}

export default CreateTopicPage

CreateTopicPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
