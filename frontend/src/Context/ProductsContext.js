import {createContext} from 'react'
const ProductsContext=createContext({
    products:null,
    isLoadingProducts:null,
    errorProducts:null,
    categories:null,
    isLoadingCategories:null,
    errorCategories:null,
    menus:null
})
export default ProductsContext