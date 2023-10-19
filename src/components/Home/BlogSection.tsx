import { useGetBlogsQuery } from '@/redux/api/blogApi'
import BlogsLoop from '../reusable/blogs/BlogsLoop'
import Heading from './Heading'

const BlogSection = () => {
  const { data, isLoading, isError, refetch } = useGetBlogsQuery({ query: `size=8` })

  return (
    <div className="container py-12 md:py-20">
      <Heading
        short="Knowledge is power"
        title="Explore Our Blog Posts"
        description="Dive into a wealth of knowledge, insights, and inspiration. Our blog is a treasure trove of valuable
          content covering a wide range of topics to keep you informed and engaged."
      />
      <BlogsLoop data={data?.data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </div>
  )
}

export default BlogSection
