import { getAttr, setAttr } from './DOM.js';

const RECEIVE_FOCUS_FROM_ATTR = 'data-receive-focus-from';

const KEY_EVENTS = {
    keyup: null,
    keydown: null,
};

/**
 * @param {string} key Name of the key or 'Shift|Ctrl|Alt|Meta+key_name'
 * @param {KeyboardEvent} event
 * @return {boolean}
 */
export function isKey(key, event) {
    let isKey = false;
    const ks = key.split('+');
    let k = key;

    if (ks.length === 2) {
        k = ks[1];
    }

    if (event) {
        switch (event.key) {
            case 'Esc': // IE/Edge
            case 'Escape':
                isKey = k === 'Escape';
                break;
            case 'Up': // IE/Edge
            case 'ArrowUp':
                isKey = k === 'ArrowUp';
                break;
            case 'Right': // IE/Edge
            case 'ArrowRight':
                isKey = k === 'ArrowRight';
                break;
            case 'Left': // IE/Edge
            case 'ArrowLeft':
                isKey = k === 'ArrowLeft';
                break;
            case 'Down': // IE/Edge
            case 'ArrowDown':
                isKey = k === 'ArrowDown';
                break;
            case 'Spacebar': // IE/Edge
            case ' ':
                isKey = k === ' ';
                break;
            default:
                isKey = k === event.key;
        }

        if (isKey && ks.length === 2) {
            switch (ks[0]) {
                case 'Shift':
                    isKey = event.shiftKey;
                    break;
                case 'Ctrl':
                    isKey = event.ctrlKey;
                    break;
                case 'Alt':
                    isKey = event.altKey;
                    break;
                case 'Meta': // mac
                    isKey = event.metaKey;
                    break;
            }
        }
    }

    return isKey;
}

/**
 * Is element visible? Fast method, but not accurate, if fixed element is on page.
 * (window.getComputedStyle(el) (style.display === 'none') -> much slower).
 *
 * @param {HTMLElement} _elem
 * @return {boolean}
 */
export function isVisible(_elem) {
    return !!_elem && _elem.offsetParent !== null;
}

/**
 * @param {HTMLElement} _elem
 * @return {boolean}
 */
export function isFocusable(_elem) {
    let focusable = false;

    if (!_elem || _elem.disabled) {
        return false;
    }

    switch (_elem.nodeName) {
        case 'INPUT':
            focusable = _elem.type !== 'hidden' && _elem.type !== 'file';
            break;
        case 'A':
            focusable = !!_elem.href && _elem.rel !== 'ignore';
            break;
        case 'BUTTON':
        case 'SELECT':
        case 'TEXTAREA':
            focusable = true;
            break;
        default:
            focusable = false;
    }

    if (!focusable) {
        focusable = _elem.tabIndex > 0 || (_elem.tabIndex === 0 && _elem.getAttribute('tabIndex') !== null);
    }

    if (focusable) {
        focusable = isVisible(_elem);
    }

    return focusable;
}

/**
 * @param {HTMLElement} _elem
 * @return {HTMLElement|null}
 */
export function findFirstFocusableDescendant(_elem) {
    let focusableElem = null;
    let childNodes;
    let child;

    if (_elem) {
        childNodes = _elem.assignedNodes ? _elem.assignedNodes() : _elem.childNodes;

        // Edge/IE
        if (!childNodes && _elem.assignedNodes) {
            childNodes = _elem.childNodes;
        }

        if (childNodes) {
            for (let i = 0, len1 = childNodes.length; i < len1; i += 1) {
                child = childNodes[i];
                if (child.nodeType === 1) {
                    if (isFocusable(child)) {
                        focusableElem = child;
                        break;
                    } else {
                        focusableElem = findFirstFocusableDescendant(child);
                        if (focusableElem) {
                            break;
                        }
                    }
                }
            }
        }
    }

    return focusableElem;
}

