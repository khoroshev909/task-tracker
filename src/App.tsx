import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Switch, Route, Redirect} from "react-router-dom";
import Navbar from "./components/ui/navbar/Navbar";
import {useAppSelector} from "./hooks/useStore";
import TaskRoutes from "./components/pages/TaskRoutes";
import loggerService from "./services/logger.service.js";
import NotFound from "./components/pages/NotFound";
import ProtectedRoutes from "./components/router/ProtectedRoutes";
import GuestsRoute from "./components/router/GuestsRoute";
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import AppLoader from "./components/hoc/AppLoader";

loggerService.init()

export default function App() {
    const {logged} = useAppSelector(state => state.user)
    return (
          <>
              <AppLoader>
                  <Navbar />
                  <Switch>
                      <GuestsRoute logged={logged} path="/login" component={Login} />
                      <GuestsRoute logged={logged} path="/registration" component={Registration} />
                      <ProtectedRoutes path="/" component={TaskRoutes} />
                      <Route path="/404" component={NotFound} />
                      <Redirect to="/404" />
                  </Switch>
                  <ToastContainer />
              </AppLoader>
          </>
      )
}
