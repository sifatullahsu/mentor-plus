/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@/components/Table'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetFeedbacksQuery } from '@/redux/api/feedbackApi'
import { NextLayout, iMeta, iTableData, iTableHeader } from '@/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

const FeedbacksPage: NextLayout = () => {
  const { data: session } = useSession()

  const [pagination, setPagination] = useState<Partial<iMeta>>({ page: 1 })
  const query = session?.user.role === 'admin' ? '' : `&user=$eq:${session?.user?._id}`

  const { data, isLoading } = useGetFeedbacksQuery({ query: `page=${pagination.page}&limit=20` + query })

  const tableHeader: iTableHeader = ['Title', 'Actons']

  const tableData: iTableData[] = data?.data?.map((item: any): iTableData => {
    const { _id, title } = item

    return {
      data: [_id, title],
      others: {
        viewLink: `/profile/feedbacks/${_id}`
      }
    }
  })

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-lg font-medium mb-5">Previous Feedbacks</h3>
        <Link href={`/profile/feedbacks/create`} className="btn btn-primary btn-sm">
          Give Feedback
        </Link>
      </div>
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

export default FeedbacksPage

FeedbacksPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
