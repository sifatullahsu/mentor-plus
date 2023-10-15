/* eslint-disable @typescript-eslint/no-explicit-any */
import securePayment from '@/assets/stripe.png'
import Form from '@/components/form/Form'
import SelectField from '@/components/form/SelectField'
import Authentication from '@/components/profile/Authentication'
import MainLayout from '@/layouts/MainLayout'
import { useGetServiceQuery } from '@/redux/api/serviceApi'
import { NextLayout } from '@/types'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { BsInfoLg } from 'react-icons/bs'
import { HiLanguage } from 'react-icons/hi2'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

const ServicesDetailsPage: NextLayout = () => {
  const { data: user } = useSession()
  const [selectedPackage, setSelectedPackage] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  // const [startDate, setStartDate] = useState(new Date())

  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState)
  }

  const handleBookNow = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [packageName, hours, price] = selectedPackage.split('_')

    if (!user) {
      toggleDrawer()
      return
    }

    const format: any = {
      expertise: service._id,
      user: user?.user._id,
      topic: selectedTopic,
      hours: parseInt(hours),
      price: parseInt(price),
      transactionId: new Date().toISOString()
    }

    console.log(format)
  }

  const { uid } = useRouter().query
  const { data, isLoading, isError } = useGetServiceQuery({ id: uid })

  if (isLoading || !data || !data?.status) return <div>Loading</div>
  if (isError) return <div>Error: somthing is wrong.</div>

  const service = data.data
  const topics = service.topics.map((item: any) => ({ key: item._id, value: item.title }))

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
        </div>
        <div>
          <div className="font-medium ">Book The Service Now</div>
          <Form submitHandler={handleBookNow}>
            <div className="text-gray-400 text-xs">Secure payment gateway</div>
            <SelectField
              name="topics"
              label="Select Topic"
              required={true}
              data={topics}
              onChange={setSelectedTopic}
            />
            {/* <DatePicker
              showIcon
              selected={startDate}
              onChange={date => setStartDate(date)}
              // icon={<AiOutlineUsergroupAdd className="inline mr-1 text-lg" />}
              dateFormat="MMMM d, yyyy h:mm aa"
              calendarClassName="w-full"
            /> */}
            <div className="grid grid-cols-3 gap-1 mt-5">
              {service?.packages.map((item: any, index: number) => {
                const packageKey = `Package ${index + 1}_${item.hours}_${item.price}`
                const isSelected = selectedPackage === packageKey

                return (
                  <div
                    key={item._id}
                    className={`p-3 bg-white rounded-2xl relative border-2 ${
                      isSelected ? 'border-primary' : ''
                    }`}
                  >
                    <div className="text-xs my-2">Package {index + 1}</div>
                    <div className="text-xl font-medium">{item.hours} hr.</div>
                    <div className="font-medium">${item.price}</div>
                    <div className="text-xs mt-2">click me</div>
                    <input
                      type="radio"
                      name="slot"
                      onChange={() => setSelectedPackage(packageKey)}
                      value={`${packageKey}`}
                      className="opacity-0 absolute inset-0"
                      checked={isSelected}
                    />
                  </div>
                )
              })}
            </div>
            <button
              className="btn btn-primary w-full mt-5"
              disabled={selectedPackage && selectedTopic ? false : true}
            >
              Book Now
            </button>
            <Image src={securePayment} alt="" className="w-8/12 mt-5" />
          </Form>

          {!user && (
            <Drawer
              open={isOpen}
              onClose={toggleDrawer}
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
