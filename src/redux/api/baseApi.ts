import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../axios/axiosBaseQuery'
import { tagsArray } from '../tags'

const server = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: server }),
  endpoints: () => ({}),
  tagTypes: tagsArray
})
