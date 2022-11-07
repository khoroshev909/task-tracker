import * as React from 'react'
import {Formik, Form} from 'formik'
import * as yup from "yup"
import InputField from '../reusable/form/formik/InputField'
import FormButton from '../reusable/form/FormButton'
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../../hooks/useStore";
import {login} from '../../store/user/userActions'
import {useEffect, useRef} from "react";
import {userRemoveError} from "../../store/user/userSlice";

type LocationState = { from: string; };

const Login = () => {

    const dispatch = useAppDispatch()
    const history = useHistory()
    const fromRef = useRef<string>()

    if (history.location.state) {
        const {from} = history.location.state as LocationState;
        fromRef.current = from
    }

    const { error: userError } = useAppSelector(state => state.user)

    useEffect(() => {
        if (userError) {
            toast.error(userError)
            dispatch(userRemoveError())
        }
    }, [userError])

    const validationSchema = yup.object().shape({
        email: yup.string().email('Введите корректный email').required('Введите email'),
        password: yup.string().required('Введите пароль').min(3, 'Введите минимум три символа')
    })

    const submitHandler = (values) => {
        dispatch(login(values))
        history.push('/')
    }

    return (
            <div className="container mx-auto flex justify-center flex-col items-center">
                <h3 className="w-[400px] text-lg mt-5 font-bold text-gray-500">Вход</h3>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={submitHandler}>
                    {({ values, errors, isSubmitting, touched, ...props }) => (
                        <Form
                            onSubmit={props.handleSubmit}
                            className='mt-5 w-[400px]'>

                            <InputField
                                id='email'
                                type='text'
                                name='email'
                                value={values.email}
                                touched={touched.email}
                                onChange={props.handleChange}
                                error={errors.email}
                                label='Email'
                                placeholder='Введите Email' />

                            <InputField
                                id='password'
                                type='password'
                                name='password'
                                value={values.password}
                                touched={touched.password}
                                onChange={props.handleChange}
                                error={errors.password}
                                label='Парроль'
                                placeholder='Введите пароль' />

                            <FormButton text="Вход" isValid={Object.keys(errors).length === 0}/>
                        </Form>
                    )}
                </Formik>
            </div>
        )
}
 
export default Login