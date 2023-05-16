import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './../features/productsSlice'
const store=configureStore({
    reducer:{
    products:productsReducer
    }
})
export default store