import BookingForm from '@/components/BookingForm'
import MainLayout from '@/layouts/MainLayout'
import { useGetReviewsQuery } from '@/redux/api/reviewApi'
import { useGetServiceQuery } from '@/redux/api/serviceApi'
import { NextLayout } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { HiLanguage } from 'react-icons/hi2'

const ServicesDetailsPage: NextLayout = () => {
  const { query } = useRouter()

  const { data, isLoading } = useGetServiceQuery({ id: query.uid })
  const { data: reviewsData, isLoading: reviewsLoading } = useGetReviewsQuery(
    { query: `service=$eq:${data?.data?._id}&limit=20` },
    { refetchOnMountOrArgChange: true }
  )

  if (isLoading || reviewsLoading) return <div>Loading</div>

  const reviews = reviewsData.data
  const service = data.data

  return (
    <div className="container py-10 services-single">
      <div className="grid lg:grid-cols-4 gap-10">
        <div className="space-y-5">
          <img src={service?.image} alt="" className="w-full border rounded-xl" />
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
        <div className="lg:col-span-2">
          <div className="mt-2">
            <Link
              href={`/mentors/${service?.mentor?.username}`}
              className="text-primary font-medium hover:underline"
            >
              <AiOutlineUsergroupAdd className="inline mr-1 text-lg" />
              {service?.mentor?.username}
            </Link>
          </div>
          <div className="text-2xl font-rajdhani font-bold mb-5">{service.title}</div>
          <div className="" dangerouslySetInnerHTML={{ __html: service.description }}></div>
          <div className="mt-20">
            <h3 className="text-2xl font-medium mb-5">Reviews</h3>
            {reviews?.map((review: Record<string, string>) => {
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
            data={{
              serviceId: service._id,
              topics: service.topics,
              packages: service.packages
            }}
            submitButtonText="Book Now"
          />
        </div>
      </div>
    </div>
  )
}

export default ServicesDetailsPage

ServicesDetailsPage.getLayout = page => <MainLayout>{page}</MainLayout>
