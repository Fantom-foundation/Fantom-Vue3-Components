import { describe, it, expect } from 'vitest';
import { AsyncComponents } from './AsyncComponents.js';

/**
 * Stores async vue components by name
 */
describe('AsyncComponents', () => {
    it('should register one async component', () => {
        const MyComponent = { id: 1 };

        AsyncComponents.register('MyComponent', MyComponent);

        expect(AsyncComponents.get('MyComponent')).toEqual(MyComponent);
    });

    it('should register bunch of async components', () => {
        const MyComponent = { id: 1 };
        const MyComponent2 = { id: 2 };

        AsyncComponents.registerComponents({
            MyComponent,
            MyComponent2,
        });

        expect(AsyncComponents.get('MyComponent')).toEqual(MyComponent);
        expect(AsyncComponents.get('MyComponent2')).toEqual(MyComponent2);
    });
});
