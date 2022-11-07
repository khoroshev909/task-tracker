import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IStatus} from "../../types/status";

interface initialState {
    loading: boolean,
    data: IStatus[],
    error: null | string,
    lastFetch: number
}

const initialState: initialState = {
    loading: true,
    data: [],
    error: null,
    lastFetch: null
}

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        statusDataRequested(state) {
            state.loading = true
        },
        statusDataRecieved(state, action: PayloadAction<IStatus[]>) {
            state.data = action.payload
            state.lastFetch = Date.now()
            state.error = null
            state.loading = false
        },
        statusDataFailed(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.loading = false
        },
    }
})

export const { reducer: statusReducer, actions } = statusSlice

export const {
    statusDataRequested,
    statusDataRecieved,
    statusDataFailed
} = actions
