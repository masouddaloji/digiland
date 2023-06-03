import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { configureStore } from "@reduxjs/toolkit";
//main api
import { shopApi } from "./api/shopApi";
//reducers
import authReducer from "./../features/auth/authSlice";
import productsReducer from "./../features/productsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
  devTools: true,
});
setupListeners(store.dispatch);
export default store;
