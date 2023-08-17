import { describe, it, expect } from 'vitest';
import { Implements, implementsInterface } from './Implements.js';

class MyInterface {
    method1() {}
    method2() {}
    static staticMethod() {}
}

describe('implementsInterface()', () => {
    it('should throw an error if class does not implement the interface', () => {
        class MyClass {
            myClassMethod1() {}
        }

        expect(() => {
            implementsInterface(MyInterface, MyClass, new MyClass());
        }).toThrowError(
            'The following methods are not implemented in the MyClass class : method1, method2, static staticMethod'
        );
    });

    it('should not throw an error if class implements all methods', () => {
        class MyClass {
            myClassMethod1() {}
            method1() {}
            method2() {}
            static staticMethod() {}
        }

        expect(() => {
            implementsInterface(MyInterface, MyClass, new MyClass());
        }).not.toThrowError();
    });

    it('should check interface only once', () => {
        class MyClass {
            myClassMethod1() {}
        }

        expect(() => {
            implementsInterface(MyInterface, MyClass, new MyClass());
        }).toThrowError();

        expect(() => {
            implementsInterface(MyInterface, MyClass, new MyClass());
        }).not.toThrowError();
    });
});

describe('Implements mixin', () => {
    it('should throw an error if class does not implement the interface', () => {
        class MyClass extends Implements(MyInterface) {
            myClassMethod1() {}
        }

        expect(() => {
            new MyClass();
        }).toThrowError(
            'The following methods are not implemented in the MyClass class : method1, method2, static staticMethod'
        );
    });

    it('should not throw an error if class implements all methods', () => {
        class MyClass extends Implements(MyInterface) {
            myClassMethod1() {}
            method1() {}
            method2() {}
            static staticMethod() {}
        }

        expect(() => {
            new MyClass();
        }).not.toThrowError();
    });

    it('should check interface only once', () => {
        class MyClass extends Implements(MyInterface) {
            myClassMethod1() {}
        }

        expect(() => {
            new MyClass();
        }).toThrowError();

        expect(() => {
            new MyClass();
        }).not.toThrowError();
    });
});
