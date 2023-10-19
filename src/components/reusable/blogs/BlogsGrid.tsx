/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { BiCategory } from 'react-icons/bi'

const BlogsGrid = ({ data }: any) => {
  return (
    <div>
      <img src={data.image} alt="" className="border rounded-xl h-[200px] w-full object-cover" />
      <div className="px-1 py-2">
        <div className="mt-2">
          <div className="underline">
            <BiCategory className="inline mr-1 text-lg" />
            {data?.category?.title}
          </div>
        </div>
        <div className="text-lg font-medium ">
          <Link href={`/blogs/${data.user.username}/${data.slug}`} className="hover:underline">
            {data.title}
          </Link>
        </div>
        <div className="mt-5 text-sm">{data.content.slice(0, 100)}...</div>

        <Link href={`/blogs/${data.user.username}/${data.slug}`} className="btn btn-primary btn-sm mt-5">
          Read More
        </Link>
      </div>
    </div>
  )
}

export default BlogsGrid
