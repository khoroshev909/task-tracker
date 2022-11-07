import React, {FC} from 'react';
import { getDate } from '../../utiils/getDate';
import {statusType} from "../../types/status";

interface DateBadgeProps {
    date: number,
    isOutdated: boolean,
    status: statusType
}

const DateBadge:FC<DateBadgeProps> = ({ date, isOutdated, status }) => {

    const backgroundStyle = isOutdated && status !== 'finished' ? 'bg-red-500' : 'bg-[#7192BE]'
    const opacity = status === 'finished' ? 'opacity-40' : 'opacity-100'

    return ( 
        <span className={`${backgroundStyle} ${opacity} max-h-[38px] p-1 rounded-lg text-center text-white text-xs font-semibold`}>
            {getDate(date)}
        </span>
     );
}
 
export default DateBadge;
