const DIGIT = "0123456789";

//more operators can add here
//for calc.js
const ADD = "add";
const MULTIPLY = "multiply";

//for newIdea.js
const PLUS = 1;
const TIME = 2;

const isAlpha = (char) => /[A-Z]/gi.test(char);
const isOpenParenthese = (char) => char === "(";
const isCloseParenthese = (char) => char === ")";
const isAdd = (str) => str.toLowerCase() === ADD;
const isMultiply = (str) => str.toLowerCase() === MULTIPLY;
const onlyDigit = (str) => [...str].every((c) => DIGIT.includes(c));
const isOperator = (str) => {
  if (str.toLowerCase() === "add") {
    return PLUS;
  }
  if (str.toLowerCase() === "multiply") {
    return TIME;
  }
  return -1;
};

// real part for calculation
const calcEquation = (opArr, argsArr) => {
  let operator = opArr.pop();
  let result = argsArr.pop();

  while (argsArr.length > 0) {
    //add more operations here
    switch (operator) {
      case ADD:
        result += argsArr.pop();
        break;

      case MULTIPLY:
        result *= argsArr.pop();
        break;

      //should not be here anyway, just in case
      default:
        throw new Error(`unrecognized operator: ${operator}`);
    }
  }

  return result;
};

//find operator and index position
const findOperator = (str, start) => {
  let result = {};
  let i = start;
  let flagAlpha = false;
  while (i < str.length && isAlpha(str[i])) {
    i++;
    if (!flagAlpha) {
      flagAlpha = true;
    }
  }

  if (flagAlpha) {
    let substr = str.substring(start, i);
    if (substr.toLowerCase() === ADD) {
      result.operator = ADD;
    } else if (substr.toLowerCase() === MULTIPLY) {
      result.operator = MULTIPLY;
    } else {
      throw new Error(`unrecognized operator: ${substr}`);
    }
  }
  result.start = i;
  return result;
};

// sort all the available equations and store to stack
const calcGroup = (str, opArr, argsArr, start) => {
  let i = start;

  while (i < str.length) {
    let flagNum = false;
    numberStart = i;
    while (i < str.length && onlyDigit(str[i])) {
      i++;
      if (!flagNum) {
        flagNum = true;
      }
    }
    if (flagNum) {
      argsArr.push(parseInt(str.substring(numberStart, i)));
    } else {
      let result = findOperator(str, i);
      if (result.operator != null) {
        opArr.push(result.operator);
        i = result.start;
      } else if (isOpenParenthese(str[i])) {
        let currOperator = [];
        let currArgs = [];
        i = calcGroup(str, currOperator, currArgs, i + 1);
        let currResult = calcEquation(currOperator, currArgs);
        argsArr.push(currResult);
      } else if (isCloseParenthese(str[i])) {
        return i;
      }
      i++;
    }
  }
  return i;
};

// treat input
const findEquation = () => {
  const input = process.argv.slice(2);
  const command = input[0];

  if (input.length > 0) {
    if (onlyDigit(command)) {
      return command;
    } else {
      if (!isOpenParenthese(command.trim()[0])) {
        throw new Error(
          "the command is invalid, must start with an open parenthese"
        );
      }
    }
  } else {
    throw new Error(
      "argument is needed, format likes node calc.js '(add 1 2)'  or node calc.js 123"
    );
  }

  return command;
};

// calcate each whole equation and store result into stack
const findGroup = (operatorsArr, argsArr) => {
  let operator = operatorsArr.pop();
  let output = argsArr.pop();
  if (isOpenParenthese(output)) {
    return;
  }
  let result = parseInt(output);

  let num;
  let op = operator === PLUS ? "+" : "*";
  while (!isOpenParenthese((num = argsArr.pop()))) {
    // let xxx = result;
    result = calcResult(operator, parseInt(num), result);
    // console.log(`result:  ${result} = ${xxx} ${op} ${num} `);
  }
  if (result) {
    argsArr.push(result);
  }
};

// treat result with operators, can add more functions here
const calcResult = (operator, num1, num2) => {
  if (operator === PLUS) {
    return num1 + num2;
  } else if (operator === TIME) {
    return num1 * num2;
  } else {
    throw new Error(
      `operation failed: operator ${operator} with arguments ${num1} and ${num2}`
    );
  }
};

// search every char in input string and store into stack
const calculate = (str, operatorsArr, argsArr) => {
  let i = 0;
  while (i < str.length) {
    let c = str[i];

    if (c === " ") {
      i++;
    } else if (isAlpha(str[i])) {
      let start = i;
      i++;
      while (i < str.length && isAlpha(str[i])) {
        i++;
      }
      let operator = isOperator(str.substring(start, i));
      if (operator < 1) {
        throw new Error(`unrecognized operator: ${operator}`);
      }
      operatorsArr.push(operator);
    } else if (onlyDigit(c)) {
      let start = i;
      i++;
      while (i < str.length && onlyDigit(str[i])) {
        i++;
      }
      argsArr.push(str.substring(start, i));
    } else if (c === "(") {
      i++;
      argsArr.push(c);
    } else if (c === ")") {
      i++;

      findGroup(operatorsArr, argsArr);
    } else {
      i++;
    }
  }
};

module.exports = {
  isAlpha,
  isOpenParenthese,
  isCloseParenthese,
  isAdd,
  isMultiply,
  onlyDigit,
  calcEquation,
  findOperator,
  calcGroup,
  findEquation,
  calculate,
};
