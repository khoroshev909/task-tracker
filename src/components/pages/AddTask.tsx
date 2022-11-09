import React, {useCallback} from 'react';
import { nanoid } from 'nanoid'
import "react-datepicker/dist/react-datepicker.css";
import {useHistory} from "react-router-dom";
import TaskForm from '../reusable/form/TaskForm';
import useForm from '../../hooks/useForm';
import {useAppSelector} from "../../hooks/useStore";
import Button from "../reusable/Button";
import {ArrowLeftCircleIcon} from "@heroicons/react/20/solid";
import {ITask} from "../../types/task";

const AddTask = () => {
    const history = useHistory()

    const { current: currentUser } = useAppSelector(state => state.user)

    const {
        data,
        schemaWithDate,
        schemaWithOutDate,
        statusData,
        onSubmitCreate,
    } = useForm()

    const submitHandler = async (newTask: ITask) => {
        const task = {
            ...newTask,
            id: nanoid(),
            userId: currentUser.id,
            created_at: Date.now(),
            updated_at: Date.now()
        }
        onSubmitCreate(task)
        history.push('/')
    }

    const handleClick = useCallback(() => history.push('/'), [history])

    return (
            <div className="container mx-auto flex justify-center flex-col items-center">
                <div className="my-5 ">
                    <Button
                        text="Назад"
                        onClick={handleClick}
                        Icon={ArrowLeftCircleIcon}
                        iconClasses="h-5 w-5 mr-1"/>
                    <TaskForm
                        data={data}
                        schemaWithDate={schemaWithDate}
                        schemaWithOutDate={schemaWithOutDate}
                        submitHandler={submitHandler}
                        statusData={statusData}
                        btnText='Добавить' />
                </div>
            </div>
        )
};

export default React.memo(AddTask);