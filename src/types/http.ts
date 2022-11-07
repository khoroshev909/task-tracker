interface StatusValue<T> {
    id: T;
    title: string
}

interface TaskValue<T> {
    id: T,
    userId: string,
    status: string,
    title: string,
    body: string,
    deadline: number
}

export type ResponseData<T> = {
    [K in keyof T]: StatusValue<T[K]> | TaskValue<T[K]>
}

export interface TransformedData<T> {
    content: T[]
}

export interface TransformedDataItem<T> {
    content: T
}