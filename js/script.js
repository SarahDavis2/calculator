let num1 = 0;
let num2 = 0;
let operator = '';

delegateBtnEvents();

// CALCULATOR OPERATOR FUNCTIONS
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
    let inputNum = "";

    const btns = document.querySelectorAll("button");
    btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            switch (e.target.className) {
                case "btn-input btn-num":
                    inputNum = getInputNum(e, inputNum);
                    showInputNum(inputNum);
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