import { tags } from '../tags'
import { baseApi } from './baseApi'

export const serviceApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createService: build.mutation({
      query: ({ data }) => ({
        url: `/services`,
        method: 'POST',
        data: data
      }),
      invalidatesTags: [tags.services]
    }),
    getServices: build.query({
      query: ({ query }) => ({
        url: `/services?${query}`,
        method: 'GET'
      }),
      providesTags: [tags.services]
    }),
    getServicesWithSearch: build.query({
      query: ({ query }) => ({
        url: `/services/search?${query}`,
        method: 'GET'
      }),
      providesTags: [tags.services]
    }),
    getService: build.query({
      query: ({ id, query }) => ({
        url: `/services/${id}?${query}`,
        method: 'GET'
      }),
      providesTags: [tags.services]
    }),
    updateService: build.mutation({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: 'PATCH',
        data: data
      }),
      invalidatesTags: [tags.services]
    }),
    deleteService: build.mutation({
      query: ({ id }) => ({
        url: `/services/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [tags.services]
    })
  })
})

export const {
  useCreateServiceMutation,
  useGetServicesQuery,
  useGetServiceQuery,
  useGetServicesWithSearchQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation
} = serviceApi
