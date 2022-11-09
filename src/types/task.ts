import {statusType} from "./status";

export interface ITask {
    id: string,
    userId: string,
    status: statusType,
    title: string,
    body: string,
    deadline: number,
    created_at: number,
    updated_at: number
}