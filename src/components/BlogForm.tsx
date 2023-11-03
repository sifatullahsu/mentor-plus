/* eslint-disable @typescript-eslint/no-explicit-any */
import { xContentStatus } from '@/global/constants'
import { useGetCategoriesQuery } from '@/redux/api/categoryApi'
import { useSession } from 'next-auth/react'
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
  const { data: session } = useSession()
  const { data: categories, isLoading } = useGetCategoriesQuery({ query: `limit:20` })

  const categoryField = categories?.data?.map((item: any) => ({ key: item._id, value: item.title }))

  const localFormHandler = (from: any) => {
    const title = from?.title?.value
    const slug = from?.slug?.value
    const content = from?.content?.value
    const image = from?.image?.value
    const category = from?.category?.value
    const status = from?.status?.value

    const result: any = {
      title,
      slug,
      content,
      image,
      category,
      status
    }

    if (!defaultValue) result['user'] = session?.user._id

    formHandler(result)
  }

  if (isLoading) return <div>Loading</div>

  return (
    <Form submitHandler={localFormHandler}>
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
