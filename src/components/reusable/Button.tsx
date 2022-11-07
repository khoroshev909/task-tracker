import React, {FC} from 'react';

interface ButtonProps {
    text: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    IconComponent?: any,
    classes?: string
}

const Button:FC<ButtonProps> = ({ text, onClick = () => undefined, IconComponent, classes = '' }) => {
    return (
        <button type="button"
                className={`flex rounded-md border border-transparent bg-[#7192BE] p-2 text-sm font-bold text-white shadow-md hover:cursor-pointer hover:bg-[#255DA5] ${classes}`}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClick(event)}>
            {IconComponent || ''}
            {text}
        </button>
    );
};

export default Button;