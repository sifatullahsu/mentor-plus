/* eslint-disable @typescript-eslint/no-explicit-any */
import FaqForm from '@/components/FaqForm'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetfaqQuery, useUpdatefaqMutation } from '@/redux/api/faqApi'
import { NextLayout } from '@/types'

import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const UpdateFaq: NextLayout = () => {
  const { id } = useRouter().query
  const { data, isLoading } = useGetfaqQuery({ id })
  const [updateItem] = useUpdatefaqMutation()

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
      <h3 className="text-lg font-medium">Edit Faq</h3>
      <div>
        <FaqForm formHandler={formHandler} submitButtonText="Create Faq" defaultValue={data?.data} />
      </div>
    </div>
  )
}

export default UpdateFaq

UpdateFaq.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
