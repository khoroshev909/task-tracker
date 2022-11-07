import React, {FC} from 'react';

interface FormButtonProps {
    isValid?: boolean,
    text: string,
    type?: string
}

const FormButton:FC<FormButtonProps> = ({ isValid, text, type = 'button' }) => {
    return (
        <button type="submit"
                className="disabled:opacity-50 disabled:cursor-not-allowed group relative flex w-full justify-center rounded-md border border-transparent bg-[#7192BE] p-2 text-sm font-medium text-white shadow-md hover:cursor-pointer hover:bg-[#255DA5]"
                disabled={!isValid}>
            {text}
        </button>
    );
};

export default FormButton;