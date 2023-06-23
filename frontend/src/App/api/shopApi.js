//redux
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setToken } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 ) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(setToken({ ...refreshResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: baseQueryWithRefreshToken,
  refetchOnReconnect: true,
  tagTypes: [
    "Product",
    "Users",
    "IndexPage",
    "Article",
    "Order",
    "Basket",
    "Auth",
    "Favorite",
    "Review",
    "Search",
  ],
  endpoints: (builder) => ({}),
});
