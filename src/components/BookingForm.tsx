/* eslint-disable @typescript-eslint/no-explicit-any */
import securePayment from '@/assets/stripe.png'
import { useCreatePaymentIntentMutation } from '@/redux/api/bookingApi'
import { addDays, setHoursAndMinutes } from '@/utils/dateFunctions'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import Form from './form/Form'
import SelectField from './form/SelectField'
import SubmitButton from './form/SubmitButton'
import LoginDrawer from './services/LoginDrawer'
import PaymentDrawer from './services/PaymentDrawer'

type iBookingState = {
  package: null | string
  topic: null | string
  time: null | Date
}

type iProps = {
  data: {
    serviceId: string
    topics: Record<string, any>
    packages: Record<string, any>
    excludeTimes?: Date[]
  }
  submitButtonText?: string
}

const BookingForm = ({ data, submitButtonText = 'Submit' }: iProps) => {
  const { data: user } = useSession()

  const [loginDrawer, setLoginDrawer] = useState(false)
  const [paymentDrawer, setPaymentDrawer] = useState(false)
  const [paymentData, setPaymentData] = useState<Record<string, any> | null>(null)
  const [bookingState, setBookingState] = useState<iBookingState>({
    package: null,
    topic: null,
    time: null
  })

  const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation()

  const bookingHandler = async (formData: any) => {
    if (!user) return setLoginDrawer(prevState => !prevState)

    const [, hours, price] = formData.package.split('_')

    const res = await createPaymentIntent({ data: { price } }).unwrap()

    const finalData = {
      data: {
        service: data.serviceId,
        topic: formData.topic,
        user: user?.user._id,
        price: parseInt(price),
        hours: parseInt(hours),
        time: formData.time.toISOString(),
        transactionId: new Date().toISOString()
      },
      paymentIntent: res.data
    }
    setPaymentData(finalData)
    setPaymentDrawer(prevState => !prevState)
  }

  return (
    <>
      <Form submitHandler={() => bookingHandler(bookingState)}>
        <div className="font-medium ">Book The Service Now</div>
        <div className="text-gray-400 text-xs">Secure payment gateway</div>
        <SelectField
          name="topic"
          label="Select Topic"
          required={true}
          data={data?.topics?.map((item: any) => ({ key: item._id, value: item.title }))}
          onChange={e => setBookingState({ ...bookingState, topic: e })}
        />
        <div className="form-control">
          <ReactDatePicker
            name="date_time"
            selected={bookingState.time}
            onChange={e => setBookingState({ ...bookingState, time: e })}
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
            className=" mt-5 !pl-8 select"
            placeholderText="Select Date & Time Slot"
            showIcon
            icon={<AiOutlineUsergroupAdd className="inline mt-7 text-lg" />}
          />
        </div>
        <div className="grid grid-cols-3 gap-1 mt-5">
          {data?.packages?.map((item: any, index: number) => {
            const packageKey = `Package ${index + 1}_${item.hours}_${item.price}`
            const isSelected = bookingState.package === packageKey

            return (
              <div key={item._id} className="relative">
                <div className={`p-3 bg-white rounded-2xl border-2 ${isSelected ? 'border-primary' : ''}`}>
                  <div className="text-xs my-2">Package {index + 1}</div>
                  <div className="text-xl font-medium">{item.hours} hr.</div>
                  <div className="font-medium">${item.price}</div>
                  <div className="text-xs mt-2">click me</div>
                  <input
                    type="radio"
                    name="slot"
                    onChange={() => setBookingState({ ...bookingState, package: packageKey })}
                    value={`${packageKey}`}
                    className="opacity-0 absolute inset-0 z-30 w-full h-full"
                    checked={isSelected}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <SubmitButton
          title={submitButtonText}
          disabled={bookingState.package && bookingState.time && bookingState.topic ? false : true}
          isLoading={isLoading}
        />
        <Image src={securePayment} alt="" className="w-8/12 max-w-xs mt-5" />
      </Form>
      {user ? (
        <PaymentDrawer data={paymentData} isOpen={paymentDrawer} setIsOpen={setPaymentDrawer} />
      ) : (
        <LoginDrawer isOpen={loginDrawer} setIsOpen={setLoginDrawer} />
      )}
    </>
  )
}

export default BookingForm
