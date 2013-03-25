module Tree {
    export enum NodeType {
        DOCUMENT,
        HEADER,
        TITLE
    }

    interface AttributeMap {
        [name: string] : string;
    }

    export class Node {
        private attributes: AttributeMap;

        constructor(public type) {

        }

        public setAttribute(name: string, value: string) {
            this.attributes[name] = value;
        }

        public getAttribute(name) {
            return this.attributes[name] || null;
        }
    }

    export class ListNode extends Node {
        private children: Node[] = [];

        public addChild(node: Node) {
            this.children.push(node);
        }
    }
}