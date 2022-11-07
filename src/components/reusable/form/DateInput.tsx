import React, {FC} from 'react';
import DatePicker from "react-datepicker";

interface DateInputProps {
    name?: string,
    value?: number,
    error?: string | null,
    changeDate?: (date: number) => void,
    label?: string,
    type: string
}

const DateInput:FC<DateInputProps> = ({
        value= Date.now(),
        changeDate= () => undefined,
        label = '',
        error= '' }) => {
    
    return (
        <div className="mb-4">
            <span className="text-gray-500 text-sm">{label}</span>
            <DatePicker
                className={`${error ? 'text-red-500' : 'text-gray-500'} block w-full appearance-none rounded-lg border border-gray-500 text-gray-700 p-2 font-semibold focus:z-10 focus:border-[#255DA5] focus:outline-none focus:ring-[#255DA5] text-sm hover:cursor-pointer`}
                selected={new Date(value)}
                showTimeSelect
                dateFormat="dd/MM/yyyy HH:MM"
                onChange={(date:Date) => changeDate(date.getTime())} />
            {error && (
                <p className="text-red-500 text-xs font-bold">{error}</p>
            )}
        </div>
    );
};

export default React.memo(DateInput);