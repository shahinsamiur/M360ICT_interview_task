// api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Make API
export const api = createApi({
  reducerPath: 'api', // Name
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }), // Your server link
  endpoints: (builder) => ({



    getUsers: builder.query<any[], void>({ // What we want to GET
      query: () => 'products', 
    }),

    getCategories: builder.query<any[], void>({ // What we want to GET
      query: () => 'products/categories', 
    }),

    getProductById: builder.query<any, string>({
      query: (id) => `products/${id}`,
    }),

    // 4. PATCH create new product (mutation)
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),



  }),
});

// Export the hook to use
export const { useGetUsersQuery, useGetProductByIdQuery ,useGetCategoriesQuery,useUpdateProductMutation } = api;
