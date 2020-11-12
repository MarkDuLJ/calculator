const DIGIT = "0123456789";

//more operators can add here
const ADD = 1;
const MULTIPLY = 3;

const isAlpha = (char) => /[A-Za-z]/gi.test(char);
// const isAlpha = (c) => {
//   if (c >= "a" && c <= "z") {
//     return true;
//   }
//   if (c >= "A" && c <= "Z") {
//     return true;
//   }
//   return false;
// };
const isOpenParenthese = (char) => char.startsWith("(");
const isCloseParenthese = (char) => char.startsWith(")");
const isAdd = (str) => str.toLowerCase().startsWith(ADD);
const isMultiply = (str) => str.toLowerCase().startsWith(MULTIPLY);
const onlyDigit = (str) => [...str].every((c) => DIGIT.includes(c));
const calcEquation = (opArr, argsArr) => {
  let operator = opArr.pop();
  let result = argsArr.pop();

  while (argsArr.length > 0) {
    if (operator == ADD) {
      result += argsArr.pop();
    } else if (operator == MULTIPLY) {
      result *= argsArr.pop();
    }

    //infinite loop? why?
    // switch (operator) {
    //   //add more operations here
    //   case ADD:
    //     result += argsArr.pop();
    //     break;

    //   case MULTIPLY:
    //     result *= argsArr.pop();
    //     break;

    //   default:
    //     console.log("unrecognized operator");
    //     break;
    // }
  }

  return result;
};

//find operator and position
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
    if (substr.toLowerCase() === "add") {
      result.operator = ADD;
    } else if (substr.toLowerCase() === "multiply") {
      result.operator = MULTIPLY;
    }
  }
  result.start = i;
  // console.log(result);
  return result;
};

function calcGroup(str, opArr, argsArr, start) {
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
      //   console.log(str.substring(numberStart, i));
      argsArr.push(parseInt(str.substring(numberStart, i)));
    } else {
      let result = findOperator(str, i);
      //   console.log(result);
      if (result.operator != null) {
        opArr.push(result.operator);
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
}

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
};
