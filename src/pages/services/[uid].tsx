/* eslint-disable @typescript-eslint/no-explicit-any */
import BookingForm from '@/components/BookingForm'
import Authentication from '@/components/profile/Authentication'
import MainLayout from '@/layouts/MainLayout'
import { useCreatebookingMutation } from '@/redux/api/bookingApi'
import { useGetReviewsQuery } from '@/redux/api/reviewApi'
import { useGetServiceQuery } from '@/redux/api/serviceApi'
import { NextLayout } from '@/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { BsInfoLg } from 'react-icons/bs'
import { HiLanguage } from 'react-icons/hi2'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

const ServicesDetailsPage: NextLayout = () => {
  const { data: user } = useSession()
  const { query, push } = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [createBooking] = useCreatebookingMutation()
  const { data, isLoading } = useGetServiceQuery({ id: query.uid })
  const { data: reviewsData, isLoading: reviewsLoading } = useGetReviewsQuery(
    { query: `service=$eq:${data?.data?._id}&size=20` },
    { refetchOnMountOrArgChange: true }
  )

  const handleBookNow = async (formData: any) => {
    if (!user) return setIsModalOpen(prevState => !prevState)

    const [, hours, price] = formData.package.split('_')

    const data: any = {
      service: service._id,
      topic: formData.topic,
      user: user?.user._id,
      price: parseInt(price),
      hours: parseInt(hours),
      time: formData.time.toISOString(),
      transactionId: new Date().toISOString()
    }

    const res = await createBooking({ data }).unwrap()

    if (res.status) {
      toast.success(res.message)
      push('/profile/bookings')
    } else {
      toast.error(res.message)
    }
  }

  if (isLoading || reviewsLoading) return <div>Loading</div>

  const reviews = reviewsData.data
  const service = data.data

  return (
    <div className="container py-10 services-single">
      <div className="grid grid-cols-4 gap-10">
        <div className="space-y-5">
          <img src={service?.image} alt="" className="border rounded-xl" />
          <div className="font-bold">
            <BiCategory className="inline mr-1 text-lg" /> {service?.category.title}
          </div>
          <div className="font-bold">
            <HiLanguage className="inline mr-1 text-lg" /> {service?.languages.join(', ')}
          </div>
          <div className="flex gap-2">
            <img src="https://source.unsplash.com/50x50/?portrait" alt="" className="rounded-full w-[50px]" />
            <div>
              <div className="font-bold ">
                {service?.mentor?.name?.firstName} {service?.mentor?.name?.lastName}
              </div>
              {service?.mentor?.education.length > 0 && <div>{service?.mentor?.education[0].institute}</div>}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="mt-2">
            <Link href={`/mentors/${service?.mentor?.username}`} className="text-primary underline">
              <AiOutlineUsergroupAdd className="inline mr-1 text-lg" />
              {service?.mentor?.username}
            </Link>
          </div>
          <div className="text-2xl font-medium mb-5">{service.title}</div>
          <div className="" dangerouslySetInnerHTML={{ __html: service.description }}></div>
          <div className="mt-20">
            <h3 className="text-2xl font-medium mb-5">Reviews</h3>
            {reviews?.map((review: any) => {
              return (
                <div key={review._id} className="border-t-2 border-dashed py-2">
                  <div className="text-lg font-medium text-primary">{review.title}</div>
                  <div>{review.description}</div>
                  <div className="mt-5 font-medium text-xs">RATING: {review.rating} / 5</div>
                </div>
              )
            })}
            {reviews?.length === 0 && <div>No review found.</div>}
          </div>
        </div>
        <div>
          <BookingForm
            formHandler={handleBookNow}
            data={{
              topics: service.topics,
              packages: service.packages
            }}
            submitButtonText="Book Now"
          />
          {!user && (
            <Drawer
              open={isModalOpen}
              onClose={() => setIsModalOpen(prevState => !prevState)}
              direction="right"
              className="!w-[300px] md:!w-[600px]"
            >
              <div className="p-10">
                <h3 className="text-lg font-medium">
                  <BsInfoLg className="inline mr-1 text-2xl" /> Please Login to Proceed.
                </h3>
                <Authentication />
              </div>
            </Drawer>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServicesDetailsPage

ServicesDetailsPage.getLayout = page => <MainLayout>{page}</MainLayout>
