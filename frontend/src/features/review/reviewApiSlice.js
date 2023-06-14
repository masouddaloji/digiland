//main api
import { shopApi } from "../../App/api/shopApi";

const reviewApiSlice = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => "/products/reviews",
      providesTags: (result, error, arg) => {
        if (result?.data?.length) {
          return [
            { type: "Review", id: "LIST" },
            ...result.data.map(({ _id }) => ({ type: "Review", id: _id })),
          ];
        } else return [{ type: "Review", id: "LIST" }];
      },
    }),
    addReview: builder.mutation({
      query: ({ data, id }) => ({
        url: `/products/reviews/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags:(result,error,arg)=>[{ type: "Review", id: "LIST" },{type:"Product",id:arg.id}]
    }),
    deleteReview:builder.mutation({
        query:({productId,ReviewId})=>({
            url:`/products/${productId}/reviews/${ReviewId}`,
            method:"DELETE"
        }),
        invalidatesTags:(result,error,arg)=>[{ type: "Review", id: "LIST" }]
    })
  }),
});

export const{useGetReviewsQuery,useAddReviewMutation,useDeleteReviewMutation}=reviewApiSlice