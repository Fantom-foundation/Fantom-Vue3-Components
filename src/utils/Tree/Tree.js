import { findNodeBy, getNestedProp } from '../index.js';

export class Tree {
    _tree = [];

    /**
     * @param {TreeNode[]} [tree]
     */
    constructor(tree = []) {
        this.setTree(tree);
    }

    /**
     * @param {TreeNode[]} [tree]
     */
    setTree(tree = []) {
        this._tree = tree;
    }

    /**
     * @param {*} value
     * @param {string} [key]
     * @return {TreeNode|null}
     */
    getNode(value, key) {
        return this.#findNodeBy(value, key).node;
    }

    /**
     * @param {*} value
     * @param {string} [key]
     * @return {TreeFullNode}
     */
    getFullNode(value, key) {
        return this.#findNodeBy(value, key);
    }

    /**
     * @param {*} value
     * @param {*} parentValue
     * @param {string} key
     * @return {TreeNode|null}
     */
    getParentByValue(value, parentValue, key = 'id') {
        const node = this.#findNodeBy(value);
        let parentNode = null;
        let parents;

        if (node) {
            parents = node.parents;
            for (let i = 0, len = parents.length; i < len; i++) {
                if (getNestedProp(parents[i], key) === parentValue) {
                    parentNode = parents[i];
                    break;
                }
            }
        }

        return parentNode;
    }

    /**
     * @param {*} value
     * @param {string} [key]
     * @return {Array}
     */
    getParents(value, key) {
        return this.#findNodeBy(value, key).parents;
    }

    /**
     * @param {*} value
     * @param {string} [key]
     * @return {TreeNode|null}
     */
    getParent(value, key) {
        const node = this.#findNodeBy(value, key);

        return node.parents.length > 0 ? node.parents[node.parents.length - 1] : null;
    }

    /**
     * @param {*} value
     * @param {string} [key]
     * @return {{node: TreeNode|null, previousSibling: TreeNode|null, nextSibling: TreeNode|null}}
     */
    getSiblings(value, key) {
        const node = this.#findNodeBy(value, key);
        const result = {
            previousSibling: null,
            node: null,
            nextSibling: null,
        };
        let nodes = null;

        if (node.node) {
            nodes = node.parents[node.parents.length - 1]?._c || this._tree;

            result.node = node.node;

            if (node.index > 0) {
                result.previousSibling = nodes[node.index - 1];
            }

            if (node.index < nodes.length - 1) {
                result.nextSibling = nodes[node.index + 1];
            }
        }

        return result;
    }

    /**
     * @param {*} value
     * @param {string} key
     * @return {TreeFullNode}
     */
    #findNodeBy(value, key = 'id') {
        return findNodeBy(this._tree, value, key);
    }
}

/**
 * @typedef {Object} TreeNode
 * @property {Array} [_c] Array of child nodes
 */

/**
 * @typedef {Object} TreeFullNode
 * @property {TreeNode|null} node
 * @property {TreeNode[]} parents
 * @property {number} level
 * @property {number} index
 */
