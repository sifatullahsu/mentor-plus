/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from 'next-auth/react'
import { BsInfoLg } from 'react-icons/bs'
import Form from './form/Form'
import SelectField from './form/SelectField'
import SubmitButton from './form/SubmitButton'
import Authentication from './profile/Authentication'

const ServicePayment = ({ selectedPackage, serviceId, topicsIds }: any) => {
  const { data: user } = useSession()

  const [packageName, hours, price] = selectedPackage.split('_')

  topicsIds = topicsIds.map((item: any) => ({ key: item._id, value: item.title }))

  const formHandler = (data: any) => {
    const topic = data.topics.value

    const format: any = {
      expertise: serviceId,
      user: user?.user._id,
      topic,
      hours,
      price,
      transactionId: new Date().toISOString()
    }

    console.log(format)
  }

  if (!user) {
    return (
      <>
        <h3 className="text-lg font-medium">
          <BsInfoLg className="inline mr-1 text-2xl" /> Please Login to Proceed.
        </h3>
        <Authentication />
      </>
    )
  }

  return (
    <div>
      <Form submitHandler={formHandler}>
        <div className="flex">
          <div className={`p-3 bg-white rounded-2xl relative border-2 border-primary`}>
            <div className="text-xs my-2">{packageName}</div>
            <div className="text-xl font-medium">{hours} hr.</div>
            <div className="font-medium">${price}</div>
          </div>
        </div>
        <SelectField name="topics" label="Topics" required={true} data={topicsIds} />
        <SubmitButton title="Place Order" />
      </Form>
    </div>
  )
}

export default ServicePayment
