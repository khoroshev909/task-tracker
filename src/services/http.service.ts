import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import {localStorageService} from "./localstorage.service";
import loggerService from "./logger.service.js";
import configFile from "../config.js";
import {httpAuth} from "../hooks/useAuth";
import {ResponseData} from "../types/http";

const http = axios.create({ baseURL: configFile.REACT_APP_BASE_ENDPOINT })

http.interceptors.request.use(
    async function (config: AxiosRequestConfig) {
        if (configFile.REACT_APP_BACKEND === 'FIREBASE') {
            const containSlash = /\/$/gi.test(config.url!)
            config.url = (containSlash ? config.url!.slice(0, -1) : config.url) + '.json'
        }

        const refreshToken = localStorageService.getRefreshToken()
        const expiresIn = localStorageService.getExpiresIn()
        if (refreshToken && +expiresIn < Date.now()) {
            const { data } = await httpAuth.post('token', {
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            })
            localStorageService.setTokens({
                idToken: data.id_token,
                refreshToken: data.refresh_token,
                localId: data.user_id,
                expiresIn: data.expires_in
            })
        }

        const accessToken = localStorageService.getAccessToken()
        if (accessToken) {
            config.params = { ...config.params, auth: accessToken }
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

function transformData(data: ResponseData<any>) {
    return data && !data.id
        ? Object.keys(data).map((key) => ({ ...data[key] }))
        : data
}

http.interceptors.response.use(
    (res:AxiosResponse) => {
        if (configFile.REACT_APP_BACKEND === 'FIREBASE' && res.config.method !== 'delete') {
            res.data = { content: transformData(res.data) }
            if (res.data.content === null) {
                throw Error('Invalid request(my custom error)')
            }
            return res
        }
        return res
    },
    function (error: AxiosError) {
        const expextedErrors = error.response
            && error.response.status >= 400
            && error.response.status <= 500
        if (!expextedErrors) {
            loggerService.log(error)
        }
        return Promise.reject(error)
    }
)

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
}

export default httpService