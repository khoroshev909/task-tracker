import React, {FC, useEffect, useRef} from 'react';
import {Redirect, Route} from "react-router-dom";
import {useAppSelector} from "../../hooks/useStore";
import {IUser} from "../../types/user";

interface IProps {
    component?: FC<any>,
    path: string
}

const ProtectedRoutes:FC<IProps> = ({component: Component, path, children}) => {

    const {current: currentUser} = useAppSelector(state => state.user)
    const userRef = useRef<IUser>()

    useEffect(() => {
        if (currentUser) {
            userRef.current = currentUser
        }
    }, [currentUser])

    return (
        <Route path={path} render={(props) => {
            if (!currentUser) {
                //======== history.location.state = перед редиректом в хистори можно передать любые данные
                return <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
            }
            return Component ? <Component {...props} /> : children
        }} />
    );
};

export default ProtectedRoutes;