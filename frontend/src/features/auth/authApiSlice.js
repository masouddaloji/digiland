//main api
import { shopApi } from "./../../App/api/shopApi";
//auth reducer
import { setToken, logOut } from "./authSlice";

export const authApiSlice = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...userInfo },
      }),
    }),
    loginUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...userInfo },
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(logOut());
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: [
        { type: "Auth", id: "LIST" },
        { type: "Basket", id: "LIST" }, 
      ],
    }),
    getRefreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const {accessToken}=data
          dispatch(setToken({accessToken}));
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetRefreshTokenMutation,
  useLogOutUserMutation,
} = authApiSlice;
