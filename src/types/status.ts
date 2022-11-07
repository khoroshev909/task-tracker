export type statusType = 'pending' | 'finished' | 'delayed' | 'outdated'

export interface IStatus {
    id: statusType,
    title: string
}