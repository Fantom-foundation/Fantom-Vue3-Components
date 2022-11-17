import { ref } from 'vue';
import { exposeMethods } from '../../utils/index.js';
import { useMethods } from '../index.js';

/**
 * @param {string} id Id for exposing and using methods
 * @param {Object} popoverRef Vue reference to FPopover component
 * @return {{hideOnDocumentMousedown: Ref, exposeFPopoverMethods: function}}
 */
function registerFPopoverMethodsAndRefs(id = '', popoverRef = null) {
    const ret = {};
    const hideOnDocumentMousedown = ref(true);

    function disableHiding() {
        if (popoverRef.value.isWindowVisible()) {
            hideOnDocumentMousedown.value = false;
        }
    }

    function enableHiding() {
        hideOnDocumentMousedown.value = true;
    }

    function show() {
        popoverRef.value.show();
    }

    function hide() {
        popoverRef.value.hide();
    }

    function exposeFPopoverMethods() {
        return exposeMethods(popoverRef, ['show', 'hide', 'toggle', 'isWindowVisible']);
    }

    ret.exposeFPopoverMethods = exposeFPopoverMethods;

    if (id) {
        const { registerMethods } = useMethods(id, true);
        registerMethods({ disableHiding, enableHiding, show, hide });

        ret.hideOnDocumentMousedown = hideOnDocumentMousedown;
    }

    return ret;
}

/**
 * Helpers for FPopover component
 *
 * @param {string} id Id for exposing and using methods
 * @param {Object} popoverRef Vue reference to FPopover component
 * @return {{enablePopoverHiding: function, disablePopoverHiding: function, hideOnDocumentMousedown: Ref, exposeFPopoverMethods: function}}
 */
export function useFPopover(id = '', popoverRef = null) {
    let ret = {};
    const { disableHiding, enableHiding, show, hide } = useMethods(id).getMethods();

    function enablePopoverHiding(hidePopover = false) {
        if (enableHiding) {
            enableHiding();
        }

        if (hide && hidePopover) {
            hide();
        }
    }

    function disablePopoverHiding() {
        if (disableHiding) {
            disableHiding();
        }
    }

    if (popoverRef) {
        ret = registerFPopoverMethodsAndRefs(id, popoverRef);
    } else if (id) {
        ret = { enablePopoverHiding, disablePopoverHiding, show, hide };
    }

    return ret;
}
