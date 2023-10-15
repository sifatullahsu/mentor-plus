import { baseApi } from './baseApi'

const usersApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createUser: build.mutation({
      query: ({ data }) => ({
        url: `/users`,
        method: 'POST',
        data: data
      })
    }),
    getUsers: build.query({
      query: ({ query }) => ({
        url: `/users?${query}`,
        method: 'GET'
      })
    }),
    getUser: build.query({
      query: ({ id, query }) => ({
        url: `/users/${id}?${query}`,
        method: 'GET'
      })
    }),
    updateUser: build.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        data: data
      })
    }),
    deleteUser: build.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = usersApi
