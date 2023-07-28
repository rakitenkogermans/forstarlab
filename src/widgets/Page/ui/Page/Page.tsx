import { type ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { type TestProps } from '@/shared/types/tests';

import cls from './Page.module.scss';

interface PageProps extends TestProps {
    className?: string;
    children: ReactNode;
}

const Page = (props: PageProps) => {
    const { className, children } = props;

    return (
        <main
            className={classNames(cls.Page, {}, [className])}
            data-testid={props['data-testid'] ?? 'Page'}
        >
            <div className={cls.container}>{children}</div>
        </main>
    );
};

export { Page };
