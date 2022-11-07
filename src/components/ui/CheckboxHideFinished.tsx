import React, {FC} from 'react';
import CheckboxInput from "../reusable/form/CheckboxInput";
import {useAppSelector} from "../../hooks/useStore";

interface CheckboxInputProps {
    id: string
    checked: boolean
    search: string
    label: string
    onCheck: () => void
}

const CheckboxHideFinished:FC<CheckboxInputProps> = ({ id, checked, search, label, onCheck  }) => {

    const { filter } = useAppSelector(state => state.tasks)

    const isDisabled = search !== ''
        ? true
        : filter !== null

    return (
        <CheckboxInput
            id={id}
            checked={checked}
            label={label}
            onCheck={onCheck}
            disabled={isDisabled}/>
    );
};

export default CheckboxHideFinished;