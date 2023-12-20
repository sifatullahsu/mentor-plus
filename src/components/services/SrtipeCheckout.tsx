/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreatebookingMutation } from '@/redux/api/bookingApi'
import { iFormEvent } from '@/types'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import SubmitButton from '../form/SubmitButton'

const SrtipeCheckout = ({ data }: { data: Record<string, any> }) => {
  const stripe = useStripe()
  const elements = useElements()

  const [isConfirm, setIsConfirm] = useState(false)
  const [createBooking, { isLoading }] = useCreatebookingMutation()

  const bookingHandler = async (event: iFormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) return

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: '',
        payment_method_data: {
          billing_details: {
            name: '',
            email: ''
          }
        }
      },
      redirect: 'if_required'
    })

    if (error) {
      toast.error(`${error.message}`)
      return console.log(error)
    }

    const res = await createBooking({
      data: { ...data.data, transactionId: paymentIntent.id }
    }).unwrap()

    if (res.status) {
      toast.success(res.message)
      setIsConfirm(true)
    } else {
      toast.error(res.message)
    }
  }

  if (isConfirm) {
    return (
      <>
        <div>You have successfully placed the order.</div>
        <Link href={`/profile/bookings`} className="btn btn-primary btn-sm mt-5">
          View Bookings
        </Link>
      </>
    )
  }

  return (
    <form onSubmit={bookingHandler}>
      <PaymentElement />
      <SubmitButton title={'Confirm Payment'} disabled={!stripe} isLoading={isLoading} />
    </form>
  )
}

export default SrtipeCheckout
