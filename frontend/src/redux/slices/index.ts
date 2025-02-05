import userSliceReducers from "./user/slice";

export const appReducers = {
    user: userSliceReducers
} as const;