import { memo } from 'react';

import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack } from '@/shared/ui/Stack';

interface TaskListSkeletonProps {
    className?: string;
}

const TaskListSkeleton = memo((props: TaskListSkeletonProps) => {
    const { className } = props;

    return (
        <HStack
            max
            gap={'16'}
        >
            <Skeleton
                width={'100%'}
                height={'80px'}
            />
            <Skeleton
                width={'100px'}
                height={'80px'}
            />
            <Skeleton
                width={'100px'}
                height={'80px'}
            />
        </HStack>
    );
});

export { TaskListSkeleton };
