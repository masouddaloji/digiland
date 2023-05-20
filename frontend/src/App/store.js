import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './../features/productsSlice'
import mainPageReducer from './../features/mainPageSlice'
import basketReducer from './../features/basketSlice'
const store=configureStore({
    reducer:{
    products:productsReducer,
    mainPage:mainPageReducer,
    basket:basketReducer
    }
})
export default store