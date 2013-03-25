export enum NodeType {
    DOCUMENT,
    HEADER,
    TITLE
}

interface AttributeMap {
    [name: string] : string;
}

export class Node {
    private type: NodeType;
    private attributes: AttributeMap = {};

    constructor(type: NodeType) {
        this.type = type;
    }

    public setAttribute(name: string, value: string) {
        this.attributes[name] = value;
    }

    public getAttribute(name) {
        return this.attributes[name] || null;
    }

    public toString() {
        return NodeType._map[this.type];
    }
}

export class ListNode extends Node {
    private children: Node[] = [];

    public addChild(node: Node) {
        this.children.push(node);
    }

    public getChildren() {
        return this.children;
    }
}