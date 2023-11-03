/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@/components/Table'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '@/redux/api/categoryApi'
import { NextLayout, iMeta, iTableData, iTableHeader } from '@/types'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'

const CategoriesPage: NextLayout = () => {
  const [pagination, setPagination] = useState<Partial<iMeta>>({ page: 1 })

  const { data, isLoading } = useGetCategoriesQuery({ query: `page=${pagination.page}&limit=20` })
  const [deleteCategory] = useDeleteCategoryMutation()

  const tableHeader: iTableHeader = ['Title', 'Actons']

  const tableData: iTableData[] = data?.data?.map((item: any): iTableData => {
    const { _id, title } = item

    return {
      data: [_id, title],
      others: {
        editLink: `/profile/categories/${_id}`
      }
    }
  })

  const deleteHandler = async (id: string) => {
    const res = await deleteCategory({ id }).unwrap()

    if (res.status) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-lg font-medium mb-5">Categories</h3>
        <Link href={`/profile/categories/create`} className="btn btn-primary btn-sm">
          Create Category
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

export default CategoriesPage

CategoriesPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
