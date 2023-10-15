/* eslint-disable @typescript-eslint/no-explicit-any */
import { iFormEvent } from '@/types'
import { ReactElement, ReactNode } from 'react'

type iProps = {
  children?: ReactElement | ReactNode
  submitHandler: (event: EventTarget) => void
}

const Form = ({ children, submitHandler }: iProps) => {
  const onSubmit = (event: iFormEvent) => {
    event.preventDefault()
    const form = event.target
    submitHandler(form)
  }

  return <form onSubmit={onSubmit}>{children}</form>
}

export default Form
