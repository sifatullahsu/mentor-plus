import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../axios/axiosBaseQuery'
import { tagsArray } from '../tags'

// const liveLink = `https://mentor-plus-server.vercel.app/api/v1`
const localLink = `http://localhost:5000/api/v1`

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: localLink }),
  endpoints: () => ({}),
  tagTypes: tagsArray
})
