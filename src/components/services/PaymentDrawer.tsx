/* eslint-disable @typescript-eslint/no-explicit-any */
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Dispatch } from 'react'
import { FaRegCreditCard } from 'react-icons/fa'
import Drawer from 'react-modern-drawer'
import SrtipeCheckout from './SrtipeCheckout'

const PaymentDrawer = ({
  isOpen,
  setIsOpen,
  data
}: {
  isOpen: boolean
  setIsOpen: Dispatch<React.SetStateAction<boolean>>
  data: Record<string, any> | null
}) => {
  if (!data) return <div></div>

  return (
    <Elements
      stripe={loadStripe(data.paymentIntent.publishableKey)}
      options={{ clientSecret: data.paymentIntent.clientSecret }}
    >
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(prevState => !prevState)}
        direction="right"
        className="!w-[300px] md:!w-[600px]"
        overlayOpacity={0.9}
        style={{ overflowY: 'auto' }}
      >
        <div className="p-5 md:p-10">
          <h3 className="text-sm font-medium mb-6">
            <FaRegCreditCard className="inline mr-1 text-2xl mb-1" /> Proceed to payment
          </h3>
          <SrtipeCheckout data={data} />
        </div>
      </Drawer>
    </Elements>
  )
}

export default PaymentDrawer
