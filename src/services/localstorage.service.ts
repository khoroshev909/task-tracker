import {sortAscDes} from "../types/other";

const JWT_TOKEN = 'jwt-token'
const REFRESH_TOKEN = 'refresh-token'
const EXPIRES_IN = 'expires-in'
const USER_ID = 'user-id'
const SORT = 'sort'
const IS_HTDE_FINISHED_TASKS = 'is-hide-finished-tasks'

export function setTokens({ idToken, refreshToken, localId, expiresIn = 3600}) {
    const tokenExpires = Date.now() + expiresIn * 1000
    localStorage.setItem(USER_ID, localId)
    localStorage.setItem(JWT_TOKEN, idToken)
    localStorage.setItem(REFRESH_TOKEN, refreshToken)
    localStorage.setItem(EXPIRES_IN, tokenExpires.toString())
}

export function removeTokens() {
    localStorage.removeItem(USER_ID)
    localStorage.removeItem(JWT_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    localStorage.removeItem(EXPIRES_IN)
}

export function getUserId() {
    return localStorage.getItem(USER_ID)
}

export function getAccessToken() {
    return localStorage.getItem(JWT_TOKEN)
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN)
}

export function getExpiresIn() {
    return localStorage.getItem(EXPIRES_IN)
}

export function getIsHideFinished(): boolean | undefined {
    const value = localStorage.getItem(IS_HTDE_FINISHED_TASKS)
    if (value === 'true' || value === 'false') {
        return value === 'true' ? true : false
    }
}

export function setIsHideFinishedTasks(isHideFinished: boolean): void {
    return localStorage.setItem(IS_HTDE_FINISHED_TASKS, String(isHideFinished))
}

export const localStorageService = {
    setTokens,
    removeTokens,
    getAccessToken,
    getRefreshToken,
    getExpiresIn,
    getUserId,
    setIsHideFinishedTasks,
    getIsHideFinished
}
