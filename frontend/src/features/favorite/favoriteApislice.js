//main api
import { shopApi } from "../../App/api/shopApi";

const favoriteApiSlice = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getFavorite: builder.query({
      query: () => "/users/favorate",
      transformResponse: (response) => response.data,
      providesTags: (result, error, arg) => {
        if (result?.data?.length) {
          return [
            { type: "Favorite", id: "LIST" },
            ...result.data.map(({ _id }) => ({ type: "Favorite", id: _id })),
          ];
        } else return [{ type: "Favorite", id: "LIST" }];
      },
    }),
    addToFavorite: builder.mutation({
      query: (id) => ({
        url: `/users/favorate/${id}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Favorite", id: "LIST" }],
    }),
    removeFromFavorite: builder.mutation({
      query: (id) => ({
        url: `/users/favorate/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Favorite", id: "LIST" }],
    }),
  }),
});

export const {
  useGetFavoriteQuery,
  useAddToFavoriteMutation,
  useRemoveFromFavoriteMutation,
} = favoriteApiSlice;
