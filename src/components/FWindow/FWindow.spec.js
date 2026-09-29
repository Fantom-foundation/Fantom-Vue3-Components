import { describe, it, expect, afterEach } from 'vitest';
import { destroyWrapper } from '@/test/utils.js';
import { mount } from '@vue/test-utils';
import FWindow from '@/components/FWindow/FWindow.vue';

let wrapper = null;

function createWrapper(options = {}) {
    return mount(FWindow, {
        attachTo: document.body,
        ...options,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FWindow', () => {
    describe('`keepMounted` prop', () => {
        it('should have `keepMounted` set to false by default', () => {
            wrapper = createWrapper();

            expect(wrapper.vm.keepMounted).toBe(false);
        });

        it('should destroy content when window hides if `keepMounted` is false', async () => {
            wrapper = createWrapper({
                slots: {
                    default: '<div class="test-content">Content</div>',
                },
            });

            await wrapper.showWindow();
            expect(wrapper.vm.isMounted).toBe(true);
            expect(wrapper.find('.test-content').exists()).toBe(true);

            await wrapper.hideWindow();
            wrapper.vm.onAfterLeaveAnim();
            await wrapper.vm.$nextTick();

            expect(wrapper.vm.isMounted).toBe(false);
            expect(wrapper.find('.test-content').exists()).toBe(false);
        });

        it('should keep content mounted when window hides if `keepMounted` is true', async () => {
            wrapper = createWrapper({
                props: {
                    keepMounted: true,
                },
                slots: {
                    default: '<div class="test-content">Content</div>',
                },
            });

            await wrapper.showWindow();
            expect(wrapper.vm.isMounted).toBe(true);
            expect(wrapper.find('.test-content').exists()).toBe(true);

            await wrapper.hideWindow();
            wrapper.vm.onAfterLeaveAnim();
            await wrapper.vm.$nextTick();

            expect(wrapper.vm.isMounted).toBe(true);
            expect(wrapper.find('.test-content').exists()).toBe(true);
            expect(wrapper.vm.isVisible).toBe(false);
            expect(wrapper.find('.fwindow').isVisible()).toBe(false);
        });

        it('should unmount content if `keepMounted` is set to false while window is hidden', async () => {
            wrapper = createWrapper({
                props: {
                    keepMounted: true,
                },
                slots: {
                    default: '<div class="test-content">Content</div>',
                },
            });

            await wrapper.showWindow();
            await wrapper.hideWindow();
            wrapper.vm.onAfterLeaveAnim();
            await wrapper.vm.$nextTick();

            expect(wrapper.vm.isMounted).toBe(true);
            expect(wrapper.find('.test-content').exists()).toBe(true);

            await wrapper.setProps({ keepMounted: false });
            await wrapper.vm.$nextTick();

            expect(wrapper.vm.isMounted).toBe(false);
            expect(wrapper.find('.test-content').exists()).toBe(false);
        });

        it('should not destroy child component across show/hide cycles when `keepMounted` is true', async () => {
            let unmountedCount = 0;
            const ChildComponent = {
                template: '<div class="child-comp">child</div>',
                unmounted() {
                    unmountedCount += 1;
                },
            };

            const TestApp = {
                components: { FWindow, ChildComponent },
                template: `
                    <FWindow ref="win" keep-mounted>
                        <ChildComponent />
                    </FWindow>
                `,
            };

            wrapper = mount(TestApp, { attachTo: document.body });
            const win = wrapper.findComponent(FWindow);

            await win.showWindow();
            expect(wrapper.find('.child-comp').exists()).toBe(true);

            await win.hideWindow();
            win.vm.onAfterLeaveAnim();
            await win.vm.$nextTick();

            expect(unmountedCount).toBe(0);
            expect(wrapper.find('.child-comp').exists()).toBe(true);

            await win.showWindow();
            expect(unmountedCount).toBe(0);
            expect(wrapper.find('.child-comp').exists()).toBe(true);
        });

        it('should destroy child component across show/hide cycles when `keepMounted` is false', async () => {
            let unmountedCount = 0;
            const ChildComponent = {
                template: '<div class="child-comp">child</div>',
                unmounted() {
                    unmountedCount += 1;
                },
            };

            const TestApp = {
                components: { FWindow, ChildComponent },
                template: `
                    <FWindow ref="win">
                        <ChildComponent />
                    </FWindow>
                `,
            };

            wrapper = mount(TestApp, { attachTo: document.body });
            const win = wrapper.findComponent(FWindow);

            await win.showWindow();
            expect(wrapper.find('.child-comp').exists()).toBe(true);

            await win.hideWindow();
            win.vm.onAfterLeaveAnim();
            await win.vm.$nextTick();

            expect(unmountedCount).toBe(1);
            expect(wrapper.find('.child-comp').exists()).toBe(false);
        });
    });
});
