import React, {FC} from 'react';
import {Redirect, Route} from "react-router-dom";

interface IProps {
    component?: FC<any>,
    logged: boolean,
    path: string
}

const GuestsRoute:FC<IProps> = ({ logged, component: Component, children, path }) => {

    return (
        <>
            <Route path={path} render={(props) => {
                if (logged) {
                    return <Redirect to="/" />
                }
                return Component ? <Component {...props} /> : children
            }} />
        </>
    );
};

export default GuestsRoute;