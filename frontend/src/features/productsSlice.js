import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
  mainData: [],
  paginatedData: [],
  filteredData: [],
  status: "idle",
  error: null,
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
};
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (limit, { rejectWithValue }) => {
    try {
      const response = await axios.get("product", {
        params: {
          limit,
        },
      });
      return response.data;
    } catch (error) {
      console.log("ERROR", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProductsByPage = createAsyncThunk(
  "products/getProductsByPage",
  async (page, limit, { rejectWithValue }) => {
    try {
      const response = await axios.get("products", {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProductsByFilter = createAsyncThunk(
  "products/getProductsByFilter",
  async (data, { rejectWithValue }) => {
    try {
      const { page, limit, category, color, tags, sort, price } = data;
      const response = await axios.get("products", {
        params: {
          page,
          limit,
          category,
          color,
          tags,
          sort,
          price,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.mainData = action.payload.data;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getProductsByPage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProductsByPage.fulfilled, (state, action) => {
        state.status = "success";
        state.paginatedData = action.payload.data;
      })
      .addCase(getProductsByPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getProductsByFilter.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProductsByFilter.fulfilled, (state, action) => {
        state.status = "success";
        state.filteredData = action.payload.data;
      })
      .addCase(getProductsByFilter.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
