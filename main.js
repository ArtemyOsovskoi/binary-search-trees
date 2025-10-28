import Tree from "./script.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) return;
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "|   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "\\-- " : "/-- "}${node.value}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "|   "}`, true);
  }
};

function randomArray() {
  const set = new Set();
  let randomLength = Math.floor(Math.random() * 100) + 1;
  while (set.size < randomLength) {
    set.add(Math.floor(Math.random() * 99) + 1);
  }
  return Array.from(set).sort((a, b) => a - b);
}

function testingBST() {
  let rArr = randomArray();
  let newTree = new Tree(rArr);
  console.log("initial array:", rArr);
  console.log("balanced initially?", newTree.isBalanced());

  newTree.insert(240);
  newTree.insert(555);
  newTree.insert(419);
  newTree.insert(872);
  console.log("balanced after insertions?", newTree.isBalanced());

  newTree.rebalance();
  console.log("balanced after rebalance?", newTree.isBalanced());
}
testingBST();