/**
 * @param {HTMLElement} _elem
 * @return {HTMLElement|null}
 */
export function findLastFocusableDescendant(_elem) {
    let focusableElem = null;
    let childNodes;
    let child;

    if (_elem) {
        childNodes = _elem.assignedNodes ? _elem.assignedNodes() : _elem.childNodes;

        // Edge/IE
        if (!childNodes && _elem.assignedNodes) {
            childNodes = _elem.childNodes;
        }

        if (childNodes) {
            for (let i = childNodes.length - 1; i >= 0; i -= 1) {
                child = childNodes[i];
                if (child.nodeType === 1) {
                    // console.log('la', child.assignedNodes, (child.assignedNodes ? child.assignedNodes() : ''));
                    if (isFocusable(child)) {
                        // return child;
                        focusableElem = child;
                        break;
                    } else {
                        focusableElem = findLastFocusableDescendant(child);
                        if (focusableElem) {
                            break;
                        }
                    }
                }
            }
        }
    }

    return focusableElem;
}

/**
 * @param {string} _id
 */
export function returnFocus(_id) {
    const elem = document.querySelector(`[${RECEIVE_FOCUS_FROM_ATTR}="${_id}"]`);

    if (elem) {
        elem.removeAttribute(RECEIVE_FOCUS_FROM_ATTR);
        elem.focus();
    } else {
        document.body.focus();
    }
}

/**
 * Set `RECEIVE_FOCUS_FROM_ATTR` attribute to an element with focus.
 * @param {string} _id
 */
export function setReceiveFocusFromAttr(_id) {
    if (document.activeElement) {
        document.activeElement.setAttribute(RECEIVE_FOCUS_FROM_ATTR, _id);
    }
}

/**
 * Focus element by selector
 *
 * @param {HTMLElement} [wrapper]
 * @param {string} [selector]
 */
export function focusElem(wrapper = null, selector = '[data-focus]') {
    const eWrapper = wrapper || document.body;
    const elem = eWrapper.querySelector(selector);

    if (elem) {
        if (!isFocusable(elem)) {
            elem.setAttribute('tabindex', '-1');
        }

        elem.focus();
    }
}

/**
 *
 * @param {MouseEvent|KeyboardEvent} _event
 * @return {boolean}
 */
export function isAriaAction(_event) {
    if (!_event) {
        return false;
    }

    const eventType = _event.type;

    if (eventType === 'click') {
        return true;
    }

    return eventType in KEY_EVENTS && (isKey('Enter', _event) || isKey(' ', _event));
}

/**
 * Trap focus inside an element.
 *
 * @param {KeyboardEvent} _event
 * @param {HTMLElement} _elem
 * @param {{first: HTMLElement, last: HTMLElement}} _focusableElems
 */
export function focusTrap(_event, _elem, _focusableElems) {
    if (isKey('Tab', _event)) {
        if (!_focusableElems.first) {
            _focusableElems.first = findFirstFocusableDescendant(_elem);
        }
        if (!_focusableElems.last) {
            _focusableElems.last = findLastFocusableDescendant(_elem);
        }

        if (_event.target === _focusableElems.first && _event.shiftKey) {
            if (_focusableElems.last) {
                _event.preventDefault();
                _focusableElems.last.focus();
            }
        } else if (_event.target === _focusableElems.last && !_event.shiftKey) {
            if (_focusableElems.first) {
                _event.preventDefault();
                _focusableElems.first.focus();
            }
        }
    }
}

/**
 * @param {HTMLElement} _eTarget
 * @param {string} _selector
 * @return {HTMLElement|null}
 */
export function getFirstElement(_eTarget, _selector) {
    let elem = _eTarget && _eTarget.parentElement ? _eTarget.parentElement.firstElementChild : null;

    while (elem && !elem.matches(_selector)) {
        elem = elem.nextElementSibling;
    }

    return elem;
}

