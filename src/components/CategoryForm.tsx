/* eslint-disable @typescript-eslint/no-explicit-any */

import Form from './form/Form'
import SubmitButton from './form/SubmitButton'
import TextField from './form/TextField'

type iProps = {
  formHandler: (data: any) => void
  defaultValue?: Record<string, any>
  submitButtonText?: string
}

const CategoryForm = ({ formHandler, defaultValue, submitButtonText = 'Submit' }: iProps) => {
  const localFormHandler = (from: any) => {
    const title = from?.title?.value
    const slug = from?.slug?.value

    const result = {
      title,
      slug
    }

    formHandler(result)
  }

  return (
    <Form submitHandler={localFormHandler}>
      <TextField label="Title" name="title" required={true} defaultValue={defaultValue?.title} />
      <TextField label="Slug (optional)" name="slug" defaultValue={defaultValue?.slug} />
      <SubmitButton title={submitButtonText} />
    </Form>
  )
}

export default CategoryForm
