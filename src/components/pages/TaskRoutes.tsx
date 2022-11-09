import React, {useEffect, useMemo} from 'react';
import {Redirect, Route, Switch, useLocation, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import AddTask from './AddTask';
import {useAppDispatch, useAppSelector} from "../../hooks/useStore";
import {fetchTasks} from "../../store/task/taskActions";
import Loading from "../reusable/Loading";
import {fetchStatusData} from "../../store/status/statusActions";
import {NavigationContext} from "../ui/navbar/Navbar";
import {setInitialPage} from "../ui/navbar/Navbar";
import {IQueryParams} from "../../types/other";
import query from "query-string";
import checkStatusType from "../../utiils/checkStatusType";
import TasksPage from "./TasksPage";
import EditTask from "./EditTask";
import NotFound from "./NotFound";

const TaskRoutes = () => {
    
    const { loading: statusDataLoading, error: statusDataError } = useAppSelector(state => state.status)
    const { loading: tasksLoading, tasks, error: tasksError } = useAppSelector(state => state.tasks)
    const { loading: userLoading, error: userError, current: currentUser } = useAppSelector(state => state.user)

    const globalLoading = useMemo(() => statusDataLoading || tasksLoading || userLoading,
        [statusDataLoading, tasksLoading, userLoading])

    const queryParams = useLocation().search
    const {status}: IQueryParams = query.parse(queryParams)

    const error = useMemo(() => statusDataError || tasksError || userError,
        [statusDataError, tasksError, userError])

    useEffect(() => {
        if (error) toast.error(error)
    }, [error])

    const dispatch = useAppDispatch()
    const { taskId } = useParams<{taskId: string}>()

    useEffect(() => {
        dispatch(fetchStatusData())
        if (!taskId && !tasks.length) {
            if (checkStatusType(status)) {
                dispatch(fetchTasks(currentUser.id, status))
            } else {
                dispatch(fetchTasks(currentUser.id))
            }
        }
    }, [])

    return (
        <>
            {globalLoading ? (
                <Loading/>
            ) : (
                <NavigationContext.Provider value={{setInitialPage}} >
                <Switch>
                    <Route path="/tasks/add" component={AddTask} />
                    <Route path="/tasks/edit/:taskId" component={EditTask} />
                    <Route exact path="/" component={TasksPage}  />
                    <Route path="/404" component={NotFound} />
                    <Redirect to="/404" />
                </Switch>
                </NavigationContext.Provider>
            )}
        </>
    );
};

export default React.memo(TaskRoutes);