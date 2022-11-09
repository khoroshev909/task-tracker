import React, {FC} from 'react';
import TaskCard from "./TaskCard";
import {ITask} from "../../types/task";

interface TasksChunkProps {
    chunk: ITask[][],
    idx: number,
    serchText: string
}

const TasksChunk:FC<TasksChunkProps> = ({ chunk, idx, serchText }) => {
    return (
        <>
            {chunk[idx].map((task) => (
            <TaskCard
                key={task.id}
                task={task}
                searchText={serchText} />
            ))}
        </>
    );
};

export default React.memo(TasksChunk);