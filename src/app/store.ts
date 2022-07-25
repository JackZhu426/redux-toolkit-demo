import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/CounterSlice';
import { dogsApi } from '../features/dogs/DogsApiSlice';

/**
 * This creates a Redux store, and also automatically configure
 * the 'Redux DevTools' extension so that you can inspect the store
 * while developing.
 */
export const store = configureStore({
  /**
   * A single reducer function that will be used as the root reducer, or an
   * object of slice reducers that will be passed to `combineReducers()`.
   */
  reducer: { counter: counterReducer, [dogsApi.reducerPath]: dogsApi.reducer },

  // Adding the api middleware enables caching, invalidation, polling (轮询),
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(dogsApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;

/**
 * ReturnType: Obtain the return type of a function type
 */
export type RootState = ReturnType<typeof store.getState>;
