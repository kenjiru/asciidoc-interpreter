///<reference path='./tree.ts'/>

export class Parser {
    private lines: string[] = [];
    private pointer = 0;

    constructor(public str: string) {
        this.lines = this.getLines(str);
    }

    private parseDocument() {
        var node = new Tree.ListNode(Tree.NodeType.DOCUMENT);

        var header = this.parseHeader();

        if (header) {
            node.addChild(header);
        }
    }

    private parseHeader() {
        var node: Tree.ListNode = null,
            titleNode;

        titleNode = this.parseTitle();

        if (titleNode !== null) {
            node = new Tree.ListNode(Tree.NodeType.HEADER);
        }

        return node;
    }

    private parseTitle() {
        var node: Tree.Node = null;

        if (this.checkLine(this.pointer + 1, '=')) {
            node = new Tree.Node(Tree.NodeType.TITLE);
            node.setAttribute('text', this.lines[this.pointer]);

            this.pointer += 2;
        }

        return node;
    }


    private getLines(str: string) {
        return str.split('\n');
    }

    private checkLine(index: number, character: string) {
        var line = this.lines[index],
            re = new RegExp('^' + character + '+$');

        return line.match(re) !== null;
    }
}