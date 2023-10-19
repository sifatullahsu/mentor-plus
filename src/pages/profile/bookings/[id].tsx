/* eslint-disable @typescript-eslint/no-explicit-any */
import ConfirmationModal from '@/components/ConfirmationModal'
import ReviewForm from '@/components/ReviewForm'
import ServiceDate from '@/components/ServiceDate'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetbookingQuery, useUpdatebookingMutation } from '@/redux/api/bookingApi'
import { useCreateReviewMutation, useGetReviewsQuery } from '@/redux/api/reviewApi'
import { NextLayout } from '@/types'
import getTime from '@/utils/getTime'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { BiCategory } from 'react-icons/bi'
import { HiLanguage } from 'react-icons/hi2'

const SingleBookingPage: NextLayout = () => {
  const { data: session } = useSession()
  const { id } = useRouter().query

  const [creatReview] = useCreateReviewMutation()
  const [updateBooking] = useUpdatebookingMutation()
  const { data, isLoading } = useGetbookingQuery({ id, query: `user=$eq:${session?.user._id}` })
  const { data: reviewData, isLoading: reviewLoading } = useGetReviewsQuery({
    query: `service=$eq:${id}&size=1`
  })

  const reviewFormHandler = async (reviewFieldsData: any) => {
    const finalData = {
      service: data?.data?.service?._id,
      user: data?.data?.user?._id,
      booking: data?.data?._id,
      ...reviewFieldsData
    }

    const res = await creatReview({ data: finalData }).unwrap()

    if (res.status) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  const [cancelBookingModal, setCancelBookingModal] = useState('')
  const cancelBookingHandler = async (id: string) => {
    const finalData = { status: 'canceled' }
    const res = await updateBooking({ id, data: finalData }).unwrap()

    if (res.status) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  if (isLoading || reviewLoading) return <div>Loading</div>

  const dateStatus = getTime(data?.data?.time, data?.data?.hours)

  return (
    <div>
      <h3 className="text-lg font-medium mb-5">Booking Details</h3>

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
          <div className="flex gap-2">
            <img src="https://source.unsplash.com/50x50/?portrait" alt="" className="rounded-full w-[50px]" />
            <div>
              <div className="font-bold ">
                {data?.data?.mentorDetails?.name?.firstName} {data?.data?.mentorDetails?.name?.lastName}
              </div>
              {data?.data?.mentor?.education.length > 0 && (
                <div>{data?.data?.mentor?.education[0].institute}</div>
              )}
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

          {data?.data?.status === 'canceled' ? (
            <div>
              <div className="mt-5 badge badge-error">Booking Canceled</div>
            </div>
          ) : (
            <div className="font-medium mt-5">
              <ServiceDate date={data?.data?.time} duration={data?.data?.hours} />
            </div>
          )}

          {data?.data?.status !== 'canceled' && dateStatus.status !== 'Past' && (
            <div className="mt-5">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => setCancelBookingModal(data?.data?._id)}
                disabled={data?.data?.status === 'canceled'}
              >
                Cancel Booking
              </button>
            </div>
          )}

          <div className="text-sm mt-5">
            Note: Please be advised that our mentor will send the meeting link to your registered email
            address. Kindly ensure to monitor your email inbox for further communication.
          </div>

          <div className=" mt-16">
            Thank you for choosing us.
            <br /> We are grateful for your trust and confidence.
          </div>

          {data?.data?.status !== 'canceled' && dateStatus.status === 'Past' && (
            <div>
              <div className="text-lg font-medium mt-10">Send Your Review.</div>
              <ReviewForm formHandler={reviewFormHandler} defaultValue={reviewData?.data[0]} />
            </div>
          )}

          {data?.data?.status !== 'canceled' && dateStatus.status !== 'Past' && (
            <p className="mt-10 text-red-500">
              When the status is &quot;Past&quot; you may provide a review.
            </p>
          )}

          <ConfirmationModal
            id="cancel_booking_modal"
            isOpen={cancelBookingModal}
            handleCloseModal={setCancelBookingModal}
            handleConfirmed={cancelBookingHandler}
            title="CANCEL BOOKING ALERT"
            description="Are you sure, Do you want to cancel the booking?"
            confirmButtonText="YES CANCEL"
          />
        </div>
      </div>
    </div>
  )
}

export default SingleBookingPage

SingleBookingPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
