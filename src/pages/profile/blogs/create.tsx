/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogForm from '@/components/BlogForm'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useCreateBlogMutation } from '@/redux/api/blogApi'
import { NextLayout } from '@/types'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

const CreateBlog: NextLayout = () => {
  const { data: session } = useSession()
  const [createBlog] = useCreateBlogMutation()

  const createBlogHandler = async (data: any) => {
    const title = data?.title?.value
    const slug = data?.slug?.value
    const content = data?.content?.value
    const image = data?.image?.value
    const category = data?.category?.value
    const status = data?.status?.value

    const result = {
      title,
      slug,
      content,
      image,
      category,
      user: session?.user._id,
      status
    }

    const res = await createBlog({ data: result }).unwrap()

    if (res.status) {
      toast.success(res.message)
      data.reset()
    } else {
      toast.error('Somthing is wrong, try again')
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium">Create Blog Post</h3>
      <div>
        <BlogForm formHandler={createBlogHandler} submitButtonText="Create Blog Post" />
      </div>
    </div>
  )
}

export default CreateBlog

CreateBlog.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
