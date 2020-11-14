### Precondition:

    -Parenthesis will always be balanced.
    -Only the add and multiply functions will be called.
    -There will always be a single space between the function arguments.

### Scipt Format

    - node calc.js
    - node calc.js 123
    - node calc.js '(add 1 2)'

### Test environment:

    - Vs code
    - node v14+

### Test cases:

    -with int argument
      node calc.js  1233

    - mix upper/lowercase with 1 level
      node calc.js '(Add 1 2)'

    - upper case with 2+ arguments
      node calc.js '(ADD 1 2 3 4)'

    - big numbers
      node calc.js '(multiply 9999 9999 9999 9999)'

    - 2 levels with different operators
      node calc.js '(multiply (ADD 1 2) 3 4)'

    - 2 levels with mixed expressions and int
      node calc.js '(MultipLY 2 (ADD 1 2) (add 1 1))'

    - 3 levels with 2+ expressions in each level

node calc.js '(MultipLY 2 (ADD 1 (multiply 1 1) 2) (add (MULTIPLY 2 2) (add 1 1) (aDD 1 1)))'

    - 4 levels : node calc.js '(multiply (add 2 (add 1 (add 1 1) 2) 3 ) 2)'

### Exception handling test cases:

    - without argument
      node calc.js 

    - more white spaces
      node calc.js '( ADD    1 2    3   4)  'no first parentheses: node calc.js 'ADD    1 2    3   4)  '
