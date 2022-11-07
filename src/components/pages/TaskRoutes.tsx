import React, {useEffect, useMemo} from 'react';
import {Route, Switch, useLocation, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import AddTask from './AddTask';
import {useAppDispatch, useAppSelector} from "../../hooks/useStore";
import {fetchTasks} from "../../store/task/taskActions";
import Loading from "../reusable/Loading";
import {fetchStatusData} from "../../store/status/statusActions";
import {NavigationContext} from "../ui/navbar/Navbar";
import {setFirstPage} from "../ui/navbar/Navbar";
import {IQueryParams} from "../../types/other";
import query from "query-string";
import checkStatusType from "../../utiils/checkStatusType";
import TasksPage from "./TasksPage";
import EditTask from "./EditTask";

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
                <NavigationContext.Provider value={{setFirstPage}} >
                <Switch>
                    <Route path="/tasks/add" component={AddTask} />
                    <Route path="/tasks/edit/:taskId" component={EditTask} />
                    <Route path="/" component={TasksPage} exact />
                </Switch>
                </NavigationContext.Provider>
            )}
        </>
    );
};

export default TaskRoutes;