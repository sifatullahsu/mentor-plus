/* eslint-disable @typescript-eslint/no-explicit-any */

import { xRating } from '@/global/constants'
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

const ReviewForm = ({ formHandler, defaultValue, submitButtonText = 'Submit' }: iProps) => {
  const localFormHandler = (from: any) => {
    const title = from?.title?.value
    const description = from?.description?.value
    const rating = from?.rating?.value

    const result: any = {
      title,
      description,
      rating: parseInt(rating)
    }

    formHandler(result)
  }

  return (
    <Form submitHandler={localFormHandler}>
      <SelectField
        label="Rating"
        name="rating"
        data={xRating}
        required={true}
        defaultValue={defaultValue?.rating}
        disabled={defaultValue ? true : false}
      />
      <TextField
        label="Review Title"
        name="title"
        required={true}
        defaultValue={defaultValue?.title}
        disabled={defaultValue ? true : false}
      />
      <TextareaField
        label="Review Description"
        name="description"
        required={true}
        defaultValue={defaultValue?.description}
        disabled={defaultValue ? true : false}
      />
      <SubmitButton title={submitButtonText} disabled={defaultValue ? true : false} />
    </Form>
  )
}

export default ReviewForm
