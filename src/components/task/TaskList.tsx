import React, {FC} from 'react';
import TasksChunk from "./TasksChunk";
import Button from "../reusable/Button";
import {useAppSelector} from "../../hooks/useStore";
import {useHistory} from "react-router-dom";
import {ITask} from "../../types/task";

interface TaskListProps {
    isShowTasks: boolean,
    tasksChunk: ITask[][],
    pageIdx: number,
    search: string
}

const TaskList:FC<TaskListProps> = ({ isShowTasks, tasksChunk, pageIdx, search }) => {

    const history = useHistory()
    const {filter} = useAppSelector(state => state.tasks)

    return (
        <>
            {isShowTasks ? <TasksChunk chunk={tasksChunk} idx={pageIdx} serchText={search} />
                : (
                    filter === null ? (
                        search !== '' ? (
                            <p className="text-center font-bold pt-5">
                                Задач не найдено...
                            </p>
                        ) : (
                            <div className="flex justify-center">
                                <Button
                                    text="Добавьте первую задачу"
                                    onClick={() => history.push('/tasks/add')}
                                    classes="flex items-center mt-5 p-2 rounded-lg text-white text-sm font-medium bg-[#7192BE] shadow-md hover:cursor-pointer hover:bg-[#255DA5]"/>
                            </div>
                        )
                    ) : (
                        <p className="text-center font-bold pt-5">
                            Задач с данным статусом не найдено...
                        </p>
                    )
                )
            }
        </>
    );
};

export default TaskList;