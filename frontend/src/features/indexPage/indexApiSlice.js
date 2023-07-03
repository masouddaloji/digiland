//mian api
import { shopApi } from "../../App/api/shopApi";

export const indexApiSlice = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getIndexInfos: builder.query({
      query: () => "/main",
      providesTags: (result, error, arg) => [
        { type: "IndexPage", id: "LIST" },
        // ...result.map(({_id}) => ({ type: "IndexPage", id:_id })),
      ],
    }),
  }),
});
export const {useGetIndexInfosQuery} = indexApiSlice;
