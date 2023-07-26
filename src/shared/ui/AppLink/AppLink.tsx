import { memo, type PropsWithChildren } from 'react';

import { Link, type LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
}

const AppLink = memo((props: PropsWithChildren<AppLinkProps>) => {
    const { to, className = '', children, theme = AppLinkTheme.PRIMARY, ...otherProps } = props;

    return (
        <Link
            to={to}
            {...otherProps}
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
        >
            {children}
        </Link>
    );
});

export { AppLink };
