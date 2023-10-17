import { baseApi } from './baseApi'

export const blogApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createBlog: build.mutation({
      query: ({ data }) => ({
        url: `/blogs`,
        method: 'POST',
        data: data
      }),
      invalidatesTags: ['blogs']
    }),
    getBlogs: build.query({
      query: ({ query }) => ({
        url: `/blogs?${query}`,
        method: 'GET'
      }),
      providesTags: ['blogs']
    }),
    getBlog: build.query({
      query: ({ id, query }) => ({
        url: `/blogs/${id}${query && '?' + query}`,
        method: 'GET'
      }),
      providesTags: ['blogs']
    }),
    updateBlog: build.mutation({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: 'PATCH',
        data: data
      }),
      invalidatesTags: ['blogs']
    }),
    deleteBlog: build.mutation({
      query: ({ id }) => ({
        url: `/blogs/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['blogs']
    })
  })
})

export const {
  useCreateBlogMutation,
  useGetBlogsQuery,
  useGetBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation
} = blogApi
