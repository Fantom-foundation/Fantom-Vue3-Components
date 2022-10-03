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
     * @param {string} key
     * @return {TreeNode|null}
     */
    getNode(value, key) {
        return this.#findNodeBy(value, key).node;
    }

    /**
     * @param {*} value
     * @param {string} key
     * @return {{ node: TreeNode, parents: [], level: number, index: number}}
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
     * @param {string} key
     * @return {Array}
     */
    getParents(value, key) {
        return this.#findNodeBy(value, key).parents;
    }

    /**
     * @param {*} value
     * @param {string} key
     * @return {TreeNode|null}
     */
    getParent(value, key) {
        const node = this.#findNodeBy(value, key);

        return node.parents.length > 0 ? node.parents[node.parents.length - 1] : null;
    }

    /**
     * @param {*} value
     * @param {string} key
     * @return {{ node: TreeNode, parents: [], level: number, index: number}}
     */
    #findNodeBy(value, key = 'id') {
        return findNodeBy(this._tree, value, key);
    }
}

/**
 * @typedef {Object} TreeNode
 * @property {Array} [_c] Array of child nodes
 */
