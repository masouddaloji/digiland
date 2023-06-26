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
      query: (id) => `/users/my-orders/${id}?page=1&limit=100`,
      transformResponse: (response) => response.data,
      providesTags: (result, error, arg) => {
        if (result?.length) {
          return [
            { type: "Order", id: "LIST" },
            ...result.map(({ _id }) => ({ type: "Order", id: _id })),
          ];
        } else return [{ type: "Order", id: "LIST" }];
      },
    }),
    addToOrder: builder.mutation({
      query: (id) => ({
        url: "/users/order",
        method: "POST",
        body: { productId:id, status:"pending" },
      }),
      invalidatesTags: (result, error, arg) => [{type:"Order",id:"LIST"},{ type: "Basket", id: "LIST" }],
    }),
    removeOrderByUser: builder.mutation({
      query: (oId) => ({
        url: `/users/orders/${oId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Order", id: "LIST" },
        { type: "Users", id: "LIST" },
      ],
    }),
    changeStatusOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "PUT",
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
  useAddToOrderMutation,
  useRemoveOrderByUserMutation,
  useChangeStatusOrderMutation,
} = orderApiSlice;
