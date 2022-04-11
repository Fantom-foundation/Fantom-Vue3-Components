import { vi } from 'vitest';

export function spyDateNow(date) {
    return vi.spyOn(Date, 'now').mockImplementation(() => (typeof date === 'function' ? date() : date));
}
