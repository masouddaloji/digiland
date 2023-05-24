//mian api
import { shopApi } from "../../App/api/shopApi";

export const indexApiSlice = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getIndexInfos: builder.query({
      query: () => "/products?page=1&limit=100",
      transformResponse:response=>response.data,
      providesTags: (result, error, arg) => [
        { type: "IndexPage", id: "LIST" },
        ...result.map((id) => ({ type: "IndexPage", id })),
      ],
    }),
  }),
});
export const {useGetIndexInfosQuery} = indexApiSlice;
