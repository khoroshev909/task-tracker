import React, {FC, Suspense} from 'react';
import {Redirect, Route} from "react-router-dom";
import Loading from "../reusable/Loading";

interface IProps {
    component?: FC<any>,
    logged: boolean,
    path: string,
    lazy?: boolean
}

const GuestsRoute:FC<IProps> = ({ logged, component: Component, children, path, lazy= false }) => {

    return (
        <>
            <Route path={path} render={(props) => {
                if (logged) {
                    return <Redirect to="/" />
                }
                if (lazy) return (
                    <Suspense fallback={<Loading/>}>
                        <Component {...props} />
                    </Suspense>
                )
                return Component ? <Component {...props} /> : children
            }} />
        </>
    );
};

export default GuestsRoute;