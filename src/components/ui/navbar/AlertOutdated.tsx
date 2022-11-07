import React, {FC} from 'react';

interface AlertOutdatedProps {
    outdatedLength: number,
    fetchOutdated: () => void,
    onHide: () => void
}

const AlertOutdated:FC<AlertOutdatedProps> = ({ outdatedLength, fetchOutdated, onHide }) => {
    return (
        <span className="relative bg-white p-1 pr-3 rounded-lg text-gray-500 text-xs shadow" >
            <button onClick={fetchOutdated} className="font-semibold hover:underline" >
                Посроченных задач: {outdatedLength}
            </button>
            <div onClick={onHide} className="font-thin hover:underline hover:cursor-pointer">
                Скрыть
            </div>
        </span>
    );
};

export default AlertOutdated;