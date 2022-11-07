import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IUser {
    id: string,
    email: string,
    userName: string
}

interface IUserInitial {
    loading: boolean
    current: null | IUser,
    error: null | string,
    logged: boolean
}

const initialState: IUserInitial = {
    loading: true,
    current: null,
    error: null,
    logged: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoading(state) {
            state.loading = true
        },
        userRemoveLoading(state) {
            state.loading = false
        },
        userSuccess(state, action: PayloadAction<IUser>) {
            state.current = action.payload
            state.error = null
            state.logged = true
            state.loading = false
        },
        userFailed(state, action) {
            state.error = action.payload
            state.loading = false
        },
        userLogout(state) {
            state.current = null
            state.logged = false
        },
        userRemoveError(state) {
            state.error = null
        }
    }
})

export const { reducer: userReducer, actions } = userSlice
export const { userLoading, userRemoveLoading, userSuccess, userFailed, userLogout, userRemoveError } = actions
