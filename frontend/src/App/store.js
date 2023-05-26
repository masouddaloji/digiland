import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { configureStore } from "@reduxjs/toolkit";
//main api
import { shopApi } from "./api/shopApi";

import authReducer from "./../features/auth/authSlice";
import productsReducer from "./../features/productsSlice";
import basketReducer from "./../features/basketSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    basket: basketReducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
  devTools: true,
});
setupListeners(store.dispatch);
export default store;
