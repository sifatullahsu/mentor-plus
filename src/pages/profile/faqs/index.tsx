/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@/components/Table'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useDeletefaqMutation, useGetfaqsQuery } from '@/redux/api/faqApi'
import { NextLayout, iMeta, iTableData, iTableHeader } from '@/types'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'

const FaqsPage: NextLayout = () => {
  const [pagination, setPagination] = useState<Partial<iMeta>>({ page: 1 })

  const { data, isLoading } = useGetfaqsQuery({ query: `page=${pagination.page}&limit=20` })
  const [deleteItem] = useDeletefaqMutation()

  const tableHeader: iTableHeader = ['Title', 'Actons']

  const tableData: iTableData[] = data?.data?.map((item: any): iTableData => {
    const { _id, title } = item

    return {
      data: [_id, title],
      others: {
        viewLink: `/profile/faqs/${_id}`
      }
    }
  })

  const deleteHandler = async (id: string) => {
    const res = await deleteItem({ id }).unwrap()

    if (res.status) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-lg font-medium mb-5">Website Faqs</h3>
        <Link href={`/profile/faqs/create`} className="btn btn-primary btn-sm">
          Create FAQ
        </Link>
      </div>

      <Table
        tableHeader={tableHeader}
        tableData={tableData}
        isLoading={isLoading}
        deleteHandler={deleteHandler}
        meta={data?.meta}
        setPagination={setPagination}
      />
    </div>
  )
}

export default FaqsPage

FaqsPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
