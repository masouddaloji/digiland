//main api
import { shopApi } from "../../App/api/shopApi";

export const basketApiSlice = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getBasket: builder.query({
      query: () => "/basket",
      transformResponse: (response) => response.data,
      providesTags: (result, error, arg) =>  ["Basket"],
    }),
    addToBasket: builder.mutation({
      query: (id) => ({
        url: `/basket/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) =>  ["Basket"],
    }),
    emptyBasket: builder.mutation({
      query: () => ({
        url: "/basket",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => ["Basket"],
    }),
    removeItem: builder.mutation({
      query: (id) => ({
        url: `/basket/multi/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) =>  ["Basket"],
    }),
    incrementItem: builder.mutation({
      query: (id) => ({
        url: `/basket/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) =>  ["Basket"],
    }),
    decrementItem: builder.mutation({
      query: (id) => ({
        url: `/basket/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) =>  ["Basket"],
    }),
  }),
});
export const {
  useGetBasketQuery,
  useAddToBasketMutation,
  useIncrementItemMutation,
  useDecrementItemMutation,
  useEmptyBasketMutation,
  useRemoveItemMutation,
} = basketApiSlice;
