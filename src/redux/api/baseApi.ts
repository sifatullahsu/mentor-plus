import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../axios/axiosBaseQuery'
import { tagsArray } from '../tags'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
  endpoints: () => ({}),
  tagTypes: tagsArray
})
