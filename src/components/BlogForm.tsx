/* eslint-disable @typescript-eslint/no-explicit-any */
import { xContentStatus } from '@/global/constants'
import { useGetCategoriesQuery } from '@/redux/api/categoryApi'

import Form from './form/Form'
import SelectField from './form/SelectField'
import SubmitButton from './form/SubmitButton'
import TextField from './form/TextField'
import TextareaField from './form/TextareaField'

type iProps = {
  formHandler: (data: any) => void
  defaultValue?: Record<string, any>
  submitButtonText?: string
}

const BlogForm = ({ formHandler, defaultValue, submitButtonText = 'Submit' }: iProps) => {
  const { data: categories, isLoading } = useGetCategoriesQuery({ query: `size:20` })

  const categoryField = categories?.data?.map((item: any) => ({ key: item._id, value: item.title }))

  if (isLoading) return <div>Loading</div>

  return (
    <Form submitHandler={formHandler}>
      <TextField label="Title" name="title" required={true} defaultValue={defaultValue?.title} />
      <TextField label="Slug (optional)" name="slug" defaultValue={defaultValue?.slug} />
      <TextareaField label="Content" name="content" required={true} defaultValue={defaultValue?.content} />
      <TextField label="Image" name="image" required={true} defaultValue={defaultValue?.image} />
      <SelectField
        label="Category"
        name="category"
        data={categoryField}
        required={true}
        defaultValue={defaultValue?.category}
      />
      <SelectField
        label="Status"
        name="status"
        data={xContentStatus}
        required={true}
        defaultValue={defaultValue ? (defaultValue?.status as string) : 'published'}
      />
      <SubmitButton title={submitButtonText} />
    </Form>
  )
}

export default BlogForm
