import React, {ChangeEvent, FC} from 'react';

interface ITextInput {
    name: string,
    value?: string,
    error?: string | null,
    onChange?: (e: { name: string, value: string }) => void,
    placeholder?: string,
    id?: string,
    label?: string,
    type?: string,
    autoFocus?: boolean
}

const TextInput:FC<ITextInput> = ({ 
    error='',
    type = 'text',
    name, value = '',
    placeholder,
    id,
    label,
    onChange = () => null,
    ...props
    }) => {

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        onChange({ name: e.target.name, value: e.target.value });
    };

    return (
        <div className="mb-1">
            <label htmlFor={id} className="text-gray-500 text-sm">{label}</label>
            <input id={id}
                   name={name}
                   {...props}
                   className="block w-full appearance-none rounded-lg border border-gray-500 text-gray-700 font-semibold placeholder-gray-500 focus:z-10 focus:border-[#255DA5] focus:outline-none focus:ring-[#255DA5] text-sm p-2"
                   placeholder={placeholder}
                   onChange={handleChange}
                   value={value}
                   type={type}/>
            {error && (
                <p className="text-red-500 text-xs font-bold">{error}</p>
            )}
        </div>
    );
};

export default React.memo(TextInput);