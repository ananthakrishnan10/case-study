import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { guardianApi, newsApi } from '../Pages/Articles/apis';

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    [guardianApi.reducerPath]: guardianApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(newsApi.middleware, guardianApi.middleware),
});

setupListeners(store.dispatch);
