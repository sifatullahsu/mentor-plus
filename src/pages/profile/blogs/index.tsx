/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@/components/Table'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useDeleteBlogMutation, useGetBlogsQuery } from '@/redux/api/blogApi'
import { NextLayout } from '@/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import toast from 'react-hot-toast'

const BlogsPage: NextLayout = () => {
  const { data: session } = useSession()
  const { data, isLoading } = useGetBlogsQuery({ query: `user=$eq:${session?.user?._id}` })
  const [deleteBlog] = useDeleteBlogMutation()

  const tableHeader: string[] = ['Title', 'Category', 'Status', 'Actons']

  const tableData: string[][] = data?.data?.map((item: any) => {
    const {
      _id,
      title,
      category: { title: catTitle },
      status
    } = item

    return [_id, title, catTitle, status]
  })

  const deleteHandler = async (id: string) => {
    const res = await deleteBlog({ id }).unwrap()

    if (res.status) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-lg font-medium mb-5">My Blogs</h3>
        <Link href={`/profile/blogs/create`} className="btn btn-primary btn-sm">
          Create Blog
        </Link>
      </div>

      <Table
        tableHeader={tableHeader}
        tableData={tableData}
        url="/profile/blogs"
        deleteHandler={deleteHandler}
        isLoading={isLoading}
      />
    </div>
  )
}

export default BlogsPage

BlogsPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
