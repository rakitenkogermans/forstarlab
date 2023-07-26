import { type MutableRefObject, type ReactNode, useRef } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { type TestProps } from '@/shared/types/tests';

import cls from './Page.module.scss';

interface PageProps extends TestProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

const Page = (props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    // const dispatch = useAppDispatch();
    // const { pathname } = useLocation();
    // const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname));
    //
    // useInfiniteScroll({
    //     triggerRef,
    //     wrapperRef,
    //     callback: onScrollEnd,
    // });
    //
    // useInitialEffect(() => {
    //     wrapperRef.current.scrollTop = scrollPosition;
    // });
    //
    // const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    //     dispatch(
    //         uiActions.setScrollPosition({
    //             position: e.currentTarget.scrollTop,
    //             path: pathname,
    //         }),
    //     );
    // }, 500);

    return (
        <main
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
            data-testid={props['data-testid'] ?? 'Page'}
        >
            <div className={cls.container}>
                {children}
                {onScrollEnd ? (
                    <div
                        className={cls.trigger}
                        ref={triggerRef}
                    />
                ) : null}
            </div>
        </main>
    );
};

export { Page };
