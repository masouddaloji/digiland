import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { toast } from "react-toastify";
import privateAxios from "../api/privateAxios";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  createError: "",
  updateError: "",
  deleteError: "",
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
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
      return rejectWithValue(error.response?.data);
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
      return rejectWithValue(error.response?.data);
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
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await privateAxios.delete(`products/${id}`);
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
        state.data = action.payload.data;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createStatus = "success";
        toast.success("محصول تستی با موفقیت افزوده شد");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
        toast.error("افزودن محصول تستی با مشکل مواجه شد لطفا دوباره تلاش کنید");
      })
      .addCase(updateProduct.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateStatus = "success";
        toast.success("اطلاعات محصول تستی با موفقیت تغییر کرد");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
        toast.error(
          "تغییر اطلاعات محصول تستی با مشکل مواجه شد لطفا دوباره تلاش کنید"
        );
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteStatus = "success";
        toast.success(" محصول تستی با موفقیت  حذف شد");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
        toast.error("حذف محصول تستی با مشکل مواجه شد لطفا دوباره تلاش کنید");
      });
  },
});

export default productsSlice.reducer;
