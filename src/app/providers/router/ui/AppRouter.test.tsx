import '@/shared/lib/tests/mocks/matchMedia.mock';

import { screen } from '@testing-library/react';

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

import { AppRouter } from './AppRouter';

describe('app/router/AppRouter', () => {
    test('Page not found', async () => {
        componentRender(<AppRouter />, {
            route: '/asadsddass',
        });

        const page = await screen.findByTestId('NotFoundPage');
        expect(page).toBeInTheDocument();
    });
});
