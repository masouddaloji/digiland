import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { toast } from "react-toastify";
import privateAxios from "../api/privateAxios";
import { persianTexts } from "../text";

const initialState = {
  data: [],
  status: "idle",
  error: "",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",

};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (data, { rejectWithValue }) => {
    try {
      const { page, limit, category, color, subCategory, sort, price } = data;
      const response = await axios.get("products", {
        params: {
          page,
          limit,
          category,
          color,
          subCategory,
          sort,
          price,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await privateAxios.post("products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ data, token, id }, { rejectWithValue }) => {
    try {
      const response = await privateAxios.put(`products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await privateAxios.delete(`products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.createStatus = "success";
        toast.success(persianTexts.adminpanel.createProductSuccess);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload.message;
        toast.error(persianTexts.adminpanel.createProductError);
      })
      .addCase(updateProduct.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.updateStatus = "success";
        toast.success(persianTexts.adminpanel.editProductSuccess);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload.message;
        console.log("action.payload update reject", action.payload);
        toast.error(persianTexts.adminpanel.editProductError);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleteStatus = "success";
        toast.success(persianTexts.adminpanel.removeProductSuccess);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload.message;
        toast.error(persianTexts.adminpanel.removeProductError);
      });
  },
});
export default productsSlice.reducer;
