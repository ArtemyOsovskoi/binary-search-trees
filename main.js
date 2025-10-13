import Node from "./script.js";
import { Tree } from "./script.js";
import { prettyPrint } from "./script.js";
import { buildTree } from "./script.js";

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
buildTree(array);
prettyPrint(buildTree());
