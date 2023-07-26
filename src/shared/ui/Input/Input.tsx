import { type ChangeEvent, type InputHTMLAttributes, memo, useEffect, useRef } from 'react';

import { classNames, type Mods } from '@/shared/lib/classNames/classNames';

import cls from './Input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readonly'
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    label?: string;
    autoFocus?: boolean;
    readonly?: boolean;
}

const Input = memo((props: InputProps) => {
    const {
        className = '',
        value,
        onChange,
        type = 'text',
        placeholder,
        label,
        id,
        name,
        autoFocus,
        readonly,
        ...otherProps
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (autoFocus) {
            inputRef.current?.focus();
        }
    }, [autoFocus]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    return (
        <input
            ref={inputRef}
            value={value}
            onChange={onChangeHandler}
            type={type}
            id={id}
            name={name}
            className={classNames(cls.Input, mods, [className])}
            readOnly={readonly}
            {...otherProps}
        />
    );
});

export { Input };
