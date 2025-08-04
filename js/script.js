delegateBtnEvents();

// CALCULATOR OPERATOR FUNCTIONS
function operate(num1, operator, num2) {
    let result = 0;
    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
    }
    return result;
}

// Pre: input must be numbers
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

// BUTTON FUNCTIONALITY
let num1 = "";
let num2 = "";
let operator = "";
const EMPTY_STR = "";

function delegateBtnEvents() {
    let inputNum = "";

    const btns = document.querySelectorAll("button");
    btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            switch (e.target.className) {
                case "btn-num":
                    inputNum = getInputNum(e, inputNum);
                    showInputNum(inputNum);
                    break;
                case "btn-operator":
                    break;
                case "btn-calculate":
                    // Operate global args
                    let result = operate(num1, operator, num2);
                    showInputNum(result);
                    break;
                case "btn-clear":
                    clearAll();
                    showInputNum(EMPTY_STR);
                    break;
            }
        });
    });
}

function getInputNum(event, num) {
    return num + event.target.textContent;
}

function showInputNum(num) {
    const divShowResults = document.querySelector(".show-results");
    divShowResults.textContent = num;
}

function clearAll() {
    num1 = "";
    num2 = "";
    operator = "";
}