import React, {FC} from 'react';

interface RemoveButtonProps {
    id?: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>, id: string | undefined) => void,
    classes?: string
}

const RemoveButton:FC<RemoveButtonProps> = ({ id, onClick, classes }) => {

    const clickHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        onClick(event, id)
    }

    return (
        <button
            onClick={clickHandler}
            className={"hover:shadow-md font-bold rounded-lg hover:cursor-pointer " + classes} >
            <span>&times;</span>
        </button>
    );
};

export default RemoveButton;