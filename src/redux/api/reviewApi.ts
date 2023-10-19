import { tags } from '../tags'
import { baseApi } from './baseApi'

export const reviewApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createReview: build.mutation({
      query: ({ data }) => ({
        url: `/reviews`,
        method: 'POST',
        data: data
      }),
      invalidatesTags: [tags.reviews]
    }),
    getReviews: build.query({
      query: ({ query }) => ({
        url: `/reviews?${query}`,
        method: 'GET'
      }),
      providesTags: [tags.reviews]
    }),
    getReview: build.query({
      query: ({ id, query }) => ({
        url: `/reviews/${id}?${query}`,
        method: 'GET'
      }),
      providesTags: [tags.reviews]
    }),
    updateReview: build.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: 'PATCH',
        data: data
      }),
      invalidatesTags: [tags.reviews]
    }),
    deleteReview: build.mutation({
      query: ({ id }) => ({
        url: `/reviews/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [tags.reviews]
    })
  })
})

export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
  useGetReviewQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation
} = reviewApi
