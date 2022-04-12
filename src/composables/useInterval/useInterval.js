import { Interval } from '../../utils/interval/Interval.js';
import { usePageVisibility } from '../usePageVisibility/usePageVisibility.js';
import { onUnmounted, watchEffect } from 'vue';

/**
 * @param {boolean} pauseWhenPageIsHidden Pause all intervals when page is not visible
 * @return {{interval: Interval}}
 */
export function useInterval(pauseWhenPageIsHidden = false) {
    /** @type {Interval} */
    const interval = new Interval();

    if (pauseWhenPageIsHidden) {
        const { isPageVisible } = usePageVisibility();

        watchEffect(() => {
            if (!isPageVisible.value) {
                interval.pauseAll();
            } else {
                interval.resumeAll();
            }
        });
    }

    onUnmounted(() => {
        interval.destroy();
    });

    return {
        interval,
    };
}
