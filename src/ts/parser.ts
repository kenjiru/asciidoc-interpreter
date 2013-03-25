///<reference path='./tree.ts'/>

import Tree = module('tree');

export class Parser {
    private lines: string[] = [];
    private pointer = 0;
    private documentNode: Tree.Node = null;

    constructor(public str: string) {
        this.lines = this.getLines(str);

        this.documentNode = this.parseDocument();
    }

    private parseDocument() {
        var node = new Tree.ListNode(Tree.NodeType.DOCUMENT);

        var header = this.parseHeader();

        if (header) {
            node.addChild(header);
        }

        return node;
    }

    private parseHeader() {
        var node: Tree.ListNode = null,
            titleNode;

        titleNode = this.parseTitle();

        if (titleNode !== null) {
            node = new Tree.ListNode(Tree.NodeType.HEADER);
            node.addChild(titleNode);
        }

        return node;
    }

    private parseTitle() {
        var node: Tree.Node = null,
            line = this.lines[this.pointer];

        if (line.indexOf('= ') == 0) {
            node = new Tree.Node(Tree.NodeType.TITLE);
            node.setAttribute('text', line);

            this.pointer++;
        }

        return node;
    }

    public printTree() {
        this.printNode(this.documentNode);
    }

    private printNode(node: Tree.Node) {
        console.log('Node: ' + node);

        if (node instanceof Tree.ListNode) {
            var children = (<Tree.ListNode> node).getChildren();

            console.log('Children: ');
            for (var i=0; i<children.length; i++) {
                this.printNode(children[i]);
            }
        }
    }

    private getLines(str: string) {
        return str.split('\n');
    }

    /**
     * Checks if a line contains only the specified character.
     * @param index Identify the line.
     * @param character The desired character.
     * @returns {boolean}
     */
    private checkLine(index: number, character: string) {
        var line = this.lines[index],
            re = new RegExp('^' + character + '+$');

        return line.match(re) !== null;
    }
}