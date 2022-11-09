import React, {FC} from 'react';

interface TextCenterProps {
    message: string
}

const TextCenter:FC<TextCenterProps> = ({message}) => {
    return (
        <p className="text-center font-bold pt-5">
            {message}
        </p>
    );
};

export default React.memo(TextCenter);