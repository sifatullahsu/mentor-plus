/* eslint-disable @typescript-eslint/no-explicit-any */

import Form from './form/Form'
import SubmitButton from './form/SubmitButton'
import TextField from './form/TextField'
import TextareaField from './form/TextareaField'

type iProps = {
  formHandler: (data: any) => void
  defaultValue?: Record<string, any>
  submitButtonText?: string
}

const FaqForm = ({ formHandler, defaultValue, submitButtonText = 'Submit' }: iProps) => {
  const localFormHandler = (from: any) => {
    const title = from?.title?.value
    const description = from?.description?.value

    const result = {
      title,
      description
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

export default FaqForm
