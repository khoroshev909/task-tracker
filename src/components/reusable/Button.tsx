import React, {FC} from 'react';

interface ButtonProps {
    text: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    Icon?: React.JSXElementConstructor<any>
    classes?: string,
    iconClasses?: string
}

const Button:FC<ButtonProps> = ({ text, onClick = () => undefined, Icon, classes = '', iconClasses='h-4 w-4' }) => {
    return (
        <button type="button"
                className={`flex rounded-md border border-transparent bg-gray-500 p-2 text-sm font-bold text-white shadow-md hover:cursor-pointer hover:bg-gray-700 ${classes}`}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClick(event)}>
            {Icon && <Icon className={iconClasses} />}
            {text}
        </button>
    );
};

export default React.memo(Button);