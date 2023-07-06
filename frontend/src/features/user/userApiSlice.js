import { shopApi } from "../../App/api/shopApi";

const userApiAlice = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, limit }) => `/users?page=${page}&limit=${limit}`,
      providesTags: (result, error, arg) => {
        if(result?.data?.length){
          return [
            { type: "Users", id: "LIST" },
            ...result.data.map(({ _id }) => ({ type: "Users", id: _id })),
          ]
        }else return { type: "Users", id: "LIST" }
      },
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      transformResponse: (response) => response.data,
      providesTags: (result, error, arg) => [
        { type: "Users", id: "LIST" },
        { type: "Users", id: arg },
      ],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Users", id: "LIST" },
        { type: "Users", id: arg.id },
      ],
    }),
    updateUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Users", id: "LIST" }
      ],
    }),
    uploadProfile: builder.mutation({
      query: (image) => ({
        url: "/upload/profile",
        method: "POST",
        body: image,
      }),
      transformResponse: (response) => response.path,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUploadProfileMutation,
} = userApiAlice;
