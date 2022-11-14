import { useEventBus } from '@vueuse/core';

/**
 * @return {{onComponentUpdate: onComponentUpdate, updateComponents: updateComponents}}
 */
export function useComponentUpdate() {
    const bus = useEventBus('components-update');

    const onComponentUpdate = (componentId, func) => {
        bus.on((componentIds = []) => {
            if (componentIds.includes(componentId)) {
                func();
            }
        });
    };

    const updateComponents = (componentIds = []) => {
        bus.emit(componentIds);
    };

    return {
        onComponentUpdate,
        updateComponents,
    };
}
