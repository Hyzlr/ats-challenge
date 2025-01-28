import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';

import { appReducers } from './slices';
import { apiSliceMiddlewares, apiSliceReducers } from './apiSlices';

const reduxStore = configureStore({
    reducer: combineReducers({
        ...appReducers,
        ...apiSliceReducers
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSliceMiddlewares),
});

setupListeners(reduxStore.dispatch);

export default reduxStore;

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected): TSelected =>
    useSelector(selector);
