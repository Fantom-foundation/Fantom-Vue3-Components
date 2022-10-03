import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Tree } from './Tree.js';

let tree = null;

function TREE() {
    return [
        {
            id: 'Component1',
            isComponent: true,
            key: 'foo1',
            _c: [
                {
                    id: 'Component11',
                    isComponent: true,
                    key: 'foo2',
                    _c: [
                        {
                            id: 'Component111',
                            isComponent: true,
                            key: 'foo3',
                        },
                    ],
                },
            ],
        },
        {
            id: 'Component2',
            isComponent: true,
        },
    ];
}

beforeEach(() => {
    tree = new Tree(TREE());
});

afterEach(() => {
    tree = null;
});

describe('Tree', () => {
    it('should get tree node', () => {
        expect(tree.getNode('Component1')).toEqual(TREE()[0]);
    });

    it('should get tree node by given key', () => {
        expect(tree.getNode('foo2', 'key')).toEqual(TREE()[0]._c[0]);
    });

    it('should get tree node with full info by given key', () => {
        expect(tree.getFullNode('foo2', 'key')).toEqual({
            node: TREE()[0]._c[0],
            parents: [TREE()[0]],
            level: 1,
            index: 0,
        });

        expect(tree.getFullNode('Component2', 'id')).toEqual({
            node: TREE()[1],
            parents: [],
            level: 0,
            index: 1,
        });
    });

    it('should get a parent node by value', () => {
        expect(tree.getParentByValue('Component111', 'Component1')).toEqual(TREE()[0]);
    });

    it('should get a parent node by value and given key', () => {
        expect(tree.getParentByValue('Component111', 'foo1', 'key')).toEqual(TREE()[0]);
    });

    it('should get parents of the node', () => {
        const data = TREE();

        expect(tree.getParents('Component111')).toEqual([data[0], data[0]._c[0]]);
    });

    it('should get parents of the node by given key', () => {
        const data = TREE();

        expect(tree.getParents('foo3', 'key')).toEqual([data[0], data[0]._c[0]]);
    });

    it('should get direct parent of the node', () => {
        expect(tree.getParent('Component111')).toEqual(TREE()[0]._c[0]);
    });
});
