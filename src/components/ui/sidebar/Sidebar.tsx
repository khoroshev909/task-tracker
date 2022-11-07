import React, {FC, useContext} from 'react';
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

    const dropfFilterHandler = () => {
        if (filter === null) return
        setFirstPage()
        dispatch(tasksDropFilter())
        history.push('/')
    }

    return (
       <>
           <div className="flex flex-col">
               <StatusList items={items} />
               <Button
                   text="Все задачи"
                   onClick={dropfFilterHandler}
                   classes="flex items-center p-2 rounded-lg text-white text-sm font-medium bg-gray-500 shadow-md hover:cursor-pointer hover:bg-gray-400"
                   IconComponent={<ListBulletIcon className="h-4 w-4 mr-1" />} />
               <Button
                   text="Добавить задачу"
                   onClick={() => history.push('/tasks/add')}
                   classes="flex items-center mt-5 p-2 rounded-lg text-white text-sm font-medium bg-[#7192BE] shadow-md hover:cursor-pointer hover:bg-[#255DA5]"
                   IconComponent={<PencilSquareIcon className="h-4 w-4 mr-1" />} />
           </div>
       </>
    );
};

export default Sidebar;