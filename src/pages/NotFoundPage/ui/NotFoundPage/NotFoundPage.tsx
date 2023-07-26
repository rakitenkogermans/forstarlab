import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
}

const NotFoundPage = memo(({ className = '' }: NotFoundPageProps) => {
    return (
        <Page
            data-testid={'NotFoundPage'}
            className={classNames(cls.NotFoundPage, {}, [className])}
        >
            Page not found
        </Page>
    );
});

export { NotFoundPage };
