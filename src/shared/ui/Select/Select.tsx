import { type ChangeEvent, useMemo } from 'react';

import { typedMemo } from '@/shared/const/typedMemo';
import { classNames, type Mods } from '@/shared/lib/classNames/classNames';

import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    id?: string;
    name?: string;
    value?: T;
    options?: Array<SelectOption<T>>;
    onChange?: (value: T) => void;
    readonly?: boolean;
}

const Select = typedMemo(<T extends string>(props: SelectProps<T>) => {
    const { className, label, id, name, value, options, readonly, onChange } = props;

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    const optionsList = useMemo(() => {
        return options?.map((opt) => (
            <option
                key={opt.value}
                className={cls.option}
                value={opt.value}
            >
                {opt.content}
            </option>
        ));
    }, [options]);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
    };

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && (
                <label
                    className={cls.label}
                    htmlFor={id}
                >
                    {`${label}>`}
                </label>
            )}
            <select
                disabled={readonly}
                name={name}
                id={id}
                value={value}
                className={cls.select}
                onChange={onChangeHandler}
            >
                {optionsList}
            </select>
        </div>
    );
});

export { Select };
