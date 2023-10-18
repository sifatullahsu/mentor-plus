/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogForm from '@/components/BlogForm'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetBlogQuery, useUpdateBlogMutation } from '@/redux/api/blogApi'
import { NextLayout } from '@/types'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const EditBlog: NextLayout = () => {
  const { id } = useRouter().query

  const { data, isLoading } = useGetBlogQuery({ id })
  const [updateItem] = useUpdateBlogMutation()

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
      <h3 className="text-lg font-medium">Edit Blog Post</h3>
      <div>
        <BlogForm formHandler={formHandler} defaultValue={data?.data} submitButtonText="Edit Blog Post" />
      </div>
    </div>
  )
}

export default EditBlog

EditBlog.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
