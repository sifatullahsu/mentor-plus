/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@/components/Table'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useDeleteServiceMutation, useGetServicesQuery } from '@/redux/api/serviceApi'
import { NextLayout, iTableData, iTableHeader } from '@/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import toast from 'react-hot-toast'

const ServicesPage: NextLayout = () => {
  const { data: session } = useSession()
  const { data, isLoading } = useGetServicesQuery({ query: `mentor=$eq:${session?.user?._id}` })
  const [deleteService] = useDeleteServiceMutation()

  const tableHeader: iTableHeader = ['Title', 'Category', 'Prices', 'Status', 'Actons']

  const tableData: iTableData[] = data?.data?.map((item: any): iTableData => {
    const {
      _id,
      uid,
      title,
      category: { title: catTitle },
      packages,
      status
    } = item

    const prices = packages.map((i: any) => '$' + i.price).join(' | ')

    return {
      data: [_id, title, catTitle, prices, status],
      others: {
        viewLink: `/services/${uid}`,
        editLink: `/profile/services/${_id}`
      }
    }
  })

  const deleteHandler = async (id: string) => {
    const res = await deleteService({ id }).unwrap()

    if (res.status) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-lg font-medium mb-5">My Services</h3>
        <Link href={`/profile/services/create`} className="btn btn-primary btn-sm">
          Create Service
        </Link>
      </div>
      <Table
        tableHeader={tableHeader}
        tableData={tableData}
        deleteHandler={deleteHandler}
        isLoading={isLoading}
      />
    </div>
  )
}

export default ServicesPage

ServicesPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
