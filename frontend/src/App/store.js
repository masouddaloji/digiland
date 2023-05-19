import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './../features/productsSlice'
import mainPageReducer from './../features/mainPageSlice'
const store=configureStore({
    reducer:{
    products:productsReducer,
    mainPage:mainPageReducer
    }
})
export default store