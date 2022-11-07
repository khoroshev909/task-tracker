import React, {FC, useContext, useEffect} from 'react'
import axios from 'axios'
import userService from "../services/user.service";
import {useAppDispatch, useAppSelector} from "./useStore";
import {userFailed, userLoading, userRemoveLoading, userSuccess} from "../store/user/userSlice";
import {localStorageService} from "../services/localstorage.service";
import {toast} from "react-toastify";
import config from '../config.js'

export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: config.REACT_APP_FIREBASE_KEY
    }
})

const AuthContext = React.createContext<any>({})

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider:FC = ({ children }) => {

    const dispatch = useAppDispatch()

    const { error: userError, current, loading } = useAppSelector(state => state.user)

    const getUserData = async () => {
        const userId = localStorageService.getUserId()
        if (userId) {
            dispatch(userLoading())
            try {
                const { content } = await userService.getCurrentUser(userId)
                dispatch(userSuccess(content))
            } catch (e: any) {
                dispatch(userFailed(e.message))
            } finally {
                dispatch(userRemoveLoading())
            }
        }
    }

    useEffect(() => {
        if (userError) {
            toast.error(userError)
        }
    }, [userError])

    useEffect(() => {
        if (!current) dispatch(getUserData)
    }, [])

    const login = async ({ email , password }) => {
        try {
            const { data } = await httpAuth.post('accounts:signInWithPassword', {
                email,
                password,
                returnSecureToken: true
            })
            return data
        } catch (e) {
            if (e.response.data.error.code === 400) {
                if (e.response.data.error.message === 'EMAIL_NOT_FOUND') {
                    throw Error('Указаный пользователь не существует')
                }
            }
            if (e.response.data.error.code === 400) {
                if (e.response.data.error.message === 'INVALID_PASSWORD') {
                    throw Error('Неверный пароль')
                }
            }
            throw Error(e)
        }
    }

    const signUp = async ({ email , password }) => {
        try {
            const { data } = await httpAuth.post('accounts:signUp', {
                email,
                password,
                returnSecureToken: true
            })
            return data
        } catch (e) {
            if (e.response.data.error.code === 400) {
                if (e.response.data.error.message === 'EMAIL_EXISTS') {
                    throw Error('Пользователь с таким Email уже существует')
                }
            }
            throw Error(e)
        }
    }

    return (
        <AuthContext.Provider value={ { signUp, login, getUserData } } >
            {children}
        </AuthContext.Provider>
    )
}
 
export default AuthProvider;