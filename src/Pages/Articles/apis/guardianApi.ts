import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GuardianResponse } from '../../types/guardian';
import { SearchFormValues } from '../../../forms/ArticlesFilter/filterSchema';

const guardianApiKey = import.meta.env.VITE_GUARDIAN_API_KEY;
const guardianBaseUrl = import.meta.env.VITE_GUARDIAN_API_BASE_URL;

export const guardianApi = createApi({
  reducerPath: 'guardianApi',
  baseQuery: fetchBaseQuery({ baseUrl: guardianBaseUrl }),
  endpoints: (builder) => ({
    getGuardianNews: builder.query<GuardianResponse, SearchFormValues>({
      query: ({ keyword, category, author, from, to, page = 1, pageSize = 10 }) => {
        const params = new URLSearchParams({
          'api-key': guardianApiKey,
          q: [keyword, category, author].filter(Boolean).join(' '),
          'from-date': from || '',
          'to-date': to || '',
          page: page.toString(),
          'page-size': pageSize.toString(),
        });
        return `search?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetGuardianNewsQuery } = guardianApi;
