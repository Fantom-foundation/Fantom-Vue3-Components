import { onMounted, onUnmounted, ref } from 'vue';

export function usePageVisibility() {
    let isPageVisible = ref(true);

    function _isPageVisible() {
        return document.visibilityState === 'visible';
    }

    function onVisibilityChange() {
        isPageVisible.value = _isPageVisible();
    }

    onMounted(() => {
        isPageVisible.value = _isPageVisible();

        document.addEventListener('visibilitychange', onVisibilityChange);
    });

    onUnmounted(() => {
        document.removeEventListener('visibilitychange', onVisibilityChange);
    });

    return {
        isPageVisible,
    };
}
