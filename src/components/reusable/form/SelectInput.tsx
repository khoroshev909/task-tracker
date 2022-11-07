import React, {ChangeEvent, FC} from 'react';

interface SelectOption {
    id: string,
    title: string
}

type SelectValue = SelectOption['id'];
type SelectName = ISelectInput<SelectOption> ['name']

interface ISelectInput<SelectOption> {
    name: string,
    value?: string,
    onChange?: (field: { value: SelectValue, name: SelectName }) => void,
    error?: string | null,
    options: SelectOption[],
    id?: string,
    label?: string,
    type?: string
}

const SelectInput:FC<ISelectInput<SelectOption>> = ({name, type = 'select', value = '', options,id, label, error = '', onChange = ({}) => null }) => {

    const changeHandler = (e:ChangeEvent<HTMLSelectElement>) => {
        onChange({ name: e.target.name, value: e.target.value });
    };

    return (
        <div className="mb-1">
            <label htmlFor={id} className="text-gray-500 text-sm">{label}</label>
            <select
                id={id}
                name={name}
                defaultValue={value}
                // value={value}
                onChange={changeHandler}
                className="block w-full outline-0 bg-gray-50 border border-gray-500 text-gray-700 font-semibold text-sm p-2 rounded-lg focus:ring-[#255DA5] focus:border-[#255DA5]">
                {options.map((item ) => (
                    <option
                        key={item.id}
                        value={item.id} >
                        {item.title}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-red-500 text-xs font-bold">{error}</p>
            )}
        </div>
    );
};

export default React.memo(SelectInput);