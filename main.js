import { Tree } from "./script";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function randomArray() {
  let randomLength = Math.floor(Math.random() * 100) + 1;
  let array = [];
  for (let index = 0; index < randomLength; index++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  return array;
}

//let randomArray = [0, 5, 12, 41, 22, 72, 89, 41, 33, 51, 6, 2, 14];
let newTree = new Tree(randomArray());
console.log(newTree.isBalanced());
