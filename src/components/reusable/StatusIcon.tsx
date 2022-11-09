import React, {FC} from 'react'
import {ArrowPathIcon, CheckCircleIcon, ClockIcon} from "@heroicons/react/20/solid";
import {statusType} from "../../types/status";

interface StatusIconProps {
    status: statusType
}

const StatusIcon:FC<StatusIconProps> = ({status}) => {
    switch(status) {
        case 'delayed':
            return <ClockIcon className="h-4 w-4 mr-1" />
        case 'finished':
            return <CheckCircleIcon className="h-4 w-4 mr-1" />
        case 'pending':
            return <ArrowPathIcon className="h-4 w-4 mr-1" />
        default:
            return <CheckCircleIcon className="h-4 w-4 mr-1" />
    }
}

export default React.memo(StatusIcon)