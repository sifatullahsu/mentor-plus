/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@/components/Table'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useDeleteBlogMutation, useGetBlogsQuery } from '@/redux/api/blogApi'
import { NextLayout, iMeta, iTableData, iTableHeader } from '@/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'

const BlogsPage: NextLayout = () => {
  const { data: session } = useSession()

  const [pagination, setPagination] = useState<Partial<iMeta>>({ page: 1 })
  const query = session?.user.role === 'admin' ? '' : `&user=$eq:${session?.user?._id}`

  const { data, isLoading } = useGetBlogsQuery({ query: `page=${pagination.page}&size=20` + query })
  const [deleteItem] = useDeleteBlogMutation()

  const tableHeader: iTableHeader = ['Title', 'Category', 'username', 'Status', 'Actons']

  const tableData: iTableData[] = data?.data?.map((item: any): iTableData => {
    const {
      _id,
      title,
      slug,
      category: { title: catTitle },
      user: { username },
      status
    } = item

    const others = {
      viewLink: `/blogs/${username}/${slug}`,
      editLink: `/profile/blogs/${_id}`
    }

    return {
      data: [_id, title, catTitle, username, status],
      others
    }
  })

  const deleteHandler = async (id: string) => {
    const res = await deleteItem({ id }).unwrap()

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
        deleteHandler={deleteHandler}
        isLoading={isLoading}
        meta={data?.meta}
        setPagination={setPagination}
      />
    </div>
  )
}

export default BlogsPage

BlogsPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
