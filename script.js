export default class Node {
  constructor(data) {
    this.leftChild = null; //left child reference
    this.rightChild = null; //right child reference
    this.data = data; //data stored in node
    this.key = key; //key to determine node (id)
  }
}

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array); //using return value of buildTree();
  }

  buildTree(array) {
    //base case - check if array is empty
    if (array.length === 0) {
      return null;
    }
    //find middle element of array
    let middleElement = Math.floor(array.length / 2);

    //create a root node from middle element of array
    let middleElementValue = array[middleElement];
    let rootNode = new Node(middleElementValue); //root node with value under index of middleElement

    //build left subtree from left half of array
    rootNode.leftChild = buildTree(array.slice(0, middleElement));

    //build right subtree from right half of array
    rootNode.rightChild = buildTree(array.slice(middleElement + 1));

    //return root node
    return rootNode;
  }

  //public insert method
  insert(value) {
    this.root = this._insert(this.root, value);
  }

  //private helper function
  _insert(node, value) {
    //remember node argument is root
    //if tree is empty (recursion base case):
    if (node == null) {
      return new Node(value);
    }

    //recursive step
    //compare passed value to each node while traversing the tree
    if (value < node.value) {
      //call _insert on next left child node
      node.leftChild = this._insert(node.leftChild, value);
    }
    if (value > node.value) {
      //call _insert on next right child node
      node.rightChild = this._insert(node.rightChild, value);
    }

    return node;
  }

  deleteItem(value) {
    this.root = this._deleteItem(this.root, value);
  }

  //private helper function
  _deleteItem(node, value) {
    //base case
    if (node == null) {
      return null;
    }

    //recursive step
    //tree traversal
    if (value < node.value) {
      node.leftChild = this._deleteItem(node.leftChild, value);
    } else if (value > node.value) {
      node.rightChild = this._deleteItem(node.rightChild, value);
    } else {
      //1. if node has no children (aka leaf node)
      if (node.leftChild == null && node.rightChild == null) {
        return null;
      }

      //2. if node has one child
      if (node.leftChild || node.rightChild) {
        if (node.leftChild) return node.leftChild;
        if (node.rightChild) return node.rightChild;
      }

      //3. if node has two children
      if (node.leftChild && node.rightChild) {
        let successor = this._findMinimumNode(node.rightChild);
        node.value = successor.value;
        node.rightChild = this._deleteItem(node.rightChild, successor.value);
      }
    }

    return node;
  }

  _findMinimumNode(node) {
    //base case
    if (node.leftChild == null) {
      return node; //that's the node we want, it's minumum (has no child)
    } else {
      //recursive step
      return this._findMinimumNode(node.leftChild); //traversal
    }
  }

  //Write a find(value) function that returns the node with the given value.
  find(value) {
    return this._find(this.root, value);
  }

  _find(node, value) {
    if (node == null) {
      return null;
    }
    if (node.value == value) {
      return node;
    }
    if (value < node.value) {
      return this._find(node.leftChild, value);
    } else {
      return this._find(node.rightChild, value);
    }
  }
}

/* Write a buildTree(array) function that takes an array of data 
(e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) 
and turns it into a balanced binary tree full of Node objects appropriately placed 
(don’t forget to sort and remove duplicates!). 
The buildTree function should return the level-0 root node. */

//nb!root node is the middle element of sorted array
//we're using recursion here
/* export function buildTree(array) {
//base case - check if array is empty
if (array.length === 0) {
  return null;
}
//find middle element of array
let middleElement = Math.floor(array.length / 2);

//create a root node from middle element of array
let middleElementValue = array[middleElement];
let rootNode = new Node(middleElementValue);//root node with value under index of middleElement

//build left subtree from left half of array
rootNode.leftChild = buildTree(array.slice(0, middleElement));

//build right subtree from right half of array
rootNode.rightChild = buildTree(array.slice(middleElement + 1));

//return root node
return rootNode;
} */

//BST visualization function
/* export const prettyPrint = (node, prefix = '', isLeft = true) => {
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
}; */
