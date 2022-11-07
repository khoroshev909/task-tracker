import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/useStore";
import {localStorageService} from "../../services/localstorage.service";
import {getCurrentUser} from "../../store/user/userActions";
import {userRemoveLoading} from "../../store/user/userSlice";
import Loading from "../reusable/Loading";

const AppLoader = ({children}) => {

    const dispatch = useAppDispatch()
    const {loading: userLoading, logged} = useAppSelector(state => state.user)

    useEffect(() => {
        const userId = localStorageService.getUserId()
        if (userId) {
            dispatch(getCurrentUser(userId))
        } else {
            dispatch(userRemoveLoading())
        }
    }, [])

    if (userLoading) return <Loading/>

    return children
};

export default AppLoader;