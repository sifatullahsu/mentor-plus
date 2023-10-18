/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@/components/Table'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '@/redux/api/categoryApi'
import { NextLayout, iTableData, iTableHeader } from '@/types'
import Link from 'next/link'
import toast from 'react-hot-toast'

const CategoriesPage: NextLayout = () => {
  const { data, isLoading } = useGetCategoriesQuery({})
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
      />
    </div>
  )
}

export default CategoriesPage

CategoriesPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
