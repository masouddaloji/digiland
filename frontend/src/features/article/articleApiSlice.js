//main api
import { shopApi } from "../../App/api/shopApi";

const articleApiSlice = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ page, limit }) => `/articles?page=${page}&limit=${limit}`,
      providesTags: (result, error, arg) => {
        if (result?.data?.length) {
          return [
            { type: "Article", id: "LIST" },
            ...result.data.map(({ _id }) => ({ type: "Article", id: _id })),
          ];
        } else return [{ type: "Article", id: "LIST" }];
      },
    }),

    getArticleById: builder.query({
      query: (id) => `/articles/reviews/${id}`,
      providesTags: (result, error, arg) => [{ type: "Article", id: arg }],
    }),
    getArticleReviews:builder.query({
      query: ()=>"/articles/reviews",
      transformResponse:response=>response.data
    }),
    uploadCoverArticle: builder.mutation({
      query: (data) => ({
        url: "https://digiland-app.iran.liara.run/upload/articleimg",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.path,
    }),
    addArticle: builder.mutation({
      query: (data) => ({
        url: "/articles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Article", id: "LIST" },
      ],
    }),
    updateArticle: builder.mutation({
      query: ({ id, data }) => ({
        url: `/articles/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Article", id: "LIST" },
        { type: "Article", id: arg.id },
      ],
    }),
    deleteArticle:builder.mutation({
      query:(id)=>({
        url:`/articles/${id}`,
        method:"DELETE"
      }),
      invalidatesTags:(result,error,arg)=>[{type:"Article",id:"LIST"}]
    }),
    addReviewArticle:builder.mutation({
      query:({id,data})=>({
        url:`/articles/reviews/${id}`,
        method:"POST",
        body:data
      }),
      invalidatesTags:(result,error,arg)=>[{type:"Article",id:"LIST"},{type:"Article",id:arg.id}]
    })
  }),
});

export const {
  useGetArticlesQuery,
  useAddArticleMutation,
  useUploadCoverArticleMutation,
  useGetArticleByIdQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useAddReviewArticleMutation,
  useGetArticleReviewsQuery
} = articleApiSlice;
