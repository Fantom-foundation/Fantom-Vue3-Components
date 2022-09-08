import { describe, it, expect } from 'vitest';
import { implementsInterface } from './interface.js';

class TestClass {
    prop1 = 'prop1';

    method1() {}
    method2() {}
    static staticMethod() {}
}

describe('#implementsInterface', () => {
    it('should return true when a class implements an interface', () => {
        const interf = ['method1', 'method2', 'staticMethod', 'name:property'];

        expect(implementsInterface(TestClass, interf)).toBe(true);
    });

    it('should return true when an instance of a class implements an interface', () => {
        const tc = new TestClass();
        const interf = ['method1', 'method2', 'prop1:property'];

        expect(implementsInterface(tc, interf)).toBe(true);
    });

    it('should throw an error when a class does not implement interface', () => {
        expect(() => {
            const interf = ['method1', 'method2', 'method3'];

            implementsInterface(TestClass, interf);
        }).toThrowError();
    });

    it('should throw an error when an instance of a class does not implement interface', () => {
        expect(() => {
            const tc = new TestClass();
            const interf = ['method1', 'method2', 'prop2:property'];

            implementsInterface(tc, interf);
        }).toThrowError();
    });
});
