import { vi } from 'vitest';

let location;

export function windowLocationMock() {
    location = window.location;
    delete window.location;

    window.location = {
        ...location,
        assign: vi.fn(),
        replace: vi.fn(),
        reload: vi.fn(),
        toString: vi.fn(),
    };
}

export function windowLocationMockRestore() {
    if (location) {
        window.location = location;
    }
}
