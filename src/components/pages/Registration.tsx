import React, {FC, useEffect} from 'react'
import {useFormik} from 'formik'
import * as yup from "yup"
import {FormikProps} from "formik"
import InputField from '../reusable/form/formik/InputField'
import FormButton from '../reusable/form/FormButton'
import {useAppDispatch, useAppSelector} from "../../hooks/useStore";
import {toast} from "react-toastify";
import {signUp} from "../../store/user/userActions";
import {useHistory} from "react-router-dom";
import {userRemoveError} from "../../store/user/userSlice";

interface MyValues {
    email: string,
    userName: string,
    password: string,
    confirm: string
}

const Registration:FC = () => {

    const history = useHistory()
    const dispatch = useAppDispatch()
    const {error: userError} = useAppSelector(state => state.user)

    useEffect(() => {
        if (userError) {
            toast.error(userError)
            dispatch(userRemoveError())
        }
    }, [userError])

    const validationSchema = yup.object().shape({
        email: yup.string().email('Введите корректный email').required('Введите email'),
        userName: yup.string().required('Введите пароль').min(3, 'Введите минимум три символа'),
        password: yup.string().required('Введите пароль').min(3, 'Введите минимум три символа'),
        confirm: yup.string()
            .required('Подтвердите пароль')
            .oneOf([yup.ref('password'), null], 'Пароли не соответствуют')
    })

    const submitHandler = async (values) => {
        dispatch(signUp(values))
        history.push('/')
    }

    const {values, handleChange, handleSubmit, errors, isSubmitting, touched}: FormikProps<MyValues> = useFormik<MyValues>({
        initialValues: {
            email: '',
            userName: '',
            password: '',
            confirm: ''
        },
        validationSchema,
        onSubmit: submitHandler
    })

    return (
            <div className="container mx-auto flex justify-center flex-col items-center">
                <h3 className="w-[400px] text-lg mt-5 font-bold text-gray-500">Регистрация</h3>
                <form onSubmit={handleSubmit} className="mt-5 w-[400px]">
                    <InputField
                        name='email'
                        type='text'
                        value={values.email || ''}
                        onChange={handleChange}
                        touched={touched.email}
                        error={errors.email}
                        placeholder='Введите Email...'
                        id='email'
                        label='Email' />

                    <InputField
                        name='userName'
                        type='text'
                        value={values.userName || ''}
                        onChange={handleChange}
                        touched={touched.userName}
                        error={errors.userName}
                        placeholder='Введите ваше имя'
                        id='userName'
                        label='Ваше имя' />

                    <InputField
                        name='password'
                        type='password'
                        value={values.password || ''}
                        onChange={handleChange}
                        touched={touched.password}
                        error={errors.password}
                        placeholder='Введите пароль...'
                        id='password'
                        label='Пароль' />

                    <InputField
                        name='confirm'
                        type='password'
                        value={values.confirm || ''}
                        onChange={handleChange}
                        touched={touched.confirm}
                        error={errors.confirm}
                        placeholder='Введите пароль повторно...'
                        id='confirm'
                        label='confirm' />

                    <FormButton text='Зарегистрироваться' isValid={Object.keys(errors).length === 0 || !isSubmitting}/>
                </form>
            </div>
        )
    }

export default Registration
