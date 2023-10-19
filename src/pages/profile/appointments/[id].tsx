import ConfirmationModal from '@/components/ConfirmationModal'
import ServiceDate from '@/components/ServiceDate'
import Form from '@/components/form/Form'
import SubmitButton from '@/components/form/SubmitButton'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetbookingQuery, useUpdatebookingMutation } from '@/redux/api/bookingApi'
import { NextLayout } from '@/types'
import { addDays, setHoursAndMinutes } from '@/utils/dateFunctions'
import getTime from '@/utils/getTime'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { HiLanguage } from 'react-icons/hi2'

const SingleAppointmentPage: NextLayout = () => {
  const { data: session } = useSession()
  const { id } = useRouter().query

  const { data, isLoading } = useGetbookingQuery({ id, query: `mentor=$eq:${session?.user._id}` })
  const [updateBooking] = useUpdatebookingMutation()

  const [rescheduleBooking, setRescheduleBooking] = useState<{ time: null | Date }>({ time: null })
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
  const rescheduleBookingHandler = async () => {
    const finalData = { time: rescheduleBooking.time?.toISOString() }
    const res = await updateBooking({ id, data: finalData }).unwrap()

    if (res.status) {
      toast.success('Booking Recheduled Completed.')
    } else {
      toast.error(res.message)
    }
  }

  if (isLoading) return <div>Loading</div>

  const dateStatus = getTime(data?.data?.time, data?.data?.hours)

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
            <>
              <div className="mt-5">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => setCancelBookingModal(data?.data?._id)}
                  disabled={data?.data?.status === 'canceled'}
                >
                  Cancel Booking
                </button>
              </div>
              <Form submitHandler={rescheduleBookingHandler}>
                <div className="p-5 border mt-5">
                  <div className="form-control">
                    <label>
                      <span>Want to reschedule?</span>
                    </label>
                    <ReactDatePicker
                      name="date_time"
                      selected={rescheduleBooking?.time}
                      onChange={e => setRescheduleBooking({ ...rescheduleBooking, time: e })}
                      showTimeSelect
                      timeIntervals={60}
                      minDate={new Date()}
                      maxDate={addDays(new Date(), 6)}
                      minTime={setHoursAndMinutes(new Date(), 6, 0)}
                      maxTime={setHoursAndMinutes(new Date(), 22, 0)}
                      excludeTimes={[
                        setHoursAndMinutes(new Date(), 13, 0),
                        setHoursAndMinutes(new Date(), 14, 0),
                        setHoursAndMinutes(new Date(), 15, 0),
                        setHoursAndMinutes(new Date(), 16, 0),
                        setHoursAndMinutes(new Date(), 17, 0)
                      ]}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="!pl-8 select"
                      placeholderText="Select Date & Time Slot"
                      showIcon
                      icon={<AiOutlineUsergroupAdd className="inline mt-2 text-lg" />}
                    />
                  </div>
                  <SubmitButton title="Reschedule" />
                </div>
              </Form>
            </>
          )}

          <div className="text-sm text-red-500 mt-5">
            Please note that you are responsible for sending the meeting link to the student&apos;s registered
            email address. Kindly ensure timely communication by sharing the link with the student. Your
            assistance is greatly appreciated.
          </div>
          <div className="text-xs mt-5 bg-gray-200 p-1 inline-block">{data?.data?.user?.email?.address}</div>

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

export default SingleAppointmentPage

SingleAppointmentPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
