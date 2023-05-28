//redux
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  credentials: "include",
  prepareHeaders: (headers, { getState}) => {
    const token = getState().auth.token
    console.log("token",token)
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithRefreshToken = async (arg, api, extraOptions) => {
  let result = await baseQuery(arg, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshRequest = baseQuery("/auth/refresh", api, extraOptions);
    if (refreshRequest?.data) {
      api.dispatch(setToken(refreshRequest.data?.accessToken));
      result=await baseQuery(arg, api, extraOptions)
    } else {
      if (refreshRequest?.error?.status === 403) {
        refreshRequest.error.data.message = "Your login has expired. "
      }
      return refreshRequest
    }
  } 
  return result;
};

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery:baseQueryWithRefreshToken,
  tagTypes: ["Product", "User", "IndexPage", "Article", "Order", "Basket","Auth"],
  endpoints: (builder) => ({}),
});
