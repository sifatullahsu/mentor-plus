import BlogsLoop from '@/components/reusable/blogs/BlogsLoop'
import MainLayout from '@/layouts/MainLayout'
import { useGetBlogsQuery } from '@/redux/api/blogApi'
import { NextLayout } from '@/types'

const BlogsPage: NextLayout = () => {
  const { data, isLoading, isError, refetch } = useGetBlogsQuery({})

  return (
    <div className="container py-10">
      <BlogsLoop data={data?.data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </div>
  )
}

export default BlogsPage

BlogsPage.getLayout = page => <MainLayout>{page}</MainLayout>
