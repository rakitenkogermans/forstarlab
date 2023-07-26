import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = memo((props: ForbiddenPageProps) => {
    const { className } = props;

    return (
        <Page
            data-testid={'ForbiddenPage'}
            className={classNames('', {}, [className])}
        >
            {"You don't have access to this pages!"}
        </Page>
    );
});

export default ForbiddenPage;
