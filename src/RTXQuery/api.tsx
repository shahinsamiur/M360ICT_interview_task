// api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Make API
export const api = createApi({
  reducerPath: 'api', // Name
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }), // Your server link
  endpoints: (builder) => ({
    getUsers: builder.query<any[], void>({ // What we want to GET
      query: () => 'products', // The endpoint (https://jsonplaceholder.typicode.com/users)
    }),
  }),
});

// Export the hook to use
export const { useGetUsersQuery } = api;
