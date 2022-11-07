import React, {FC} from 'react';
import {IStatus} from "../../../types/status";
import StatusItem from "../../status/StatusItem";

interface StatusListProps {
    items: IStatus[]
}

const StatusList:FC<StatusListProps> = ({ items }) => {
    return (
        <>
            {items.map((item) => (
                <StatusItem key={item.id} id={item.id}  />)
            )}
        </>
    );
};

export default StatusList;