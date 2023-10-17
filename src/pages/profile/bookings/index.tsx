/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@/components/Table'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetbookingsQuery } from '@/redux/api/bookingApi'
import { NextLayout } from '@/types'
import { useSession } from 'next-auth/react'

const BookingPage: NextLayout = () => {
  const { data: session } = useSession()
  const { data, isLoading } = useGetbookingsQuery({ query: `user=$eq:${session?.user?._id}` })

  const tableHeader: string[] = ['Mentor Name', 'Time', 'Hours', 'Price', 'Actons']

  const tableData: string[][] = data?.data?.map((item: any) => {
    const _id = item._id
    const mentorName = item.mentorDetails.name.firstName + ' ' + item.mentorDetails.name.lastName
    const time = item.time
    const hours = item.hours + ' hr'
    const price = '$' + item.price

    return [_id, mentorName, time, hours, price]
  })

  const deleteHandler = (id: string) => {
    console.log(id)
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-5">My Bookings</h3>
      <Table
        tableHeader={tableHeader}
        tableData={tableData}
        url="/profile/bookings"
        deleteHandler={deleteHandler}
        isLoading={isLoading}
      />
    </div>
  )
}

export default BookingPage

BookingPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
