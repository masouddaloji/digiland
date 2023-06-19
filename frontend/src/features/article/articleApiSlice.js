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
    uploadCoverArticle:builder.mutation({
      query:(data)=>({
        url:"http://localhost:8000/upload/articleimg",
        method:"POST",
        body:data
      }),
      transformResponse:response=>response.path
    }),
    addArticle: builder.mutation({
      query: (data) => ({
        url: "/articles",
        method: "POST",
        body: data,
      }),
      invalidatesTags:(result,error,arg)=>[{type:"Article",id:"LIST"}]
    }),
  }),
});

export const {useGetArticlesQuery,useAddArticleMutation,useUploadCoverArticleMutation}=articleApiSlice