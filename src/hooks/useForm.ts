import {useCallback, useMemo} from "react";
import { useAppDispatch, useAppSelector } from "./useStore"
import * as yup from 'yup';
import { addTask, editTask } from "../store/task/taskActions"
import {SchemaOf} from 'yup'
import {ITask} from "../types/task";
import {ITaskForm} from "../types/form";


const useForm = () => {

    const dispatch = useAppDispatch()
    const {data: statusData} = useAppSelector(state => state.status)
    const { error, current: data, loading } = useAppSelector(state => state.tasks)

    const schemaWithDate: SchemaOf<ITaskForm> = useMemo(() => (
        yup.object().shape({
            deadline: yup.number()
                .test(
                    'is-Valid-Date',
                    () => 'Срок исполнениия не может быть раньше текущего времени',
                    (value: any) => {
                        return Date.now() < value
                    }
                ),
            status: yup.string()
                .required('Выберите корректный статус')
                .test(
                    'is-Status',
                    () => `Введите корректный статус`,
                    (value: any) => {
                        return ['delayed', 'finished', 'pending'].includes(value)
                    }
                ),
            body: yup.string()
                .min(3, 'Введите минимум три символа'),
            title: yup.string()
                .required('Введите задачу')
                .min(3, 'Введите минимум три символа'),
        })
    ), [])

    const schemaWithOutDate: SchemaOf<ITaskForm> = useMemo(() => (
        yup.object().shape({
            deadline: yup.number(),
            status: yup.string()
                .required('Выберите корректный статус')
                .test(
                    'is-Status',
                    () => `Введите корректный статус`,
                    (value: any) => {
                        return ['delayed', 'finished', 'pending'].includes(value)
                    }
                ),
            body: yup.string()
                .min(3, 'Введите минимум три символа'),
            title: yup.string()
                .required('Введите задачу')
                .min(3, 'Введите минимум три символа'),
        })
    ), [])

    const onSubmitEdit = useCallback((task: ITask): void => {
        dispatch(editTask(task))
    }, [dispatch, editTask])

    const onSubmitCreate = useCallback((task: ITask): void => {
        dispatch(addTask(task))
    }, [dispatch, addTask])

    return {
        data,
        loading,
        error,
        schemaWithDate,
        schemaWithOutDate,
        statusData,
        onSubmitCreate,
        onSubmitEdit
    }
}
 
export default useForm;