import React, {FC, useCallback} from 'react';
import TextInput from "../reusable/form/TextInput";
import RemoveButton from "../reusable/RemoveButton";

interface SearchProps {
    value: string,
    onSearch: (value: string) => void
}

const Search:FC<SearchProps> = ({ value, onSearch }) => {

    const removeSearchHandler = useCallback(() => {
        onSearch('')
    }, [onSearch])

    const searchHandler = useCallback((newValue) => {
        onSearch(newValue)
    }, [onSearch])

    return (
        <div className="relative w-[60%] mr-3">
            <TextInput
                name='search'
                value={value}
                onChange={({ value: newValue }) => searchHandler(newValue)}
                placeholder='Введите задачу'
            />
            {value && (
                <RemoveButton onClick={removeSearchHandler} classes="absolute top-[11px] right-[10px] w-[16px] h-[16px] flex justify-center items-center bg-gray-500 text-white rounded-full px-1 text-[13px] text-center hover:bg-gray-700" />
            )}
        </div>

    );
};

export default React.memo(Search);