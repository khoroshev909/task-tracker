import { Dispatch } from "redux";
import httpService from "../../services/http.service";
import {
    tasksRequested,
    tasksRecieved,
    tasksFailed,
    taskById,
    addTaskRequested,
    addTaskSuccess,
    addTaskFailed,
    removeTaskRequested,
    removeTaskSuccess,
    removeTaskFailed,
    taskEditRequested,
    taskEdit,
    taskEditFailed,
    tasksGetOutdated,
    taskLoadingStart,
    taskLoadingEnd,
    taskRemoveOutdated,
    tasksSearch,
    tasksRecievedWithStatusFilter,
    tasksRecievedWithHideFinished
} from './taskSlice';
import {RootState} from "../index";
import {localStorageService} from "../../services/localstorage.service";
import {statusType} from "../../types/status";
import {ITask} from "../../types/task";
import {TransformedData, TransformedDataItem} from "../../types/http";

export const fetchTasks = (userId: string, status:statusType = null) => async (dispatch: Dispatch) => {
    dispatch(taskLoadingStart())
        try {
        const response = await httpService.get<TransformedData<ITask>>(`tasks/`, {
            params: {
                orderBy:'"userId"',
                equalTo:`"${userId}"`
            }
        })
            dispatch(tasksGetOutdated(getOutDatedTasks(response.data.content)))
            const isHiheFinishedTasks = localStorageService.getIsHideFinished()
            if (isHiheFinishedTasks) {
                dispatch(tasksRecievedWithHideFinished(response.data.content))
            } else if (status && !isHiheFinishedTasks) {
                dispatch(tasksRecievedWithStatusFilter({ data: response.data.content, status }))
            } else  {
                dispatch(tasksRecieved(response.data.content))
            }

    } catch (error: any) {
        dispatch(tasksFailed(error.message))
    } finally {
        dispatch(taskLoadingEnd())
    }
}

export const getOutDatedTasks = (tasks: ITask[]): ITask[] => {
    if (tasks.length) {
        return tasks.filter((t) => t.deadline < Date.now() && t.status !== 'finished')
    }
    return []
}

export const searchTasks = (value: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState()
    if (state.tasks.tasksContainer.length) {
        const results = state.tasks.tasksContainer.filter(t => t.title.toLowerCase().trim().includes(value.toLowerCase().trim()))
        dispatch(tasksSearch(results.length ? results : []))
    }
}

export const fetchTaskById = (taskId: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(tasksRequested())
    const state = getState()
    if (state.tasks.tasks.length) {
        const task = state.tasks.tasks.find((t) => t.id === taskId)
        if (task) {
            dispatch(taskById(task))
        } else {
            dispatch(tasksFailed('Задача не найдена'))
        }
    } else {
        try {
            const response = await httpService.get<TransformedDataItem<ITask>>(`tasks/${taskId}`)
            dispatch(taskById(response.data.content))
        } catch (e: any) {
            dispatch(tasksFailed('Задача не найдена'))
        }
    }
}

export const addTask = (task: ITask) => async (dispatch: Dispatch) => {
    dispatch(addTaskRequested())
    try {
        const response = await httpService.put<TransformedDataItem<ITask>>(`tasks/${task.id}`, task)
        dispatch(addTaskSuccess(response.data.content))
    } catch (error: any) {
        dispatch(addTaskFailed(error.message))
    }
}

export const editTask = (task: ITask) => async (dispatch: Dispatch, getState:() => RootState) => {
    const state = getState()
    dispatch(taskEditRequested())
    try {
        const response = await httpService.put<TransformedDataItem<ITask>>(`tasks/${task.id}`, task)
        dispatch(taskEdit(response.data.content))
        const outdated = state.tasks.outdated.find(t => t.id === task.id)
        if (outdated) {
            dispatch(taskRemoveOutdated(task.id))
        }
    } catch (error: any) {
        dispatch(taskEditFailed(error.message))
    }
}

export const removeTask = (id: string) => async (dispatch: Dispatch, getState:() => RootState) => {
    const state = getState()
    dispatch(removeTaskRequested())
    try {
        await httpService.delete(`tasks/${id}`)
        dispatch(removeTaskSuccess(id))
        const outdated = state.tasks.outdated.find(t => t.id === id)
        if (outdated) {
            dispatch(taskRemoveOutdated(id))
        }
    } catch (error: any) {
        dispatch(removeTaskFailed(error.message))
    }
}
