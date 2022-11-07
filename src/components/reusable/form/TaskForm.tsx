import React, {FC} from 'react'
import Form from './Form'
import TextInput from './TextInput'
import SelectInput from './SelectInput'
import DateInput from './DateInput'
import FormButton from './FormButton'
import {SchemaOf} from 'yup'
import {IStatus} from "../../../types/status";
import {ITask} from "../../../types/task";
import {ITaskForm} from "../../../types/form";

interface TaskFormProps {
    data: ITask,
    schemaWithDate: SchemaOf<ITaskForm>,
    schemaWithOutDate: SchemaOf<ITaskForm>,
    submitHandler: (task: ITask) => void,
    statusData: IStatus[],
    btnText: string,
}

const TaskForm:FC<TaskFormProps> = ({ data, schemaWithDate, schemaWithOutDate, submitHandler, statusData, btnText }) => {

    return (
        <Form
            data={data}
            schemaWithDate={schemaWithDate}
            schemaWithOutDate={schemaWithOutDate}
            submit={submitHandler}>

            <TextInput
                autoFocus
                name='title'
                type='text'
                placeholder='Введите задачу ...'
                id='title'
                label='Задача'/>

            <TextInput
                name='body'
                type="text"
                placeholder='Опишите задачу...'
                id='body'
                label='Описание'/>

            <SelectInput
                name='status'
                type="select"
                options={statusData}
                id='status'
                label='Статус задачи'/>

            <DateInput
                name='deadline'
                type="date"
                label='Срок исполнения' />

            <FormButton text={btnText} type="button"/>
        </Form>
    )
}
 
export default TaskForm;