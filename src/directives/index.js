import { findParentByName } from '../utils/vue-helpers.js';
import { getCurrentInstance } from 'vue';

function fWindowHideOnClick(event, elem, binding, vnode) {
    const fWindow = findParentByName(vnode, 'FWindow');

    console.log('!!!', getCurrentInstance());
    console.log(JSON.stringify(vnode));

    if (fWindow) {
        fWindow.hide();
    }
}

const FWindownHideDirective = {
    mounted(elem, binding, vnode) {
        binding._fWindowHideOnClick = (event) => {
            fWindowHideOnClick(event, elem, binding, vnode);
        };
        elem.addEventListener('click', binding._fWindowHideOnClick);
    },

    beforeUnmount(elem, binding) {
        elem.removeEventListener('click', binding._fWindowHideOnClick);
    },
};

export function installDirectives(app) {
    app.directive('fwindow-hide', FWindownHideDirective);
}
