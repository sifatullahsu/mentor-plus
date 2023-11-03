/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { BiCategory } from 'react-icons/bi'

const BlogsGrid = ({ data }: any) => {
  return (
    <div>
      <img src={data.image} alt="" className="border rounded-xl h-[200px] w-full object-cover" />
      <div className="px-1 py-2">
        <div className="mt-2">
          <span className="font-semibold lowercase text-primary hover:underline">
            <BiCategory className="inline mr-1 text-lg" />
            {data?.category?.title}
          </span>
        </div>
        <div className="text-lg font-rajdhani font-bold ">
          <Link href={`/blogs/${data.user.username}/${data.slug}`} className="hover:underline">
            {data.title}
          </Link>
        </div>
        <div className="mt-5 text-sm text-neutral">{data.content.slice(0, 100)}...</div>

        <Link href={`/blogs/${data.user.username}/${data.slug}`} className="btn btn-primary btn-sm mt-5">
          Read More
        </Link>
      </div>
    </div>
  )
}

export default BlogsGrid
