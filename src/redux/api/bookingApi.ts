import { tags } from '../tags'
import { baseApi } from './baseApi'

export const bookingApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createbooking: build.mutation({
      query: ({ data }) => ({
        url: `/bookings`,
        method: 'POST',
        data: data
      }),
      invalidatesTags: [tags.bookings]
    }),
    getbookings: build.query({
      query: ({ query }) => ({
        url: `/bookings?${query}`,
        method: 'GET'
      }),
      providesTags: [tags.bookings]
    }),
    getbooking: build.query({
      query: ({ id, query }) => ({
        url: `/bookings/${id}?${query}`,
        method: 'GET'
      }),
      providesTags: [tags.bookings]
    }),
    updatebooking: build.mutation({
      query: ({ id, data }) => ({
        url: `/bookings/${id}`,
        method: 'PATCH',
        data: data
      }),
      invalidatesTags: [tags.bookings]
    }),
    deletebooking: build.mutation({
      query: ({ id }) => ({
        url: `/bookings/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [tags.bookings]
    })
  })
})

export const {
  useCreatebookingMutation,
  useGetbookingsQuery,
  useGetbookingQuery,
  useUpdatebookingMutation,
  useDeletebookingMutation
} = bookingApi
