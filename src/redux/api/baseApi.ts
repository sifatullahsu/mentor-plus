import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../axios/axiosBaseQuery'
import { tagsArray } from '../tags'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: `https://mentor-plus-server.vercel.app/api/v1` }),
  endpoints: () => ({}),
  tagTypes: tagsArray
})
