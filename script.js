export default class Node {
    constructor(data) {
        this.leftChild = null; //left child reference
        this.rightChild = null; //right child reference
        this.data = data; //data stored in node
    }

}

export class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }
}

/* Write a buildTree(array) function that takes an array of data 
(e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) 
and turns it into a balanced binary tree full of Node objects appropriately placed 
(don’t forget to sort and remove duplicates!). 
The buildTree function should return the level-0 root node. */
function buildTree(array) {



}

//BST visualization function
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
