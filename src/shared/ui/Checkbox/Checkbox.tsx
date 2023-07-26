import { type ChangeEvent, memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Checkbox.module.scss';

interface CheckboxProps {
    className?: string;
    checked: boolean;
    onChange?: (value: string) => void;
}

const Checkbox = memo((props: CheckboxProps) => {
    const { className, checked, onChange } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <label className={classNames(cls.Checkbox, {}, [className])}>
            <label className={cls.checkbox_container}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChangeHandler}
                    className={cls.checkbox_input}
                />
                <div className={cls.checkbox_custom}></div>
            </label>
        </label>
    );
});

export { Checkbox };
