import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (userData) => ({
        url: "user/create-admin",
        method: "POST",
        body: userData,
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
      }),
    }),
    getSingleUser: builder.query({
      query: (email) => ({
        url: `user/${email}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `user/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
