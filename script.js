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

  levelOrderForEach(callback) {
    if (typeof callback != "function") {
      throw new Error("Callback must be a function");
    }

    //store nodes while traversing
    let queue = [];
    if (this.root) {
      queue.push(this.root);
    }

    //while queue is not empty
    while (queue.length > 0) {
      let getNode = queue.shift();
      //run callback on this node
      callback(getNode);

      //add left or right child to the queue
      if (getNode.leftChild) {
        callback(getNode.leftChild);
      }
      if (getNode.rightChild) {
        callback(getNode.rightChild);
      }
    }
  }

  //left - root - right
  inOrderForEach(callback) {
    if (typeof callback != "function") {
      throw new Error("Callback must be a function");
    }

    _inOrderForEach(callback, this.root);
  }
  _inOrderForEach(callback, currentNode) {
    //base case
    if (currentNode == null) return null;

    //recursive step
    this._inOrderForEach(callback, currentNode.leftChild);
    callback(currentNode);
    this._inOrderForEach(callback, currentNode.rightChild);
  }

  //root - left -right
  preOrderForEach(callback) {
    if (typeof callback != "function") {
      throw new Error("Callback must be a function");
    }

    //start recursion at the root node with helper function
    this._preOrderForEach(callback, this.root);
  }

  _preOrderForEach(callback, currentNode) {
    //base case
    if (currentNode == null) return null;

    //recursive step
    callback(currentNode);
    this._preOrderForEach(callback, currentNode.leftChild);
    this._preOrderForEach(callback, currentNode.rightChild);
  }

  //left - right - root
  postOrderForEach(callback) {
    if (typeof callback != "function") {
      throw new Error("Callback must be a function");
    }

    _postOrderForEach(callback, this.root);
  }
  _postOrderForEach(callback, currentNode) {
    //base case
    if (currentNode == null) return null;

    //recursive step
    this._postOrderForEach(callback, currentNode.leftChild);
    this._postOrderForEach(callback, currentNode.rightChild);
    callback(currentNode);
  }

  height(value) {
    let node = this.find(value);

    if (node == null) return null;

    return this._height(node);
  }
  _height(node) {
    if (node == null) return 0;

    //leaf node - height 0, base case
    if (node.leftChild == null && node.rightChild == null) {
      return 0;
    }

    //recursive step
    let leftHeight = this._height(node.leftChild);
    let rightHeight = this._height(node.rightChild);

    //calculate height
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value) {
    return this._depth(this.root, value, 0);
  }
  _depth(node, value, depth) {
    if (node == null) return null;

    if (node.value == value) {
      return depth;
    }

    let left = this._depth(node.leftChild, value, depth + 1);
    let right = this._depth(node.rightChild, value, depth + 1);

    if (left != null) {
      return left;
    }
    return right;
  }
}