/**
 * @param {HTMLElement} _eTarget
 * @param {string} _selector
 * @return {HTMLElement|null}
 */
export function getLastElement(_eTarget, _selector) {
    let elem = _eTarget && _eTarget.parentElement ? _eTarget.parentElement.lastElementChild : null;

    while (elem && !elem.matches(_selector)) {
        elem = elem.previousElementSibling;
    }

    return elem;
}

/**
 *
 * @param {KeyboardEvent} event
 * @param {('horizontal' | 'vertical' | 'both')} [direction] Movement direction.
 * @param {boolean} [useHomeAndEnd] `Home` and `End` keys are enabled.
 * @return {string}
 */
function getMove({ event, direction = 'horizontal', useHomeAndEnd }) {
    let move = '';

    if (direction === 'horizontal' || direction === 'both') {
        if (isKey('ArrowRight', event)) {
            move = 'next';
        } else if (isKey('ArrowLeft', event)) {
            move = 'prev';
        }
    }

    if (!move && (direction === 'vertical' || direction === 'both')) {
        if (isKey('ArrowDown', event)) {
            move = 'next';
        } else if (isKey('ArrowUp', event)) {
            move = 'prev';
        }
    }

    if (!move) {
        if (useHomeAndEnd) {
            if (isKey('Home', event)) {
                move = 'first';
            } else if (isKey('End', event)) {
                move = 'last';
            }
        }

        if (isKey('PageUp', event)) {
            move = 'first';
        } else if (isKey('PageDown', event)) {
            move = 'last';
        }
    }

    return move;
}

/**
 *
 * @param {KeyboardEvent} _event
 * @param {string} _selector Item selector.
 * @param {('horizontal' | 'vertical' | 'both')} [_direction] Movement direction.
 * @param {boolean} [_circular] Circular keyboard navigation
 * @param {HTMLElement} [_target]
 * @param {boolean} [_focusElem] Focus found element.
 * @param {boolean} [_useHomeAndEnd] `Home` and `End` keys are enabled.
 * @return {HTMLElement|null} Next or previous element or null.
 */
export function keyboardNavigation({
    _event,
    _selector,
    _direction = 'horizontal',
    _circular = false,
    _target = null,
    _focusElem = true,
    _useHomeAndEnd = true,
}) {
    if (!_event || !(_event.type in KEY_EVENTS) || !_selector) {
        return null;
    }

    const eTarget = _target || _event.target.closest(_selector);
    let elem = null;
    let move = '';

    // console.log(_event.code);

    if (eTarget) {
        move = getMove({ event: _event, direction: _direction, useHomeAndEnd: _useHomeAndEnd });

        if (move === 'next') {
            elem = eTarget.nextElementSibling;
            while (elem && !elem.matches(_selector)) {
                elem = elem.nextElementSibling;
            }

            if (_circular && elem === null) {
                elem = getFirstElement(eTarget, _selector);
            }
        } else if (move === 'prev') {
            elem = eTarget.previousElementSibling;
            while (elem && !elem.matches(_selector)) {
                elem = elem.previousElementSibling;
            }

            if (_circular && elem === null) {
                elem = getLastElement(eTarget, _selector);
            }
        } else if (move === 'first') {
            elem = getFirstElement(eTarget, _selector);
        } else if (move === 'last') {
            elem = getLastElement(eTarget, _selector);
        }
    }

    if (elem && _focusElem) {
        elem.focus();
    }

    return elem;
}

/**
 * @param {NodeList} elemList List of elements to navigate through
 * @param {string} skipElemsSelector Skip elements that matching this selector
 * @param {number} startIdx Index into elemList
 * @param {'next'|'prev'} [find] Direction
 * @return {HTMLElement|null}
 */
