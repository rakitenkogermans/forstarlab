import { Suspense, useMemo } from 'react';

import { Route, Routes } from 'react-router-dom';

import { PageLoader } from '@/widgets/PageLoader';

import { RequireAuth } from './RequireAuth';
import { Layout } from '../../../Layout';
import { routeConfig } from '../config/routeConfig';

const AppRouter = () => {
    const router = useMemo(() => {
        return Object.values(routeConfig).map(({ element, path, authOnly, roles }) => {
            const el = <Suspense fallback={<PageLoader />}>{element}</Suspense>;

            return (
                <Route
                    key={path}
                    path={path}
                    element={authOnly ? <RequireAuth roles={roles}>{el}</RequireAuth> : el}
                />
            );
        });
    }, []);

    return (
        <Routes>
            <Route element={<Layout />}>{router}</Route>
        </Routes>
    );
};

export { AppRouter };
