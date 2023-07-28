declare module '*.scss' {
    type IClassNames = Record<string, string>;
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
    import { type FC, type SVGProps } from 'react';
    const SVG: FC<SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare const __API__: string;

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
