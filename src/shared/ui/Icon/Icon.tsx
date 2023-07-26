import { type FC, memo, type SVGProps } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string;
    Svg: FC<SVGProps<SVGSVGElement>>;
}

const Icon = memo((props: IconProps) => {
    const { className, Svg, ...otherProps } = props;
    return (
        <Svg
            className={classNames(cls.Icon, {}, [className])}
            {...otherProps}
        />
    );
});

export { Icon };
