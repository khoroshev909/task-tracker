import React  from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Switch, Route, Redirect} from "react-router-dom";
import Navbar from "./components/ui/navbar/Navbar";
import {useAppSelector} from "./hooks/useStore";
import TaskRoutes from "./components/pages/TaskRoutes";
import loggerService from "./services/logger.service.js";
import ProtectedRoutes from "./components/router/ProtectedRoutes";
import GuestsRoute from "./components/router/GuestsRoute";
import Login from "./components/pages/Login";
import AppLoader from "./components/hoc/AppLoader";
import NotFound from "./components/pages/NotFound";

loggerService.init()

const Registration = React.lazy(() => import(
    /* webpackChunkName: "[Registration]" */
    './components/pages/Registration'
    ))

export default function App() {
    const {logged} = useAppSelector(state => state.user)

    return (
          <>
              <AppLoader>
                  <Navbar />
                  <Switch>
                      <GuestsRoute
                          logged={logged}
                          path="/login"
                          component={Login} />
                      <GuestsRoute
                          logged={logged}
                          path="/registration"
                          lazy={true}
                          component={Registration} />
                      <ProtectedRoutes
                          path="/"
                          component={TaskRoutes} />
                      <Route path="/404" component={NotFound} />
                      <Redirect to="/404" />
                  </Switch>
                  <ToastContainer />
              </AppLoader>
          </>
      )
}
