import ServiceDate from '@/components/ServiceDate'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetbookingQuery } from '@/redux/api/bookingApi'
import { NextLayout } from '@/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { BiCategory } from 'react-icons/bi'
import { HiLanguage } from 'react-icons/hi2'

const SingleAppointmentPage: NextLayout = () => {
  const { data: session } = useSession()
  const bookingId = useRouter().query.id

  const { data, isLoading } = useGetbookingQuery({ id: bookingId, query: `mentor=$eq:${session?.user._id}` })

  if (isLoading) return <div>Loading</div>

  return (
    <div>
      <h3 className="text-lg font-medium mb-5">Appointment Schedules Details</h3>

      <div className="grid grid-cols-3 gap-5">
        <div className="space-y-5">
          <div className="text-xs">
            Transaction ID: <span className="bg-gray-100 p-1">{data?.data?.transactionId}</span>
          </div>
          <img src={data?.data?.service?.image} alt="" className="border rounded-xl" />
          <div className="font-bold">
            <BiCategory className="inline mr-1 text-lg" /> {data?.data?.categoryDetails?.title}
          </div>
          <div className="font-bold">
            <BiCategory className="inline mr-1 text-lg" /> {data?.data?.topicDetails?.title}
          </div>
          <div className="font-bold">
            <HiLanguage className="inline mr-1 text-lg" /> {data?.data?.service?.languages.join(', ')}
          </div>
          <div className="font-bold text-primary">Student Details:</div>
          <div className="flex gap-2">
            <img src="https://source.unsplash.com/50x50/?portrait" alt="" className="rounded-full w-[50px]" />
            <div>
              <div className="font-bold ">
                {data?.data?.userDetails?.name?.firstName} {data?.data?.userDetails?.name?.lastName}
              </div>
              <div>{data?.data?.user?.email?.address}</div>
            </div>
          </div>
        </div>
        <div className="col-span-2 border-l-2 border-dashed px-10">
          <div className="p-3 bg-white rounded-2xl relative border-2 border-primary inline-block">
            <div className="text-xs my-2">Package: &nbsp; &nbsp; </div>
            <div className="text-xl font-medium">{data?.data?.hours} hr.</div>
            <div className="font-medium">${data?.data?.price}</div>
            <div className="text-xs my-2">Paid</div>
          </div>

          <div className="font-medium mt-5">
            <ServiceDate date={data?.data?.time} duration={data?.data?.hours} />
          </div>

          <div className="text-sm text-red-500 mt-5">
            Please note that you are responsible for sending the meeting link to the student&apos;s registered
            email address. Kindly ensure timely communication by sharing the link with the student. Your
            assistance is greatly appreciated.
          </div>
          <div className="text-xs mt-5 bg-gray-200 p-1 inline-block">{data?.data?.user?.email?.address}</div>
        </div>
      </div>
    </div>
  )
}

export default SingleAppointmentPage

SingleAppointmentPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
