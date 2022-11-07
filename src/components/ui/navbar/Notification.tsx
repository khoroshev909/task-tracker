import React, {FC} from 'react';
import {BellIcon} from "@heroicons/react/20/solid";

interface NotificationProps {
    toggleAlert: () => void,
    outdatedLength: number
}

const Notification:FC<NotificationProps> = ({ toggleAlert, outdatedLength }) => {
    return (
        <span className="p-2" onClick={toggleAlert}>
            <BellIcon className="h-5 w-5 mr-[0.3rem]" />
            {!!outdatedLength && (
                <span className={`absolute top-0 left-[22%] flex items-center bg-red-500 drop-shadow-lg max-h-[15px] p-[0.3rem] rounded-full text-center text-white text-[0.7rem] font-bold`} >
                    {outdatedLength}
                </span>
            )}
        </span>
    );
};

export default Notification;