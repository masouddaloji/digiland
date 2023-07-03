//mian api
import { shopApi } from "../../App/api/shopApi";

export const ProductApiSlice = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        page,
        limit,
        category,
        subCategory,
        color,
        price,
        sort,
        brand,
        search,
      }) =>
        `/products?page=${page}&limit=${limit}&category=${
          category ?? ""
        }&subCategory=${subCategory ?? ""}&color=${color ?? ""}&price=${
          price ?? ""
        }&sort=${sort ?? ""}&brand=${brand ?? ""}&search=${search ?? ""}`,
      providesTags: (result, error, arg) => {
        if (result?.data) {
          return [
            { type: "Product", id: "LIST" },
            ...result.data.map(({ _id }) => ({ type: "Product", id: _id })),
          ];
        } else return [{ type: "Product", id: "LIST" }];
      },
    }),
    getProductById: builder.query({
      query: (id) => `/products/reviews/${id}`,
      providesTags: (result, error, arg) => [
        { type: "Product", id: "List" },
        { type: "Product", id: result._id },
      ],
    }),
    uploadProductCover: builder.mutation({
      query: (image) => ({
        url: "/upload/prodimg",
        method: "POST",
        Headers: {
          "Content-Type": "multipart/form-data",
        },
        body: image,
      }),
      transformResponse: (response) => response.path,
    }),
    uploadProductGallery: builder.mutation({
      query: (images) => ({
        url: "/upload/prodgallery",
        method: "POST",
        Headers: {
          "Content-Type": "multipart/form-data",
        },
        body: images,
      }),
      transformResponse: (response) => response.galleryArray,
    }),
    // uploadGallery:,
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/products",
        method: "POST",
        body: { ...productInfo },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: ({ data, productID }) => ({
        url: `/products/${productID}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.productID },
      ],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUploadProductCoverMutation,
  useUploadProductGalleryMutation,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = ProductApiSlice;
