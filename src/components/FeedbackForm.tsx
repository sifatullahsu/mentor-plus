/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSession } from 'next-auth/react'
import Form from './form/Form'
import SubmitButton from './form/SubmitButton'
import TextField from './form/TextField'
import TextareaField from './form/TextareaField'

type iProps = {
  formHandler: (data: any) => void
  defaultValue?: Record<string, any>
  submitButtonText?: string
}

const FeedbackForm = ({ formHandler, defaultValue, submitButtonText = 'Submit' }: iProps) => {
  const { data: session } = useSession()

  const localFormHandler = (from: any) => {
    const title = from?.title?.value
    const description = from?.description?.value

    const result = {
      title,
      description,
      user: session?.user._id
    }

    formHandler(result)
  }

  return (
    <Form submitHandler={localFormHandler}>
      <TextField label="Title" name="title" required={true} defaultValue={defaultValue?.title} />
      <TextareaField
        label="Description"
        name="description"
        required={true}
        defaultValue={defaultValue?.description}
      />
      <SubmitButton title={submitButtonText} />
    </Form>
  )
}

export default FeedbackForm
