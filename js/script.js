let num1 = 0;
let num2 = 0;
let operator = '';

function operate(num1, operator, num2) {
    switch (operator) {
        case '+':
            let sum = add(num1, num2);
            break;
        case '-':
            let difference = subtract(num1, num2);
            break;
        case '*':
            let product = multiply(num1, num2);
            break;
        case '/':
            let quotient = divide(num1, num2);
            break;
    }
}

// CALCULATOR OPERATOR FUNCTIONS
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}