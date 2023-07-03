import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { configureStore } from "@reduxjs/toolkit";
//main api
import { shopApi } from "./api/shopApi";
//reducers
import authReducer from "./../features/auth/authSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
  devTools: true,
});
setupListeners(store.dispatch);
export default store;
