import { type ReactNode } from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { THEME } from '@/shared/const/theme';
import '@/app/styles/index.scss';

export interface componentRenderOptions {
    route?: string;
    theme?: THEME;
}

interface TestProviderProps {
    children: ReactNode;
    options?: componentRenderOptions;
}

export const TestProvider = (props: TestProviderProps) => {
    const { options = {}, children } = props;
    const { route = '/', theme = THEME.LIGHT } = options;
    return (
        <MemoryRouter initialEntries={[route]}>
            <ThemeProvider initialTheme={theme}>
                <div className={`app ${theme}`}>{children}</div>
            </ThemeProvider>
        </MemoryRouter>
    );
};

export const componentRender = (component: ReactNode, options: componentRenderOptions = {}) => {
    const { route = '/' } = options;

    return render(<TestProvider options={options}>{component}</TestProvider>);
};
