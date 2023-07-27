import { lazy } from 'react';

export const WelcomePageLazy = lazy(async () => await import('./WelcomePage'));
