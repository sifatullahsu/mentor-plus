/* eslint-disable @typescript-eslint/no-explicit-any */
import ServiceForm from '@/components/ServiceForm'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useCreateServiceMutation } from '@/redux/api/serviceApi'
import { NextLayout } from '@/types'
import toast from 'react-hot-toast'

const CreateServicePage: NextLayout = () => {
  const [creatService] = useCreateServiceMutation()

  const formHandler = async (data: any) => {
    const res = await creatService({ data }).unwrap()

    if (res.status) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium">Create Service</h3>
      <div>
        <ServiceForm formHandler={formHandler} submitButtonText="Create Blog Post" />
      </div>
    </div>
  )
}

export default CreateServicePage

CreateServicePage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