export function findNextOrPrevElemByList({ elemList, skipElemsSelector, startIdx = -1, find = 'next' }) {
    const elemListLen = elemList.length;

    if (!skipElemsSelector || elemListLen === 0) {
        return null;
    }

    let el = elemList[startIdx] || null;
    let idx = startIdx;
    const findNext = find === 'next';

    while (el && el.matches(skipElemsSelector)) {
        if (findNext) {
            if (idx + 1 < elemListLen) {
                el = elemList[idx + 1];
                idx += 1;
            } else {
                el = null;
            }
        } else {
            if (idx - 1 >= 0) {
                el = elemList[idx - 1];
                idx -= 1;
            } else {
                el = null;
            }
        }
    }

    return el;
}

/**
 *
 * @param {KeyboardEvent} event
 * @param {NodeList} elemList List of elements to navigate through
 * @param {('horizontal' | 'vertical' | 'both')} [direction] Movement direction.
 * @param {string} [skipElemsSelector] Skip elements that matching this selector
 * @param {boolean} [circular] Circular keyboard navigation
 * @param {boolean} [focusElem] Focus found element.
 * @param {boolean} [useHomeAndEnd] `Home` and `End` keys are enabled.
 * @param {boolean} [addMissingTabIndex]
 * @return {HTMLElement|null} Next or previous element or null.
 */
export function keyboardNavigationByList({
    event,
    elemList,
    direction = 'horizontal',
    skipElemsSelector = '',
    circular = false,
    focusElem = true,
    useHomeAndEnd = true,
    addMissingTabIndex = true,
}) {
    if (!event || !(event.type in KEY_EVENTS)) {
        return null;
    }

    let elem = null;
    let move = '';
    let activeElem = null;
    let activeElemIdx = -1;
    const elemListLen = elemList.length;

    if (elemListLen > 0) {
        move = getMove({ event: event, direction: direction, useHomeAndEnd: useHomeAndEnd });

        if (move) {
            elemList.forEach((elem, idx) => {
                let tabindex = getAttr(elem, 'tabindex');

                if (addMissingTabIndex && !tabindex) {
                    setAttr(elem, 'tabindex', '-1');
                }

                if (tabindex === '0') {
                    activeElemIdx = idx;
                    activeElem = elem;
                }
            });

            if (activeElemIdx > -1) {
                if (move === 'next') {
                    if (activeElemIdx + 1 < elemListLen) {
                        elem = elemList[activeElemIdx + 1];
                    }

                    elem = findNextOrPrevElemByList({
                        elemList,
                        skipElemsSelector,
                        startIdx: activeElemIdx + 1,
                        find: 'next',
                    });

                    if (circular && elem === null) {
                        elem = findNextOrPrevElemByList({
                            elemList,
                            skipElemsSelector,
                            startIdx: 0,
                            find: 'next',
                        });
                    }
                } else if (move === 'prev') {
                    if (activeElemIdx - 1 >= 0) {
                        elem = elemList[activeElemIdx - 1];
                    }

                    elem = findNextOrPrevElemByList({
                        elemList,
                        skipElemsSelector,
                        startIdx: activeElemIdx - 1,
                        find: 'prev',
                    });

                    if (circular && elem === null) {
                        elem = findNextOrPrevElemByList({
                            elemList,
                            skipElemsSelector,
                            startIdx: elemListLen - 1,
                            find: 'prev',
                        });
                    }
                } else if (move === 'first') {
                    elem = findNextOrPrevElemByList({
                        elemList,
                        skipElemsSelector,
                        startIdx: 0,
                        find: 'next',
                    });
                } else if (move === 'last') {
                    elem = findNextOrPrevElemByList({
                        elemList,
                        skipElemsSelector,
                        startIdx: elemListLen - 1,
                        find: 'prev',
                    });
                }
            } else {
                activeElemIdx = 0;
                activeElem = elemList[0];
            }

            if (elem && activeElem) {
                setAttr(activeElem, 'tabindex', '-1');
                setAttr(elem, 'tabindex', '0');

                if (focusElem) {
                    elem.focus();
                }
            }
        }
    }

    return elem;
}
