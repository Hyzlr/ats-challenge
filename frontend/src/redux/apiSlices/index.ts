import { authApiSlice } from "./auth/slice";

const rtkApiSlices = [authApiSlice] as const;

export const apiSliceReducers = rtkApiSlices.map((apiSlice) => ({
    [apiSlice.reducerPath]: apiSlice.reducer
}))

export const apiSliceMiddlewares = rtkApiSlices.map((apiSlice) => apiSlice.middleware)