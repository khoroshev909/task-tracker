import React, {useCallback} from 'react';
import Button from "../reusable/Button";
import {useHistory} from "react-router-dom";

const TasksNotFound = () => {
    const history = useHistory()
    const clickHandler = useCallback(() => history.push('/tasks/add'), [history])

    return (
        <div className="flex justify-center">
            <Button
                text="Добавьте первую задачу"
                onClick={clickHandler}
                classes="flex items-center mt-5 p-2 rounded-lg text-white text-sm font-medium bg-[#7192BE] shadow-md hover:cursor-pointer hover:bg-[#255DA5]"/>
        </div>
    );
};

export default React.memo(TasksNotFound);