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
        case 'x':
            result = multiply(num1, num2);
            break;
        case '÷':
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
    const btns = document.querySelectorAll("button");
    btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            switch (e.target.className) {
                case "btn-num btn-decimal":
                    if(isDecimal()) break;
                case "btn-num":
                    runBtnNum(e);
                    break;
                case "btn-operator":
                    runBtnOperator(e);
                    break;
                case "btn-calculate":
                    runBtnCalculate();
                    break;
                case "btn-clear":
                    runBtnClear();
                    break;
            }

            console.log(`num1: ${num1}`);
            console.log(`num2: ${num2}`);
            console.log(`operator: ${operator}`);
        });
        
    });
}

function isDecimal() {
    const divShowResults = document.querySelector(".show-results");
    if (divShowResults.textContent.includes(".")) return true; else return false;
}

function runBtnNum(event) {
    if (operator === "") {
        num1 =  getInputNum(event, num1);
        showInputNum(num1);
    } else {
        num2 = getInputNum(event, num2);;
        showInputNum(num2);
    }
}

function getInputNum(event, num) {
    return num + event.target.textContent;
}

function showInputNum(num) {
    const divShowResults = document.querySelector(".show-results");
    divShowResults.textContent = num;
}

function runBtnOperator(event) {
    toggleCurrentOperator();
    if (operator === "") {
        setOperator(event);
    } else {
        runBtnCalculate();
        setOperator(event);
    }
    
    event.target.classList.toggle("button-pressed");
}

function toggleCurrentOperator() {
    const operators = document.querySelectorAll(".btn-operator");
    operators.forEach((operator) => {
        if (operator.classList.contains("button-pressed")) {
            operator.classList.toggle("button-pressed");
        }
    });
}

function setOperator(event) {
    operator = event.target.textContent;
}

function runBtnCalculate() {
    if (!(num1 && operator && num2)) return;
    toggleCurrentOperator();
    if (operator === "÷" && num2 === "0") {
        showInputNum("ERROR!");
        operator = "";
        return;
    }
    let result = operate(parseInt(num1), operator, parseInt(num2));
    num1 = result;
    num2 = "";
    operator = "";
    showInputNum(num1);
}

function runBtnClear() {
    toggleCurrentOperator();
    clearAll();
    showInputNum(EMPTY_STR);
}

function clearAll() {
    num1 = "";
    num2 = "";
    operator = "";
}

// TODO: new digit after calculation starts a new calc
// disable . if used once, round decimals, add backspace button, add keyboard support