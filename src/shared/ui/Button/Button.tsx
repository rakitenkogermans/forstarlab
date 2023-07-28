import { type ButtonHTMLAttributes, type HTMLAttributes, memo } from 'react';

import cls from './Button.module.scss';
import { classNames, type Mods } from '../../lib/classNames/classNames';

export enum ButtonTheme {
    CLEAR = 'clear',
    DELETE = 'delete',
    EDIT = 'edit',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

type HTMLTag = ButtonHTMLAttributes<HTMLButtonElement> & HTMLAttributes<HTMLDivElement>;

interface ButtonProps extends HTMLTag {
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    asDiv?: boolean;
    fullWidth?: boolean;
}

const Button = memo((props: ButtonProps) => {
    const {
        className = '',
        children,
        theme = ButtonTheme.CLEAR,
        square,
        size = ButtonSize.M,
        disabled,
        fullWidth,
        asDiv,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
    };

    const Tag = asDiv ? 'div' : 'button';

    return (
        <Tag
            type="button"
            className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </Tag>
    );
});

export { Button };
