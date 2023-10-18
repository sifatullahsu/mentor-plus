/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetCategoriesQuery } from '@/redux/api/categoryApi'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Form from './form/Form'
import MultiSelect from './form/MultiSelect'
import SubmitButton from './form/SubmitButton'
import TextField from './form/TextField'

type iProps = {
  formHandler: (data: any) => void
  defaultValue?: Record<string, any>
  submitButtonText?: string
}

const TopicForm = ({ formHandler, defaultValue, submitButtonText = 'Submit' }: iProps) => {
  const defaultCategory = defaultValue?.category
    ? [
        {
          key: defaultValue?.category?._id,
          value: defaultValue?.category?.title
        }
      ]
    : []

  const [category, setCategory] = useState(defaultCategory)
  const { data, isLoading } = useGetCategoriesQuery({ query: `size:20` })
  const categoryField = data?.data?.map((item: any) => ({ key: item._id, value: item.title }))

  const localFormHandler = (from: any) => {
    const title = from?.title?.value
    const slug = from?.slug?.value
    const categoryItem = category[0]?.key

    if (!categoryItem) {
      toast.error('Category is required.')
      return
    }

    const result = {
      title,
      slug,
      category: categoryItem
    }

    formHandler(result)
  }

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <Form submitHandler={localFormHandler}>
      <TextField label="Title" name="title" required={true} defaultValue={defaultValue?.title} />
      <TextField label="Slug (optional)" name="slug" defaultValue={defaultValue?.slug} />
      <MultiSelect
        label="Category"
        data={categoryField}
        defaultValue={category}
        onChange={setCategory}
        selectionLimit={1}
      />
      <SubmitButton title={submitButtonText} />
    </Form>
  )
}

export default TopicForm
