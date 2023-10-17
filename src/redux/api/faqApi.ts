import { tags } from '../tags'
import { baseApi } from './baseApi'

export const faqApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createfaq: build.mutation({
      query: ({ data }) => ({
        url: `/faqs`,
        method: 'POST',
        data: data
      }),
      invalidatesTags: [tags.faqs]
    }),
    getfaqs: build.query({
      query: ({ query }) => ({
        url: `/faqs?${query}`,
        method: 'GET'
      }),
      providesTags: [tags.faqs]
    }),
    getfaq: build.query({
      query: ({ id, query }) => ({
        url: `/faqs/${id}?${query}`,
        method: 'GET'
      }),
      providesTags: [tags.faqs]
    }),
    updatefaq: build.mutation({
      query: ({ id, data }) => ({
        url: `/faqs/${id}`,
        method: 'PATCH',
        data: data
      }),
      invalidatesTags: [tags.faqs]
    }),
    deletefaq: build.mutation({
      query: ({ id }) => ({
        url: `/faqs/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [tags.faqs]
    })
  })
})

export const {
  useCreatefaqMutation,
  useGetfaqsQuery,
  useGetfaqQuery,
  useUpdatefaqMutation,
  useDeletefaqMutation
} = faqApi
