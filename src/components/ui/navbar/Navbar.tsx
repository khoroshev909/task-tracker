import React, {FC, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/useStore";
import {userLogout} from "../../../store/user/userSlice";
import {localStorageService} from "../../../services/localstorage.service";
import {fetchOutdatedTasks, tasksDropFilter} from "../../../store/task/taskSlice";
import Button from "../../reusable/Button";
import AlertOutdated from "./AlertOutdated";
import Notification from "./Notification";

export const setFirstPage = { value: false }
export const NavigationContext = React.createContext<any>({})

const Navbar:FC = () => {

    const history = useHistory()
    const dispatch = useAppDispatch()
    const { logged, current } = useAppSelector(state => state.user)
    const { outdated, loading: tasksLoading } = useAppSelector(state => state.tasks)
    const [isShowAlert, setIsShowAlert] = useState<boolean>(false)

    const logoutHandler = () =>  {
        const confirm = window.confirm('Выйти из аккаутна?')
        if (confirm) {
            localStorageService.removeTokens()
            dispatch(userLogout())
        }
    }

    const toggleShowAlertHandler = () => {
        setIsShowAlert(prev => !prev)
    }

    const fetchOutdatedHandler = () => {
        setFirstPage.value = true
        dispatch(fetchOutdatedTasks(outdated))
        setIsShowAlert(false)
        history.push('/?status=outdated')
    }

    const hideAlertHandler = () => {
        setIsShowAlert(false)
    }

    const homePageHandler = () => {
        setFirstPage.value = true
        history.push('/')
        dispatch(tasksDropFilter())
    }

    return (
            <nav className="flex justify-between items-center px-5 bg-gray-500 text-white h-[50px]">
                <button className="mr-12 font-bold" onClick={homePageHandler} >Google Задачи</button>
                <div>
                    {logged ? (
                        <>
                            <span className="flex items-center relative">
                                {isShowAlert && (
                                    <AlertOutdated
                                        outdatedLength={outdated.length}
                                        fetchOutdated={fetchOutdatedHandler}
                                        onHide={hideAlertHandler} />
                                )}
                                <span className="flex relative w-[100px] items-center mr-2 font-bold hover:cursor-pointer select-none" >
                                    {!tasksLoading && (
                                        <Notification
                                            toggleAlert={toggleShowAlertHandler}
                                            outdatedLength={outdated.length} />
                                    )}
                                    {current.userName}
                                </span>
                                <Button text="Выход" onClick={logoutHandler} />
                            </span>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="mr-3" >Вход</Link>
                            <Link to="/registration" >Регистрация</Link>
                        </>
                    )}
                </div>
            </nav>
        )
    }  ;

export default Navbar;