export interface ITaskForm {
    title: string,
    body: string,
    status: string,
    deadline: number
}

export interface IErrors {
    [key: string]: string | null
}