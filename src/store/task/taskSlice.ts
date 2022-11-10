import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";
import {statusType} from "../../types/status";
import {ITask} from "../../types/task";

export const initialCurrent: ITask = {
    id: '',
    userId: '',
    title: '',
    body: '',
    status: 'pending',
    deadline: Date.now() + 1000*60*60*24,
    created_at: 0,
    updated_at: 0
}

interface initialState {
    loading: boolean,
    tasks: ITask[],
    outdated: ITask[],
    tasksContainer: ITask[],
    current: ITask,
    error: null | string,
    filter: null | statusType
}

const initialState: initialState = {
    loading: true,
    tasks: [],
    outdated: [],
    tasksContainer: [],
    current: initialCurrent,
    error: null,
    filter: null
}

const statusSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        taskLoadingStart(state) {
            state.loading = true
        },
        taskHideFinished(state) {
            state.tasks = state.tasksContainer.filter(t => t.status !== 'finished')
        },
        taskShowFinished(state) {
            state.tasks = state.tasksContainer
        },
        taskLoadingEnd(state) {
            state.loading = false
        },
        tasksRequested(state) {
            state.loading = true
        },
        tasksRecieved(state, action: PayloadAction<ITask[]>) {
            state.tasks = action.payload
            state.tasksContainer = action.payload
            state.error = null
        },
        tasksFailed(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.loading = false
        },
        tasksSearch(state, action: PayloadAction<ITask[]>) {
            state.tasks = action.payload
        },
        tasksFilterByStatus(state, action: PayloadAction<statusType>) {
            if (state.tasksContainer.length) {
                state.tasks = state.tasksContainer.filter((t) => t.status === action.payload) || []
                state.filter = action.payload
            }
        },
        fetchOutdatedTasks(state, action: PayloadAction<ITask[]>) {
            state.loading = true
            state.filter = 'outdated'
            state.tasks = action.payload
            state.loading = false
        },
        tasksGetOutdated(state, action: PayloadAction<ITask[]>) {
            state.outdated = action.payload
        },
        taskRemoveOutdated(state, action: PayloadAction<string>) {
            state.outdated = state.outdated.filter(t => t.id !== action.payload)
        },
        taskById(state, action: PayloadAction<ITask>) {
            state.current = action.payload
            state.loading = false
            state.error = null
        },
        taskDropCurrent(state) {
            state.current = initialCurrent
        },
        taskEditRequested(state) {
            state.loading = true
        },
        taskEdit(state, action: PayloadAction<ITask>) {
            const idx = state.tasks.findIndex((t) => t.id === action.payload.id)
            const newTasks = [...state.tasks]
            newTasks[idx] = action.payload
            state.tasks = newTasks
            if (state.tasksContainer.length === state.tasks.length) {
                state.tasksContainer = newTasks
            } else {
                const idxContainer = state.tasksContainer.findIndex((t) => t.id === action.payload.id)
                const newTasksContainer = [...state.tasksContainer]
                newTasksContainer[idxContainer] = action.payload
                state.tasksContainer = newTasksContainer
            }
            state.loading = false
        },
        taskEditFailed(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.loading = false
        },
        tasksDropFilter(state) {
            state.tasks = state.tasksContainer
            state.filter = null
        },
        tasksRemoveFilter(state) {
            state.filter = null
        },
        addTaskRequested(state) {
            state.loading = true
        },
        addTaskSuccess(state, action: PayloadAction<ITask>) {
            if (state.filter && state.filter === action.payload.status) {
                state.tasks = [...state.tasks, action.payload]
            } else {
                state.tasks = [...state.tasksContainer, action.payload]
                state.filter = null
            }
            state.tasksContainer = [...state.tasksContainer, action.payload]
            state.error = null
            state.loading = false
        },
        addTaskFailed(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.loading = false
        },
        removeTaskRequested(state) {
            state.loading = true
        },
        removeTaskSuccess(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter((t) => t.id !== action.payload)
            state.tasksContainer = state.tasksContainer.filter((t) => t.id !== action.payload)
            state.error = null
            state.loading = false
        },
        removeTaskFailed(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.loading = false
        },
        tasksRecievedWithHideFinished(state, action: PayloadAction<ITask[]>) {
            state.tasksContainer = action.payload
            state.error = null
            state.tasks = action.payload.filter((t) => t.status !== 'finished') || []
        },
        tasksRecievedWithStatusFilter(state, action: PayloadAction<{ data: ITask[], status: statusType }>) {
            state.tasksContainer = action.payload.data
            state.error = null
            state.filter = action.payload.status
            if (action.payload.status === 'outdated') {
                state.tasks = state.outdated
            } else {
                state.tasks = action.payload.data.filter((t) => t.status === action.payload.status) || []
            }
        }
    }
})

export const { reducer: tasksReducer, actions } = statusSlice

export const {
    tasksRequested,
    tasksRecieved,
    tasksFailed,
    taskById,
    tasksFilterByStatus,
    tasksDropFilter,
    addTaskRequested,
    addTaskSuccess,
    addTaskFailed,
    removeTaskRequested,
    removeTaskSuccess,
    removeTaskFailed,
    taskDropCurrent,
    taskEdit,
    taskEditRequested,
    taskEditFailed,
    tasksGetOutdated,
    taskLoadingStart,
    taskLoadingEnd,
    fetchOutdatedTasks,
    taskHideFinished,
    taskShowFinished,
    tasksRemoveFilter,
    taskRemoveOutdated,
    tasksSearch,
    tasksRecievedWithHideFinished,
    tasksRecievedWithStatusFilter
} = actions

export const getTaskById = (id: string) => (state: RootState): ITask | undefined => {
    if (state.tasks.tasks.length) {
        return state.tasks.tasks.find((s) => s.id === id)
    }
}
