import { render, screen } from '@testing-library/react';

import { Button, ButtonTheme } from './Button';

describe('Button component tests', function () {
    test('simply button', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });
    test('button with theme clear', () => {
        render(<Button theme={ButtonTheme.CLEAR}>TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
        screen.debug();
    });
});
