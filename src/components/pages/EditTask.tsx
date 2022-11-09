import React, {useCallback, useEffect} from 'react';
import TaskForm from '../reusable/form/TaskForm'
import {useHistory, useParams} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useStore";
import Loading from "../reusable/Loading";
import ErrorMessage from "../reusable/ErrorMessage";
import {fetchTaskById} from "../../store/task/taskActions";
import {taskDropCurrent} from "../../store/task/taskSlice";
import useForm from '../../hooks/useForm';
import Button from "../reusable/Button";
import {ArrowLeftCircleIcon} from "@heroicons/react/20/solid";
import {ITask} from "../../types/task";


const EditTask = () => {
    const dispatch = useAppDispatch()
    const history = useHistory()
    const {taskId} = useParams<{taskId: string}>()

    const {
        data,
        loading,
        error,
        schemaWithDate,
        schemaWithOutDate,
        statusData,
        onSubmitEdit
    } = useForm()

    useEffect(() => {
        dispatch(fetchTaskById(taskId))
    }, [])

    useEffect(() => {
        return () => {
            dispatch(taskDropCurrent())
        }
    }, [])

    const submitHandler = useCallback(async (task: ITask) => {
        const updated = {...task, updated_at: Date.now()}
        onSubmitEdit(updated)
        history.push('/')
    }, [onSubmitEdit, history])

    const handleClick = useCallback(() => history.push('/'), [history])

    return (
        <div className="container mx-auto flex justify-center flex-col items-center">
            {loading ? (
                <Loading />
            ) : (
                error ? (
                    <ErrorMessage message={error}/>
                    ) : (
                    data.id && (
                        <div className="my-5">
                            <Button
                                text="Назад"
                                onClick={handleClick}
                                Icon={ArrowLeftCircleIcon}
                                iconClasses='h-5 w-5 mr-1'/>
                            <TaskForm
                                data={data}
                                schemaWithDate={schemaWithDate}
                                schemaWithOutDate={schemaWithOutDate}
                                submitHandler={submitHandler}
                                statusData={statusData}
                                btnText='Изменить' />
                        </div>
                            )
                        )
                )}
        </div>
    );
};

export default EditTask;