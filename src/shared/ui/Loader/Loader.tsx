import { type FC } from 'react';
import './Loader.scss';

interface LoaderProps {
    className?: string;
}

const Loader: FC<LoaderProps> = ({ className = '' }) => {
    return (
        <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export { Loader };
