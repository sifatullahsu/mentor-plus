import { baseApi } from './baseApi'

export const blogApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createBlog: build.mutation({
      query: ({ data }) => ({
        url: `/blogs`,
        method: 'POST',
        data: data
      })
    }),
    getBlogs: build.query({
      query: ({ query }) => ({
        url: `/blogs?${query}`,
        method: 'GET'
      })
    }),
    getBlog: build.query({
      query: ({ id, query }) => ({
        url: `/blogs/${id}${query && '?' + query}`,
        method: 'GET'
      })
    }),
    updateBlog: build.mutation({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: 'PATCH',
        data: data
      })
    }),
    deleteBlog: build.mutation({
      query: ({ id }) => ({
        url: `/blogs/${id}`,
        method: 'DELETE'
      })
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
