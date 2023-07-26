import { memo } from 'react';

import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

const Navbar = memo(({ className = '' }: NavbarProps) => {
    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <h1>To-Do List</h1>
            <ThemeSwitcher />
        </header>
    );
});

export { Navbar };
