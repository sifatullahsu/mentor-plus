/* eslint-disable @typescript-eslint/no-explicit-any */
import ServiceForm from '@/components/ServiceForm'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetServiceQuery, useUpdateServiceMutation } from '@/redux/api/serviceApi'
import { NextLayout } from '@/types'

import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const EditService: NextLayout = () => {
  const blogId = useRouter().query.id

  const { data, isLoading } = useGetServiceQuery({ id: blogId })
  const [updateBlog] = useUpdateServiceMutation()

  const updateHandler = async (data: any) => {
    const res = await updateBlog({ id: blogId, data }).unwrap()

    if (res.status) {
      toast.success(res.message)
    } else {
      toast.error('Somthing is wrong, try again')
    }
  }

  if (isLoading) return <div>Loading</div>

  return (
    <div>
      <h3 className="text-lg font-medium">Edit Service</h3>
      <div>
        <ServiceForm
          formHandler={updateHandler}
          defaultValue={data?.data}
          submitButtonText="Update Blog Post"
        />
      </div>
    </div>
  )
}

export default EditService

EditService.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
