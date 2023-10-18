/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogForm from '@/components/BlogForm'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetBlogQuery, useUpdateBlogMutation } from '@/redux/api/blogApi'
import { NextLayout } from '@/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const EditBlog: NextLayout = () => {
  const { data: session } = useSession()
  const blogId = useRouter().query.id

  const { data, isLoading } = useGetBlogQuery({ id: blogId })
  const [updateBlog] = useUpdateBlogMutation()

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

    const res = await updateBlog({ id: blogId, data: result }).unwrap()

    if (res.status) {
      toast.success(res.message)
      data.reset()
    } else {
      toast.error('Somthing is wrong, try again')
    }
  }

  if (isLoading) return <div>Loading</div>

  return (
    <div>
      <h3 className="text-lg font-medium">Edit Blog Post</h3>
      <div>
        <BlogForm
          formHandler={createBlogHandler}
          defaultValue={data?.data}
          submitButtonText="Edit Blog Post"
        />
      </div>
    </div>
  )
}

export default EditBlog

EditBlog.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
