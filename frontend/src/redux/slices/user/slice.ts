import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: Date | null;
}

const initialState: UserState = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    createdAt: null
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state = action.payload;
        },
        clearUserState: (state) => {
            state = initialState;
        }
    }
});

export const { setUser, clearUserState } = slice.actions;
export default slice.reducer;
