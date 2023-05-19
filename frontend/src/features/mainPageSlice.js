//redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";
const initialState = {
  data: [],
  status: "idle",
  error: "",
};
export const getProductsMain = createAsyncThunk(
  "mainPage/getProductsMain",
  async ({ limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get("products", {
        params: {
          limit,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const mainPageSlice = createSlice({
  name: "mainPage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsMain.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsMain.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.data;
      })
      .addCase(getProductsMain.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});
export default mainPageSlice.reducer;
