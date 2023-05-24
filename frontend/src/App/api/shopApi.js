//packages
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({baseUrl:"http://localhost:8000"}),
  tagTypes:["Product","User","IndexPage","Article","Order","Basket"],
  endpoints: (builder) => ({}),

});
