import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./../features/productsSlice";
import basketReducer from "./../features/basketSlice";
import { shopApi } from "./api/shopApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
});
setupListeners(store.dispatch);
export default store;
