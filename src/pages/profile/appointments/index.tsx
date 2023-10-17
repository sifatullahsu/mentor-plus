/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@/components/Table'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetbookingsQuery } from '@/redux/api/bookingApi'
import { NextLayout, iTableData, iTableHeader } from '@/types'
import { useSession } from 'next-auth/react'

const AppointmentsPage: NextLayout = () => {
  const { data: session } = useSession()
  const { data, isLoading } = useGetbookingsQuery({ query: `mentor=$eq:${session?.user?._id}` })

  const tableHeader: iTableHeader = ['Learner Name', 'Time', 'Hours', 'Price', 'Actons']

  const tableData: iTableData[] = data?.data?.map((item: any): iTableData => {
    const _id = item._id
    const learnerName = item.userDetails.name.firstName + ' ' + item.userDetails.name.lastName
    const time = item.time
    const hours = item.hours + ' hr'
    const price = '$' + item.price

    return {
      data: [_id, learnerName, time, hours, price],
      others: {
        viewLink: `/profile/appointments/${_id}`,
        editLink: ''
      }
    }
  })

  return (
    <div>
      <h3 className="text-lg font-medium mb-5">My Appointment Schedules</h3>
      <Table tableHeader={tableHeader} tableData={tableData} isLoading={isLoading} />
    </div>
  )
}

export default AppointmentsPage

AppointmentsPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
