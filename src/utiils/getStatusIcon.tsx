import React from 'react'
import {ArrowPathIcon, CheckCircleIcon, ClockIcon} from "@heroicons/react/20/solid";

export function getStatusIcon(status: string | undefined) {
    switch(status) {
        case 'Отложена':
            return <ClockIcon className="h-4 w-4 mr-1" />
        case 'Завершена':
            return <CheckCircleIcon className="h-4 w-4 mr-1" />
        case 'В работе':
            return <ArrowPathIcon className="h-4 w-4 mr-1" />
        default:
            return <CheckCircleIcon className="h-4 w-4 mr-1" />
    }
}