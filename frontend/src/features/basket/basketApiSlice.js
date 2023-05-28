//main api
import { shopApi } from "../../App/api/shopApi";

export const basketApiSlice = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getBasket: builder.query({
      query: () => "/basket",
      transformResponse: (response) => response.data,
      providesTags: (result, error, arg) => {
        if (result?.cartItems) {
          return [
            { type: "Basket", id: "LIST" },
            ...result.cartItems?.map(({ _id }) => ({
              type: "Basket",
              id: _id,
            }))
          ];
        }
        return [{ type: "Basket", id: "LIST" }];
      },
    }),
    addToBasket: builder.mutation({
      query: (id) => ({
        url: `/basket/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Basket", id: "LIST" },{type: "Basket", id: arg.id}],
    }),
    emptyBasket: builder.mutation({
      query: () => ({
        url: "/basket",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Basket", id: "LIST" }],
    }),
    removeItem: builder.mutation({
      query: (id) => ({
        url: `/basket/multi/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Basket", id: "LIST" },
        { type: "Basket", id: arg.id },
      ],
    }),
    incrementItem: builder.mutation({
      query: (id) => ({
        url: `/basket/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Basket", id: "LIST" },
        { type: "Basket", id: arg.id },
      ],
    }),
    decrementItem: builder.mutation({
      query: (id) => ({
        url: `/basket/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Basket", id: "LIST" },
        { type: "Basket", id: arg.id },
      ],
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
