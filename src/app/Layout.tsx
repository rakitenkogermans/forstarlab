import { Outlet } from 'react-router-dom';

import { Navbar } from '@/widgets/Navbar';

const Layout = () => {
    return (
        <>
            <Navbar />
            <div className="content-page">
                <Outlet />
            </div>
        </>
    );
};

export { Layout };
