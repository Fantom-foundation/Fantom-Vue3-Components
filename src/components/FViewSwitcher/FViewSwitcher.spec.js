import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { destroyWrapper } from '@/test/utils.js';
import FViewSwitcher from './FViewSwitcher.vue';
import { nextTick, markRaw } from 'vue';
import { useMethods } from '@/composables/index.js';

const ID = 'testid123';
let wrapper = null;

const Component1 = {
    template: `<div data-testid="component1"></div>`,
};

const Component2 = {
    template: `<div data-testid="component2"></div>`,
};

const Component3 = {
    template: `<div data-testid="component3"></div>`,
};

function APP_STRUCTURE() {
    return [
        {
            id: 'Component1',
            type: 'component',
            _c: [
                {
                    id: 'Component3',
                    type: 'component',
                },
            ],
        },
        {
            id: 'Component2',
            type: 'component',
        },
    ];
}

function createWrapper(options = {}) {
    return mount(FViewSwitcher, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FViewSwitcher', () => {
    describe('switcher dealing with components', () => {
        it('should display default component', () => {
            wrapper = createWrapper({
                props: {
                    defaultComponent: 'Component1',
                    components: { Component1: markRaw(Component1) },
                    id: ID,
                },
            });

            expect(wrapper.findComponent(Component1).exists()).toBe(true);
        });

        it('should display first found component in `components` object if no default component is given', () => {
            wrapper = createWrapper({
                props: {
                    components: { Component1: markRaw(Component1) },
                    id: ID,
                },
            });

            expect(wrapper.findComponent(Component1).exists()).toBe(true);
        });

        it('should throw an error if component is not found', () => {
            expect(() => {
                wrapper = createWrapper({
                    props: {
                        defaultComponent: 'Component1',
                        id: ID,
                    },
                });
            }).toThrowError();
        });

        it('should switch components', async () => {
            wrapper = createWrapper({
                props: {
                    defaultComponent: 'Component1',
                    components: {
                        Component1: markRaw(Component1),
                        Component2: markRaw(Component2),
                    },
                    id: ID,
                },
            });

            wrapper.vm.switchTo('Component2');

            await nextTick();

            expect(wrapper.findComponent(Component2).exists()).toBe(true);
        });

        it('should switch components by calling `switchTo` method outside of the component', async () => {
            wrapper = createWrapper({
                props: {
                    defaultComponent: 'Component1',
                    components: {
                        Component1: markRaw(Component1),
                        Component2: markRaw(Component2),
                    },
                    id: ID,
                },
            });

            const { switchTo } = useMethods(ID).getMethods();
            if (switchTo) {
                switchTo('Component2');
            }

            await nextTick();
            expect(wrapper.findComponent(Component2).exists()).toBe(true);
        });

        it('should be able to switch to parent component if appStructure is given', async () => {
            wrapper = createWrapper({
                props: {
                    defaultComponent: 'Component2',
                    appStructure: APP_STRUCTURE(),
                    components: {
                        Component1: markRaw(Component1),
                        Component2: markRaw(Component2),
                        Component3: markRaw(Component3),
                    },
                    id: ID,
                },
            });

            const { goBack } = useMethods(ID).getMethods();
            if (goBack) {
                goBack('Component3');
            }

            await nextTick();
            expect(wrapper.findComponent(Component1).exists()).toBe(true);
        });
    });

    describe.todo('switcher with transitions', () => {
        it('should take a components structure and make a transition between components');
    });

    describe.todo('switching routes');
});