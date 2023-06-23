//main api
import { shopApi } from "../../App/api/shopApi";
const orderApiSlice = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: ({ page, limit }) => `/orders?page=${page}&limit=${limit}`,
      providesTags: (result, error, arg) => {
        if (result?.data?.length) {
          return [
            { type: "Order", id: "LIST" },
            ...result.data.map(({ _id }) => ({ type: "Order", id: _id })),
          ];
        } else return [{ type: "Order", id: "LIST" }];
      },
    }),
    getOrders: builder.query({
      query: (id) => `/users/my-orders/${id}`,
      transformResponse: (response) => console.log("response", response),
    }),
    removeOrderByUser: builder.mutation({
      query: (oId) => ({
        url: `/users/orders/${oId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Users", id: "LIST" },
        { type: "Order", id: "LIST" },
      ],
    }),
    changeStatusOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Order", id: "LIST" },
        { type: "Order", id: arg?.orderId },
      ],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrdersQuery,
  useRemoveOrderByUserMutation,
  useChangeStatusOrderMutation,
} = orderApiSlice;
