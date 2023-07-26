import { type FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/Loader';

import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

const PageLoader: FC<PageLoaderProps> = ({ className = '' }) => {
    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Loader />
        </div>
    );
};

export { PageLoader };
