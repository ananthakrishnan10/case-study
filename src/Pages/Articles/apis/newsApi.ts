import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsResponse } from '../../types/articles';

const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;
const newsApiBaseUrl = import.meta.env.VITE_NEWS_API_BASE_URL;

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: newsApiBaseUrl }),
  endpoints: (builder) => ({
    getNewsApi: builder.query<
      NewsResponse,
      { keyword?: string; sources?: string; from?: string; to?: string; page?: number; pageSize?: number }
    >({
      query: ({ keyword, sources, from, to, page = 1, pageSize = 10 }) => {
        const params = new URLSearchParams({
          apiKey: newsApiKey,
          q: keyword || '',
          sources: sources || '',
          from: from || '',
          to: to || '',
          language: 'en',
          page: page.toString(),
          pageSize: pageSize.toString(),
        });
        return `everything?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetNewsApiQuery } = newsApi;
