import { Dispatch } from "redux";
import httpService from "../../services/http.service";
import { statusDataFailed, statusDataRecieved, statusDataRequested } from "./sratusSlice";
import  {RootState} from "../index";
import {IStatus} from "../../types/status";
import {TransformedData} from "../../types/http";

function isOutdated(date: number) {
    return Date.now() - date > 1000 * 60 * 10;
}

export const fetchStatusData = () => async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState()
    const lastFetch = state.status.lastFetch
    if (isOutdated(lastFetch)) {
        dispatch(statusDataRequested())
        try {
            const response = await httpService.get<TransformedData<IStatus>>('status/')
            dispatch(statusDataRecieved(response.data.content))
        } catch (error: any) {
            dispatch(statusDataFailed(error.message))
        }
    }
}

export const fetchStatusById = (id: string) => (state: RootState): IStatus | undefined => {
    if (state.status.data.length) {
        return state.status.data.find((s) => s.id === id)
    }
}
