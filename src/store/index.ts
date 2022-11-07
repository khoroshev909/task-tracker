import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { statusReducer } from "./status/sratusSlice";
import { tasksReducer } from "./task/taskSlice";
import { userReducer } from "./user/userSlice";

const rootReducer = combineReducers({
    status: statusReducer,
    tasks: tasksReducer,
    user: userReducer
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']