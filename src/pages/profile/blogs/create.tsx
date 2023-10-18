/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogForm from '@/components/BlogForm'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useCreateBlogMutation } from '@/redux/api/blogApi'
import { NextLayout } from '@/types'
import toast from 'react-hot-toast'

const CreateBlog: NextLayout = () => {
  const [createItem] = useCreateBlogMutation()

  const formHandler = async (data: any) => {
    const res = await createItem({ data }).unwrap()

    if (res.status) {
      toast.success(res.message)
      data.reset()
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium">Create Blog Post</h3>
      <div>
        <BlogForm formHandler={formHandler} submitButtonText="Create Blog Post" />
      </div>
    </div>
  )
}

export default CreateBlog

CreateBlog.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
