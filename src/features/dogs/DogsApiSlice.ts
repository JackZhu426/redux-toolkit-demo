import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const DOGS_API_KEY = '8e3676be-d8e1-455d-b821-b447e6d3b71c';

interface Breed {
  id: number;
  name: string;
  image: {
    url: string;
  };
}

export const dogsApi = createApi({
  reducerPath: 'dogsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thedogapi.com/v1/',
    prepareHeaders(headers) {
      headers.set('x-api-key', DOGS_API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDogByName: builder.query<Breed[], number[] | void>({
      query: (...[limit = 10]) => `breeds?limit=${limit}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDogByNameQuery } = dogsApi;
