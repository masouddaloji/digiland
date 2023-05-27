//redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//packages
import { toast } from "react-toastify";
//api
import privateAxios from "./../api/privateAxios";
import { persianTexts } from "../text";


const initialState = {
  datas: [],
  status: "idle",
  error: "",
  updateBasketStatus: "idle",
};
export const getBasket = createAsyncThunk(
  "basket/getBasket",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateAxios.get("basket", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addToBasket=createAsyncThunk("basket/addToBasket",async({id,token},{rejectWithValue})=>{
    try {
        const response=privateAxios.put(`basket/${id}`,{},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return (await response).data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const productDecrementInBasket=createAsyncThunk("basket/productDecrementInBasket",async({id,token},{rejectWithValue})=>{
    try {
        const response=await privateAxios.delete(`basket/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data 
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const multiRemoveFromBasket=createAsyncThunk("basket/multiRemoveFromBasket",async({id,token},{rejectWithValue})=>{
    try {
        const response=await privateAxios.delete(`basket/multi/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data 
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const productIncrementInBasket =createAsyncThunk("basket/productIncrementInBasket",async({id,token},{rejectWithValue})=>{
    try {
        const response=privateAxios.put(`basket/${id}`,{},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return (await response).data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBasket.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBasket.fulfilled, (state, action) => {
        state.status = "success";
        state.datas = action.payload;
      })
      .addCase(getBasket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(addToBasket.pending, (state) => {
        state.updateBasketStatus = "loading";
      })
      .addCase(addToBasket.fulfilled, (state) => {
        state.updateBasketStatus = "success";
        toast.success(persianTexts.basket.addtobasketSuccess)
      })
      .addCase(addToBasket.rejected, (state, action) => {
        state.updateBasketStatus = "failed";
        toast.error(persianTexts.basket.addtobasketError)
        state.error = action.payload.message;
      })
      .addCase(productIncrementInBasket.pending, (state) => {
        state.updateBasketStatus = "loading";
      })
      .addCase(productIncrementInBasket.fulfilled, (state) => {
        state.updateBasketStatus = "success";
      })
      .addCase(productIncrementInBasket.rejected, (state, action) => {
        state.updateBasketStatus = "failed";
        state.error = action.payload.message;
        toast.error(persianTexts.basket.incrementProductError)
      })
      .addCase(productDecrementInBasket.pending, (state) => {
        state.updateBasketStatus = "loading";
      })
      .addCase(productDecrementInBasket.fulfilled, (state) => {
        state.updateBasketStatus = "success";
      })
      .addCase(productDecrementInBasket.rejected, (state, action) => {
        state.updateBasketStatus = "failed";
        state.error = action.payload.message;
        toast.error(persianTexts.basket.decrementProductError)
      })
      .addCase(multiRemoveFromBasket.pending, (state) => {
        state.updateBasketStatus = "loading";
      })
      .addCase(multiRemoveFromBasket.fulfilled, (state) => {
        state.updateBasketStatus = "success";
        toast.success(persianTexts.basket.removeFromBasketSuccess)
      })
      .addCase(multiRemoveFromBasket.rejected, (state, action) => {
        state.updateBasketStatus = "failed";
        toast.error(persianTexts.basket.removeFromBasketError)
        state.error = action.payload.message;
      })
  },
});
export default basketSlice.reducer;
