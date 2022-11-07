import { FormikTouched } from 'formik'
import React, {ChangeEvent, FC} from 'react'

interface InputProps {
    name : string,
    value: string,
    id: string,
    type: string,
    touched?: boolean | FormikTouched<any> | FormikTouched<any>[],
    placeholder: string,
    label: string,
    onChange: (e: ChangeEvent<any>) => void
    error: any
}

const InputField:FC<InputProps> = ({ name, value, id, type, placeholder, label, onChange, error, touched }) => {
    return (
        <div className="mb-2">
        <label htmlFor={id} className="text-gray-500 text-sm">{label}</label>
        <input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`block w-full appearance-none rounded-lg border text-gray-700 font-semibold placeholder-gray-500 focus:z-10 focus:outline-none focus:ring-[#255DA5] text-sm p-2 ${error && touched && 'border-red-500'}`}
                placeholder={placeholder} />
        {error && touched && ( 
        <p className="text-red-500 text-xs font-bold">{error}</p>)}
    </div>
    )
}
 
export default InputField