import React, {FC, useCallback} from 'react';
import TasksChunk from "./TasksChunk";
import {useAppSelector} from "../../hooks/useStore";
import {ITask} from "../../types/task";
import TextCenter from "../reusable/TextCenter";
import TasksNotFound from "../ui/TasksNotFound";

interface TaskListProps {
    isShowTasks: boolean,
    tasksChunk: ITask[][],
    pageIdx: number,
    search: string
}

const TaskList:FC<TaskListProps> = ({ isShowTasks, tasksChunk, pageIdx, search }) => {

    const {filter} = useAppSelector(state => state.tasks)

    return (
        <>
            {isShowTasks ?
                <TasksChunk chunk={tasksChunk} idx={pageIdx} serchText={search} />
                : (
                    filter === null ? (
                        search !== '' ? (
                            <TextCenter message={`Задач с названием "${search}" не найдено...`}/>
                        ) : (
                            <TasksNotFound/>
                        )
                    ) : (
                        <TextCenter message="Задач с данным статусом не найдено..."/>
                    )
                )
            }
        </>
    );
};

export default React.memo(TaskList);