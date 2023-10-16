/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@/components/Table'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetBlogsQuery } from '@/redux/api/blogApi'
import { NextLayout } from '@/types'
import { useSession } from 'next-auth/react'

const BlogsPage: NextLayout = () => {
  const { data: session } = useSession()
  const { data, isLoading } = useGetBlogsQuery({ query: `user=${session?.user?._id}` })

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

  const deleteHandler = (id: string) => {
    console.log(id)
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-5">My Blogs</h3>
      <Table
        tableHeader={tableHeader}
        tableData={tableData || []}
        url="/profile/blogs"
        deleteHandler={deleteHandler}
        isLoading={isLoading}
      />
    </div>
  )
}

export default BlogsPage

BlogsPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
