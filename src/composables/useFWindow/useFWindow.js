import { ref } from 'vue';
import { exposeMethods } from '@/utils/index.js';
import { useMethods } from '@/composables/index.js';

/**
 * @param {string} id Id for exposing and using methods
 * @param {Object} windowRef Vue reference to FWindow component
 * @return {{exposeFWindowMethods: function, title: Ref, backButtonComponentId: Ref}}
 */
function registerFWindowMethodsAndRefs(id = '', windowRef = null) {
    const ret = {};
    const title = ref('');
    const backButtonComponentId = ref('');

    function setTitle(text) {
        title.value = text;
    }

    function setBackButtonComponentId(props) {
        backButtonComponentId.value = props;
    }

    function exposeFWindowMethods() {
        return exposeMethods(windowRef, ['show', 'hide', 'isWindowVisible']);
    }

    ret.exposeFWindowMethods = exposeFWindowMethods;

    if (id) {
        const { registerMethods } = useMethods(id, true);

        registerMethods({ setTitle, setBackButtonComponentId });

        ret.title = title;
        ret.backButtonComponentId = backButtonComponentId;
    }

    return ret;
}

/**
 * Helpers for FWindow component
 *
 * @param {string} id Id for exposing and using methods
 * @param {Object} windowRef Vue reference to FWindow component
 * @return {{setTitle: function, setBackButtonComponentId: function, exposeFWindowMethods: function, title: Ref, backButtonComponentId: Ref}}
 */
export function useFWindow(id = '', windowRef = null) {
    let ret = {};
    const { setTitle, setBackButtonComponentId } = useMethods(id).getMethods();

    if (windowRef) {
        ret = registerFWindowMethodsAndRefs(id, windowRef);
    } else {
        ret = { setTitle, setBackButtonComponentId };
    }

    return ret;
}
