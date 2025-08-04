let num1 = "";
let num2 = "";
let operator = "";
const EMPTY_STR = "";
const ROUND_TO_TENTH_DECIMAL = Math.pow(10, 10);

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
                case "btn-backspace":
                    runBtnBackspace();
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
    num = roundDecimal(num);
    const divShowResults = document.querySelector(".show-results");
    divShowResults.textContent = num;
}

function roundDecimal(num) {
    return (Math.round(num * ROUND_TO_TENTH_DECIMAL) / ROUND_TO_TENTH_DECIMAL);
}

function runBtnOperator(event) {
    toggleCurrentOperator();
    if (operator === "") {
        setOperator(event);

        const divShowResults = document.querySelector(".show-results");
        num1 = divShowResults.textContent
    } else {
        num1 = calculate();
        num2 = "";
        showInputNum(num1);
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
    num1 = calculate();
    showInputNum(num1);
    clearAll();
}

function calculate() {
    if (!(num1 && operator && num2)) return;
    toggleCurrentOperator();
    if (operator === "÷" && num2 === "0") {
        showInputNum("ERROR!");
        operator = "";
        return;
    }
    return operate(parseInt(num1), operator, parseInt(num2));
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

function runBtnBackspace() {
    const divShowResults = document.querySelector(".show-results");
    numShowResults = divShowResults.textContent;
    deletedDigitNum = numShowResults
        .split('')
        .slice(0, -1)
        .join('');

    if (divShowResults.textContent === num1) {
        num1 = deletedDigitNum;
    } else {
        num2 = deletedDigitNum;
    }
    showInputNum(deletedDigitNum);
}

// KEYBOARD FUNCTIONALITY
