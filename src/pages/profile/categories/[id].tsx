/* eslint-disable @typescript-eslint/no-explicit-any */
import CategoryForm from '@/components/CategoryForm'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetCategoryQuery, useUpdateCategoryMutation } from '@/redux/api/categoryApi'
import { NextLayout } from '@/types'

import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const EditCategoryPage: NextLayout = () => {
  const { id } = useRouter().query
  const { data, isLoading } = useGetCategoryQuery({ id })
  const [updateItem] = useUpdateCategoryMutation()

  const formHandler = async (data: any) => {
    const res = await updateItem({ id, data }).unwrap()

    if (res.status) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  if (isLoading) return <div>Loading</div>

  return (
    <div>
      <h3 className="text-lg font-medium">Edit Category</h3>
      <div>
        <CategoryForm
          formHandler={formHandler}
          submitButtonText="Update Category"
          defaultValue={data?.data}
        />
      </div>
    </div>
  )
}

export default EditCategoryPage

EditCategoryPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
