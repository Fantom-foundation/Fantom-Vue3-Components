import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Tree } from './Tree.js';

let tree = null;

function TREE() {
    return [
        {
            id: 'Component1',
            key: 'foo1',
            _c: [
                {
                    id: 'Component11',
                    key: 'foo2',
                    _c: [
                        {
                            id: 'Component111',
                            key: 'foo3',
                        },
                    ],
                },
                {
                    id: 'Component12',
                },
                {
                    id: 'Component13',
                },
            ],
        },
        {
            id: 'Component2',
        },
        {
            id: 'Component3',
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

    describe('getSiblings()', () => {
        it('should return expected outcome if node is not found', () => {
            expect(tree.getSiblings('foo')).toEqual({
                previousSibling: null,
                node: null,
                nextSibling: null,
            });
        });

        it('should return expected outcome if the node has no next sibling', () => {
            const data = TREE();

            expect(tree.getSiblings('Component3')).toEqual({
                previousSibling: data[1],
                node: data[2],
                nextSibling: null,
            });
        });

        it('should return expected outcome if the node has no previous sibling', () => {
            const data = TREE();

            expect(tree.getSiblings('Component1')).toEqual({
                previousSibling: null,
                node: data[0],
                nextSibling: data[1],
            });
        });

        it('should return expected outcome if the node has both siblings', () => {
            const data = TREE();

            expect(tree.getSiblings('Component2')).toEqual({
                previousSibling: data[0],
                node: data[1],
                nextSibling: data[2],
            });
        });

        it('should return expected outcome if the node has both siblings and is not on the root level', () => {
            const data = TREE();

            expect(tree.getSiblings('Component12')).toEqual({
                previousSibling: data[0]._c[0],
                node: data[0]._c[1],
                nextSibling: data[0]._c[2],
            });
        });
    });
});
