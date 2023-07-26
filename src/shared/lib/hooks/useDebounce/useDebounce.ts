import { type MutableRefObject, useCallback, useRef } from 'react';

export const useDebounce = (cb: (...args: any[]) => void, delay: number) => {
    const timerRef: MutableRefObject<any> = useRef();

    return useCallback(
        (...args: any[]) => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                // eslint-disable-next-line n/no-callback-literal
                cb(...args);
            }, delay);
        },
        [cb, delay],
    );
};
