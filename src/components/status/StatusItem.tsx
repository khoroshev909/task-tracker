import React, {FC, useCallback, useContext, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/useStore";
import {fetchStatusById} from "../../store/status/statusActions";
import StatusIcon from "../reusable/StatusIcon";
import Loading from "../reusable/Loading";
import {tasksFilterByStatus} from '../../store/task/taskSlice'
import { useHistory } from 'react-router-dom';
import getParamsString from "../../utiils/getParamsString";
import {statusType} from "../../types/status";
import {TaskListContext} from "../pages/TasksPage";

interface StatusItemProps {
    id: statusType
}

const StatusItem:FC<StatusItemProps> = ({ id }) => {

    const { filter } = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch()
    const history = useHistory()
    const status = useAppSelector(fetchStatusById(id))
    const { setFirstPage } = useContext(TaskListContext)

    const location = useMemo(() => getParamsString({status: status.id}), [status])

    const filterHandler = useCallback((statusId: statusType) => {
        if (filter === statusId) return
        setFirstPage()
        dispatch(tasksFilterByStatus(statusId))
        history.push('/' +  location)
    }, [filter, dispatch, tasksFilterByStatus, location])

    return (
        status ? (
            <div
                className={`${filter === status.id ? 'bg-gray-700 ' : 'bg-gray-500 '}flex items-center p-2 mb-3 text-center rounded-lg text-white text-sm font-medium shadow-md hover:cursor-pointer hover:bg-gray-400`}
                onClick={() => filterHandler(status.id)}>
                <StatusIcon status={status.id}/>
                {status.title}
            </div>
        ) : (
            <Loading />
        )
    );
};

export default React.memo(StatusItem);