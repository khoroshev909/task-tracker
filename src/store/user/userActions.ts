import {setTokens} from "../../services/localstorage.service";
import {userFailed, userLoading, userSuccess, userRemoveLoading} from "./userSlice";
import userService from "../../services/user.service";
import {httpAuth} from "../../hooks/useAuth";
import {Dispatch} from "redux";

export const getCurrentUser =  (userId: string) => async (dispatch: Dispatch) => {
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

export const login =  ({ email , password }) => async (dispatch: Dispatch) => {
    dispatch(userLoading())
    try {
        const { data } = await httpAuth.post('accounts:signInWithPassword', {
            email,
            password,
            returnSecureToken: true
        })
        setTokens(data)
        const { content } = await userService.getCurrentUser(data.localId)
        dispatch(userSuccess(content))
    } catch (e: any) {
        if (e.response.data.error.code === 400) {
            if (e.response.data.error.message === 'EMAIL_NOT_FOUND') {
                dispatch(userFailed('Указаный пользователь не существует'))
            }
        } else if (e.response.data.error.code === 400) {
            if (e.response.data.error.message === 'INVALID_PASSWORD') {
                dispatch(userFailed('Неверный пароль'))
            }
        } else {
            dispatch(userFailed(e.message))
        }
    }
}

export const signUp =  ({ email , password, userName }) => async (dispatch: Dispatch) => {
    dispatch(userLoading())
    try {
        const { data } = await httpAuth.post('accounts:signUp', {
            email,
            password,
            returnSecureToken: true
        })
        setTokens({ localId: data.localId, ...data })
        const { content } = await userService.create({ id: data.localId, email, userName })
        dispatch(userSuccess(content))

    } catch (e: any) {
        if (e.response.data.error.code === 400) {
            if (e.response.data.error.message === 'EMAIL_EXISTS') {
                dispatch(userFailed('Пользователь с таким Email уже существует'))
            }
        } else {
            dispatch(userFailed(e.message))
        }
    }
}
