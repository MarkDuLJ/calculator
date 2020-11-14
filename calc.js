const { calcGroup, calcEquation, findEquation } = require("./helper");

const opArr = [];
const argsArr = [];
try {
  //start recursion
  const command = findEquation();
  console.log(`INPUT: ${command}`);

  calcGroup(command, opArr, argsArr, 0);
  console.log(`OUTPUT: ${calcEquation(opArr, argsArr)}`);
} catch (err) {
  console.log(`Error: ${err.message}`);
}
