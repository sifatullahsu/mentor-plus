import { baseApi } from './baseApi'

export const serviceApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createService: build.mutation({
      query: ({ data }) => ({
        url: `/services`,
        method: 'POST',
        data: data
      })
    }),
    getServices: build.query({
      query: ({ query }) => ({
        url: `/services?${query}`,
        method: 'GET'
      })
    }),
    getService: build.query({
      query: ({ id, query }) => ({
        url: `/services/${id}?${query}`,
        method: 'GET'
      })
    }),
    updateService: build.mutation({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: 'PATCH',
        data: data
      })
    }),
    deleteService: build.mutation({
      query: ({ id }) => ({
        url: `/services/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useCreateServiceMutation,
  useGetServicesQuery,
  useGetServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation
} = serviceApi
