import { tags } from '../tags'
import { baseApi } from './baseApi'

export const topicApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createTopic: build.mutation({
      query: ({ data }) => ({
        url: `/topics`,
        method: 'POST',
        data: data
      }),
      invalidatesTags: [tags.topics]
    }),
    getTopics: build.query({
      query: ({ query }) => ({
        url: `/topics?${query}`,
        method: 'GET'
      }),
      providesTags: [tags.topics]
    }),
    getTopic: build.query({
      query: ({ id, query }) => ({
        url: `/topics/${id}?${query}`,
        method: 'GET'
      }),
      providesTags: [tags.topics]
    }),
    updateTopic: build.mutation({
      query: ({ id, data }) => ({
        url: `/topics/${id}`,
        method: 'PATCH',
        data: data
      }),
      invalidatesTags: [tags.topics]
    }),
    deleteTopic: build.mutation({
      query: ({ id }) => ({
        url: `/topics/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [tags.topics]
    })
  })
})

export const {
  useCreateTopicMutation,
  useGetTopicsQuery,
  useGetTopicQuery,
  useUpdateTopicMutation,
  useDeleteTopicMutation
} = topicApi
