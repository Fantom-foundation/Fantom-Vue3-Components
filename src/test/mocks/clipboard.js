import { vi } from 'vitest';

Object.defineProperty(navigator, 'clipboard', {
    writable: true,
    value: {
        writeText: vi.fn(() => {
            return new Promise((resolve) => {
                resolve();
            });
        }),
    },
});
