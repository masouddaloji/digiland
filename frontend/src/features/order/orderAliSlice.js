//main api
import { shopApi } from "../../App/api/shopApi";
const orderApiSlice = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => "/orders",
      providesTags: (result, error, arg) => {
        if (result?.data?.length) {
          return [
            { type: "Order", id: "LIST" },
            ...result.data.map(({ _id }) => ({ type: "Order", id: _id })),
          ];
        } else return [{ type: "Order", id: "LIST" }];
      },
    }),
  }),
});

export const {useGetAllOrdersQuery}=orderApiSlice