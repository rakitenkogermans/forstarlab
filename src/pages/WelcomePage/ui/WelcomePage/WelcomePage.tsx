import { memo } from 'react';

import { useNavigate } from 'react-router-dom';

import { getRouteTasks } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';

import cls from './WelcomePage.module.scss';

interface WelcomePageProps {
    className?: string;
}

const WelcomePage = memo((props: WelcomePageProps) => {
    const { className } = props;
    const navigate = useNavigate();

    return (
        <div className={classNames(cls.WelcomePage, {}, [className])}>
            <h1>Welcome to your To-Do List</h1>
            <p>Stay organized and productive with our simple and intuitive to-do list app.</p>
            <Button
                onClick={() => {
                    navigate(getRouteTasks());
                }}
                theme={ButtonTheme.BACKGROUND}
                size={ButtonSize.XL}
                className="get_started_btn"
            >
                Get Started
            </Button>
        </div>
    );
});

export default WelcomePage;
