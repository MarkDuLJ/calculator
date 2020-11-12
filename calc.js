const { calcGroup, calcEquation, onlyDigit } = require("./helper");
// Parenthesis will always be balanced.
// Only the add and multiply functions will be called.
// There will always be a single space between the function arguments.

//get input args
const input = process.argv.slice(2);

if (input.length > 0) {
  if (onlyDigit(input[0])) {
    console.log(input[0]);
  } else {
    const command = input[0].trim();
    // console.log(command);
    if (command[0] !== "(") {
      console.log(
        "the command is invalid, must start with an open parenthesis"
      );
    }

    const opArr = [];
    const argsArr = [];
    //start recursion
    calcGroup(command, opArr, argsArr, 0);
    console.log(calcEquation(opArr, argsArr));
  }
} else {
  console.log("argument is needed");
  //   throw new Error("argument is needed");
}
