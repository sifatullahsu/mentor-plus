/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from '@/components/Pagination'
import BlogsLoop from '@/components/reusable/blogs/BlogsLoop'
import MainLayout from '@/layouts/MainLayout'
import { useGetBlogsQuery } from '@/redux/api/blogApi'
import { NextLayout } from '@/types'
import { useState } from 'react'

const BlogsPage: NextLayout = () => {
  const [pagination, setPagination] = useState({ size: 20, page: 1 })
  const query = `&size=${pagination.size}&page=${pagination.page}`

  const { data, isLoading, isError, refetch } = useGetBlogsQuery(
    { query },
    { refetchOnMountOrArgChange: true }
  )
  const paginationHandler = (data: any) => {
    setPagination({ ...data })
  }

  if (isLoading) return <div>loading</div>
  return (
    <div className="container py-10">
      <BlogsLoop data={data?.data} isLoading={isLoading} isError={isError} refetch={refetch} />
      <div className="mt-14">
        <Pagination meta={data?.meta} handlerFunction={paginationHandler} />
      </div>
    </div>
  )
}

export default BlogsPage

BlogsPage.getLayout = page => <MainLayout>{page}</MainLayout>