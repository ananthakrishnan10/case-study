import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsResponse, NewsSourcesResponse } from '../../types/articles';
import { SearchFormValues } from '../../../forms/ArticlesFilter/filterSchema';

const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;
const newsApiBaseUrl = import.meta.env.VITE_NEWS_API_BASE_URL;

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: newsApiBaseUrl }),
  endpoints: (builder) => ({
    getNewsApi: builder.query<NewsResponse, SearchFormValues>({
      query: ({ keyword, sources, category, from, to, page = 1, pageSize = 10 }) => {
        const params = new URLSearchParams({
          apiKey: newsApiKey,
          q: keyword ? `${keyword} ${category || ''}`.trim() : category || '',
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
    getNewsSources: builder.query<NewsSourcesResponse, void>({
      query: () => `sources?apiKey=${newsApiKey}&language=en`,
    }),
  }),
});

export const { useGetNewsApiQuery, useGetNewsSourcesQuery } = newsApi;
