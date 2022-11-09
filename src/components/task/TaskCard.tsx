import React, {FC, useCallback, useMemo} from 'react';
import DateBadge from '../reusable/DateItem';
import {useAppDispatch, useAppSelector} from "../../hooks/useStore";
import {fetchStatusById} from "../../store/status/statusActions";
import {CheckCircleIcon} from "@heroicons/react/20/solid";
import {Link, useHistory} from "react-router-dom";
import {removeTask} from '../../store/task/taskActions'
import RemoveButton from "../reusable/RemoveButton";
import Highlighter from "react-highlight-words";
import {ITask} from "../../types/task";

interface TaskCardProps {
    task: ITask,
    searchText?: string
}

const TaskCard:FC<TaskCardProps> = ({ task, searchText }) => {

    const history = useHistory()
    const dispatch = useAppDispatch()
    const status = useAppSelector(fetchStatusById(task.status))

    const isOutdated =  useMemo(() => {
        return Date.now() > task.deadline && status.id !== 'finished'
    }, [task, status])

    const isFinished = useMemo(() => status?.id === 'finished', [status])

    const removeHandler = useCallback((event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        event.preventDefault()
        const isRemove = window.confirm('Удалить задачу?')
        if (isRemove) {
            dispatch(removeTask(id))
            history.push('/')
        }
    }, [dispatch, removeTask, history])

    const background = useMemo(() => isOutdated ? 'bg-red-200' : 'bg-[#E4E2E0]', [isOutdated])

    return (
        <Link to={`/tasks/edit/${task.id}`} className={`${background} relative flex justify-between border py-3 px-5 rounded-lg mb-2 hover:shadow-md hover:bg-gray-100 hover:cursor-pointer transition-all`}>

            <div className="task-description">
                <h4
                    className={`text-decoration-line: ${isFinished ? 'line-through' : 'none'} ${isFinished ? 'text-slate-400' : 'text-black'} text-md font-bold mb-2`}>
                    <Highlighter
                        highlightClassName="bg-blue-500 text-white"
                        searchWords={[searchText]}
                        autoEscape={true}
                        textToHighlight={task.title}
                    />
                        <span className={`${isFinished ? 'bg-green-500' : 'bg-[#7192BE]'} absolute p-1 rounded-lg font-semibold text-xs text-white ml-2`}>
                            {status?.title}
                            {isFinished && (
                                <CheckCircleIcon className="inline h-4 w-4" />
                            )}
                        </span>
                </h4>
                <p className="text-sm mt-2">
                    <span className={`${isFinished ? 'text-slate-400' : 'text-black'} font-normal`}>{task.body}</span>
                </p>
            </div>


            <div className="task-deadline flex flex-col justify-center content-center mr-7">
                <p className="text-xs font-bold mb-1">
                    {isOutdated && task.status !== 'finished' ? 'Просрочена' : 'Срок исполнения:'}
                </p>
                <div>
                    <DateBadge isOutdated={isOutdated} date={task.deadline} status={task.status} />
                </div>

            </div>

            <RemoveButton
                id={task.id}
                classes="absolute top-1 right-1 hover:bg-gray-300 px-2"
                onClick={(event, id) => removeHandler(event, id)} />
        </Link>
    );
}
 
export default React.memo(TaskCard);
