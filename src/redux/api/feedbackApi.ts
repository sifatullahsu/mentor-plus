import { tags } from '../tags'
import { baseApi } from './baseApi'

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createFeedback: build.mutation({
      query: ({ data }) => ({
        url: `/feedbacks`,
        method: 'POST',
        data: data
      }),
      invalidatesTags: [tags.feedbacks]
    }),
    getFeedbacks: build.query({
      query: ({ query }) => ({
        url: `/feedbacks?${query}`,
        method: 'GET'
      }),
      providesTags: [tags.feedbacks]
    }),
    getFeedback: build.query({
      query: ({ id, query }) => ({
        url: `/feedbacks/${id}?${query}`,
        method: 'GET'
      }),
      providesTags: [tags.feedbacks]
    }),
    updateFeedback: build.mutation({
      query: ({ id, data }) => ({
        url: `/feedbacks/${id}`,
        method: 'PATCH',
        data: data
      }),
      invalidatesTags: [tags.feedbacks]
    }),
    deleteFeedback: build.mutation({
      query: ({ id }) => ({
        url: `/feedbacks/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [tags.feedbacks]
    })
  })
})

export const {
  useCreateFeedbackMutation,
  useGetFeedbacksQuery,
  useGetFeedbackQuery,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation
} = feedbackApi
