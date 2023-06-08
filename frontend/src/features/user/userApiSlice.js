import { shopApi } from "../../App/api/shopApi";

const userApiAlice = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, limit }) => `/users?page=${page}&limit=${limit}`,
      providesTags: (result, error, arg) => [
        { type: "Users", id: "LIST" },
        ...result.data.map(({ _id }) => ({ type: "Users", id: _id })),
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
  }),
});

export const { useGetUsersQuery,useDeleteUserMutation } = userApiAlice;
