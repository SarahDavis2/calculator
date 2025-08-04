let num1 = "";
let num2 = "";
let operator = "";
const EMPTY_STR = "";
const ROUND_TO_TENTH_DECIMAL = Math.pow(10, 10);
const INT = "0123456789.";
const OPERATORS = "/*-+";
const IS_KEY = true;

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
    if (num1.includes(".")) return true; else return false;
}

function runBtnNum(event, isKey = false) {
    if (operator === "") {
        num1 =  getInputNum(event, num1, isKey);
        showInputNum(num1);
    } else {
        num2 = getInputNum(event, num2, isKey);;
        showInputNum(num2);
    }
}

function getInputNum(event, prvNum, isKey) {
    if (isKey) {
        num = prvNum + event.key;
    } else {
        num = prvNum + event.target.textContent;
    }
    return num;
}

function showInputNum(num) {
    const divShowResults = document.querySelector(".show-results");
    divShowResults.textContent = num;
}

function roundDecimal(num) {
    return (Math.round(num * ROUND_TO_TENTH_DECIMAL) / ROUND_TO_TENTH_DECIMAL);
}

function runBtnOperator(event, isKey = false) {
    toggleCurrentOperator();
    if (operator === "") {
        setOperator(event, isKey);

        const divShowResults = document.querySelector(".show-results");
        num1 = divShowResults.textContent
    } else {
        num1 = calculate();
        num2 = "";
        showResult(num1);
        setOperator(event, isKey);
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

function setOperator(event, isKey) {
    if (isKey === true) {
        let key = event.key;

        if (event.key === "*") key = "x";
        if (event.key === "/") key = "÷";
        operator = key;
    } else {
        operator = event.target.textContent;
    }
}

function runBtnCalculate() {
    num1 = calculate();
    showResult(num1);
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
    return operate(Number(num1), operator, Number(num2));
}

function showResult(num) {
    num = roundDecimal(num);
    const divShowResults = document.querySelector(".show-results");
    divShowResults.textContent = num;
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
document.addEventListener("keydown", (e) => {
    if (INT.includes(e.key)) {
        console.log(e.key);
        if(!isDecimal()) {
            runBtnNum(e, IS_KEY);
        }
    } else if (OPERATORS.includes(e.key)) {
        console.log(e.key);
        runBtnOperator(e, IS_KEY);
    } else if (e.key === "Enter") {
        console.log("Enter");
        runBtnCalculate();
    } else if (e.key === "Backspace") {
        console.log("Backspace");
        runBtnBackspace();
    }

    console.log(`num1: ${num1}`);
    console.log(`num2: ${num2}`);
    console.log(`operator: ${operator}`);
});