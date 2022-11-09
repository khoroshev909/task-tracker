import React, {FC, useMemo} from 'react';
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

    const isDisabled = useMemo(() => search !== ''
        ? true
        : filter !== null, [search, filter])

    return (
        <CheckboxInput
            id={id}
            checked={checked}
            label={label}
            onCheck={onCheck}
            disabled={isDisabled}/>
    );
};

export default React.memo(CheckboxHideFinished);