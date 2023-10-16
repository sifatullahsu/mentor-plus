import { baseApi } from './baseApi'

export const bookingApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createbooking: build.mutation({
      query: ({ data }) => ({
        url: `/bookings`,
        method: 'POST',
        data: data
      })
    }),
    getbookings: build.query({
      query: ({ query }) => ({
        url: `/bookings?${query}`,
        method: 'GET'
      })
    }),
    getbooking: build.query({
      query: ({ id, query }) => ({
        url: `/bookings/${id}?${query}`,
        method: 'GET'
      })
    }),
    updatebooking: build.mutation({
      query: ({ id, data }) => ({
        url: `/bookings/${id}`,
        method: 'PATCH',
        data: data
      })
    }),
    deletebooking: build.mutation({
      query: ({ id }) => ({
        url: `/bookings/${id}`,
        method: 'DELETE'
      })
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
