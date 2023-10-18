/* eslint-disable @typescript-eslint/no-explicit-any */
import TopicForm from '@/components/TopicForm'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetTopicQuery, useUpdateTopicMutation } from '@/redux/api/topicApi'
import { NextLayout } from '@/types'

import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const EditTopicPage: NextLayout = () => {
  const { id } = useRouter().query
  const { data, isLoading } = useGetTopicQuery({ id })
  const [updateItem] = useUpdateTopicMutation()

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
      <h3 className="text-lg font-medium">Edit Topic</h3>
      <div>
        <TopicForm formHandler={formHandler} submitButtonText="Update Topic" defaultValue={data.data} />
      </div>
    </div>
  )
}

export default EditTopicPage

EditTopicPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
