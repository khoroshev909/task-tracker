import React, {FC} from 'react';

interface CheckboxInputProps {
    id: string
    checked: boolean
    label: string
    onCheck: () => void,
    disabled: boolean
}

const CheckboxInput:FC<CheckboxInputProps> = ({ id,checked,label,onCheck, disabled  }) => {

    return (
        <div className="flex items-center">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={() => onCheck()}
                disabled={disabled}
                className="w-4 h-4 bg-gray-500 rounded-lg outline-0 border-gray-500 text-white hover:cursor-pointer disabled:cursor-not-allowed"/>
            <label htmlFor={id} className={`${disabled ? 'opacity-50 ' : ''}ml-2 text-sm font-semibold text-gray-500`}>
                {label}
            </label>
        </div>
    );
};

export default CheckboxInput;