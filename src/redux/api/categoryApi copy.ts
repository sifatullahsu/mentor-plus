import { tags } from '../tags'
import { baseApi } from './baseApi'

export const categoryApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createCategory: build.mutation({
      query: ({ data }) => ({
        url: `/categories`,
        method: 'POST',
        data: data
      }),
      invalidatesTags: [tags.categories]
    }),
    getCategories: build.query({
      query: ({ query }) => ({
        url: `/categories?${query}`,
        method: 'GET'
      }),
      providesTags: [tags.categories]
    }),
    getCategory: build.query({
      query: ({ id, query }) => ({
        url: `/categories/${id}?${query}`,
        method: 'GET'
      }),
      providesTags: [tags.categories]
    }),
    updateCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        data: data
      }),
      invalidatesTags: [tags.categories]
    }),
    deleteCategory: build.mutation({
      query: ({ id }) => ({
        url: `/categories/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [tags.categories]
    })
  })
})

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoryApi
