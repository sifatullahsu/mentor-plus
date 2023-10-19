/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@/components/Table'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetbookingsQuery } from '@/redux/api/bookingApi'
import { NextLayout, iMeta, iTableData, iTableHeader } from '@/types'
import getTime from '@/utils/getTime'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const BookingPage: NextLayout = () => {
  const { data: session } = useSession()

  const [pagination, setPagination] = useState<Partial<iMeta>>({ page: 1 })
  const query = session?.user.role === 'admin' ? '' : `&user=$eq:${session?.user?._id}`

  const { data, isLoading } = useGetbookingsQuery({ query: `page=${pagination.page}&size=20` + query })

  const tableHeader: iTableHeader = ['Mentor Name', 'Time', 'Hours', 'Price', 'Status', 'Actons']

  const tableData: iTableData[] = data?.data?.map((item: any): iTableData => {
    const _id = item._id
    const mentorName = item.mentorDetails.name.firstName + ' ' + item.mentorDetails.name.lastName
    const time = item.time
    const hours = item.hours + ' hr'
    const price = '$' + item.price
    let { status } = getTime(item.time, item.hours)
    status = item.status === 'canceled' ? item.status : status

    return {
      data: [_id, mentorName, time, hours, price, status],
      others: {
        viewLink: `/profile/bookings/${_id}`,
        editLink: ''
      }
    }
  })

  return (
    <div>
      <h3 className="text-lg font-medium mb-5">My Bookings</h3>
      <Table
        tableHeader={tableHeader}
        tableData={tableData}
        isLoading={isLoading}
        meta={data?.meta}
        setPagination={setPagination}
      />
    </div>
  )
}

export default BookingPage

BookingPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
