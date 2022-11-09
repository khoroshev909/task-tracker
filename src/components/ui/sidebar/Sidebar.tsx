import React, {FC, useCallback, useContext, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/useStore";
import {ListBulletIcon, PencilSquareIcon} from "@heroicons/react/20/solid";
import {useHistory} from "react-router-dom";
import {tasksDropFilter} from '../../../store/task/taskSlice'
import StatusList from "./StatusList";
import Button from "../../reusable/Button";
import {TaskListContext} from "../../pages/TasksPage";

const Sidebar:FC = () => {

    const { filter } = useAppSelector(state => state.tasks)
    const history = useHistory()
    const dispatch = useAppDispatch()
    const { data: items } = useAppSelector(state => state.status)
    const { setFirstPage } = useContext(TaskListContext)

    const dropfFilterHandler = useCallback(() => {
        if (filter === null) return
        setFirstPage()
        dispatch(tasksDropFilter())
        history.push('/')
    }, [filter, dispatch, tasksDropFilter, history])

    const handleClick = useCallback(() => history.push('/tasks/add'), [history])

    const allTasksActive = useMemo(() => filter === null ? 'bg-gray-700' : 'bg-gray-500', [filter])

    const allTasksIcon = useMemo(() => React.memo(ListBulletIcon), [])

    return (
       <>
           <div className="flex flex-col">
               <Button
                   text="Все задачи"
                   onClick={dropfFilterHandler}
                   classes={`${allTasksActive} mb-3 flex items-center p-2 rounded-lg text-white text-sm font-medium bg-gray-500 shadow-md hover:cursor-pointer hover:bg-gray-400`}
                   Icon={allTasksIcon}
                   iconClasses="h-4 w-4 mr-1" />

               <StatusList items={items} />

               <Button
                   text="Добавить задачу"
                   onClick={handleClick}
                   classes="mt-3 flex items-center p-2 rounded-lg text-white text-sm font-medium bg-[#7192BE] shadow-md hover:cursor-pointer hover:bg-[#255DA5]"
                   Icon={PencilSquareIcon}
                   iconClasses="h-4 w-4 mr-1"/>
           </div>
       </>
    );
};

export default React.memo(Sidebar);