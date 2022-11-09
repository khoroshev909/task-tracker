import React, {FC, FormEvent, useCallback, useEffect, useState} from 'react';
import {ITask} from "../../../types/task";
import {IErrors, ITaskForm} from "../../../types/form";

interface FormProps {
    children: any[],
    data: any,
    schemaWithDate: any,
    schemaWithOutDate: any,
    submit: (newTask: ITask) => void,
}

const Form:FC<FormProps> = ({ children, data, schemaWithDate, schemaWithOutDate, submit }) => {

    const [formData, setFormData] = useState<ITask>(data)

    const [errors, setErrors] = useState<IErrors>({})

    const isValid= Object.keys(errors as IErrors)
        .filter((fieldName: string) => errors[fieldName] !== null)
        .length === 0

    const validate = useCallback((isValidateDate: boolean, data: ITaskForm) => {
        try {
            isValidateDate
                ? schemaWithDate.validateSync(data)
                : schemaWithOutDate.validateSync(data)
            setErrors({})
        } catch (e: any) {
            setErrors({ [e.path]: e.message })
        }
        // Асинхронный варинт
        // schema.validate(data, {abortEarly: true})!
        //     .then(() => setErrors(({})))
        //     .catch((err: any) => {
        //         console.log(err)
        //         setErrors(({[err.path]: err.message}))
        //     })
        // return isInvalid()
    }, [schemaWithDate, schemaWithOutDate, setErrors])

    useEffect(() => {
        validate(formData.status !== 'finished',formData)
    }, [formData])

    const submitHandler = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isValid) return
        submit(formData)
    }

    const changeHandler = useCallback((e: any) => {
        setFormData((prev) => ({
            ...prev,
            [e.name]: e.value
        }))
    }, [])

    const changeDateHandler = useCallback((date: number) => {
        setFormData((prev) => ({
            ...prev,
            deadline: date
        }))
    }, [])

    const keyDownHandler =  useCallback((event) => {
        if (event.keyCode === 13) {
            event.preventDefault()
            const form = event.target.form
            const idx = Array.prototype.indexOf.call(form, event.target)
            form[idx + 1].focus() 
        }
    }, []) 

    const clonedElements = React.Children.map(children, (child) => {
        let config = {}
        const name: keyof ITaskForm = child.props.name || child.props.type
        switch (child.props.type) {
            case 'button':
                config = {
                    ...child.props,
                    isValid
                }
                break
            case 'text':
                config = {
                    ...child.props,
                    onChange: changeHandler,
                    value: formData[name],
                    error: errors[name],
                    onKeyDown: keyDownHandler
                }
                break
            case 'date':
                config = {
                    ...child.props,
                    changeDate: changeDateHandler,
                    error: errors[name],
                    value: formData[name],
                    onKeyDown: keyDownHandler
                }
                break
            case 'select':
                config = {
                    ...child.props,
                    onChange: changeHandler,
                    value: formData[name],
                    error: errors[name],
                    onKeyDown: keyDownHandler
                }
                break
            default :
                config = {...child.props}
        }

        return React.cloneElement(child, config)
    })

    return (
        <form className="mt-5 w-[400px]" onSubmit={submitHandler}>
            {clonedElements}
        </form>
    );
};

export default React.memo(Form);