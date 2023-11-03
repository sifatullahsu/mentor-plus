/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLayout from '@/layouts/MainLayout'
import { useGetBlogQuery } from '@/redux/api/blogApi'
import { NextLayout } from '@/types'
import { useRouter } from 'next/router'
import 'react-datepicker/dist/react-datepicker.css'
import { BiCategory } from 'react-icons/bi'
import 'react-modern-drawer/dist/index.css'

const ServicesDetailsPage: NextLayout = () => {
  const { slug } = useRouter().query

  const { data, isLoading } = useGetBlogQuery({ id: slug ? slug[1] : undefined })

  if (isLoading) return <div>Loading</div>

  const blog = data.data
  return (
    <div className="container py-10 services-single">
      <div className="grid md:grid-cols-4 md:gap-10">
        <div></div>
        <div className="md:col-span-2">
          <img src={blog.image} alt="" className="border rounded-xl h-[200px] w-full object-cover" />
          <div className="my-2">
            <div className="font-semibold lowercase text-primary hover:underline">
              <BiCategory className="inline mr-1 text-lg" />
              {blog?.category?.title}
            </div>
          </div>
          <div className="text-2xl font-rajdhani font-bold mb-5">{blog.title}</div>
          <div className="" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          <div className="flex gap-2 mt-20">
            <img src="https://source.unsplash.com/50x50/?portrait" alt="" className="rounded-full w-[50px]" />
            <div>
              <div className="font-bold ">
                {blog?.user?.name?.firstName} {blog?.user?.name?.lastName}
              </div>
              {blog?.user?.education.length > 0 && (
                <div className="text-sm">{blog?.user?.education[0].institute}</div>
              )}
            </div>
          </div>
          <div className="mt-10 font-medium">Thanks for reading.</div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default ServicesDetailsPage

ServicesDetailsPage.getLayout = page => <MainLayout>{page}</MainLayout>
