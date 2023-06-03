//mian api
import { shopApi } from "../../App/api/shopApi";

export const ProductApiSlice = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, limit, category, subCategory, color, price, sort,search }) =>
        `/products?page=${page}&limit=${limit}&category=${
          category ?? ""
        }&subCategory=${subCategory ?? ""}&color=${color ?? ""}&price=${
          price ?? ""
        }&sort=${sort ?? ""}&search=${search}`,
      providesTags: (result, error, arg) => [
        { type: "Product", id: "LIST" },
        ...result.data.map(({ _id }) => ({ type: "Product", id: _id })),
      ],
    }),
    getProductById: builder.query({
      query: (id) => `/products/reviews/${id}`,
      transformResponse: (response) => response.data,
      providesTags: (result, error, arg) => [
        { type: "Product", id: "List" },
        { type: "Product", id: result._id },
      ],
    }),
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/products",
        method: "POST",
        body: { ...productInfo },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: ({ productInfo, id }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: productInfo,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Product", id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = ProductApiSlice;
