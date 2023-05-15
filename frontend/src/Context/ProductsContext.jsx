import {createContext} from 'react'
const ProductsContext=createContext({
    products:null,
    isLoadingProducts:null,
    errorProducts:null,
    categories:null,
    isLoadingCategories:null,
    errorCategories:null,
})
export default ProductsContext