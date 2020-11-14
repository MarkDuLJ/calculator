const { calculate, findEquation } = require("./helper");

const operatorsArr = [];
const argsArr = [];
try {
  const command = findEquation();
  console.log(`INPUT: ${command}`);

  calculate(command, operatorsArr, argsArr);
  console.log(`OUTPUT: ${argsArr.pop()}`);
} catch (err) {
  console.log(`Error: ${err.message}`);
}
