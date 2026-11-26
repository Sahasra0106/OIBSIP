
const display = document.getElementById("display");
const previousOperand = document.getElementById("previousOperand");
const buttons = document.querySelector(".buttons");

let currentInput = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let justCalculated = false;

function updateDisplay() {
    display.value = currentInput;
}

function inputNumber(number) {
    if (justCalculated && !operator) {
        currentInput = number;
        justCalculated = false;
    } else if (waitingForSecondOperand) {
        currentInput = number;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === "0"
            ? number
            : currentInput + number;
    }

    updateDisplay();
}

function inputDecimal() {
    if (justCalculated && !operator) {
        currentInput = "0.";
        justCalculated = false;
    } else if (waitingForSecondOperand) {
        currentInput = "0.";
        waitingForSecondOperand = false;
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

function chooseOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && !waitingForSecondOperand) {
        calculate();
    } else {
        firstOperand = inputValue;
    }

    operator = nextOperator;
    waitingForSecondOperand = true;
    justCalculated = false;

    previousOperand.textContent =
        `${firstOperand} ${operator}`;
}

function calculate() {
    if (operator === null || waitingForSecondOperand) return;

    const secondOperand = parseFloat(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = firstOperand + secondOperand;
            break;
        case "-":
            result = firstOperand - secondOperand;
            break;
        case "*":
            result = firstOperand * secondOperand;
            break;
        case "/":
            if (secondOperand === 0) {
                currentInput = "Cannot divide by zero";
                resetCalculation();
                updateDisplay();
                return;
            }
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    currentInput = String(Number(result.toPrecision(12)));

    previousOperand.textContent =
        `${firstOperand} ${operator} ${secondOperand} =`;

    firstOperand = null;
    operator = null;
    waitingForSecondOperand = true;
    justCalculated = true;

    updateDisplay();
}

function clearCalculator() {
    currentInput = "0";
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    justCalculated = false;
    previousOperand.textContent = "";
    updateDisplay();
}

function resetCalculation() {
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    justCalculated = true;
    previousOperand.textContent = "";
}

function deleteNumber() {
    if (waitingForSecondOperand || justCalculated) return;

    currentInput = currentInput.length > 1
        ? currentInput.slice(0, -1)
        : "0";

    if (currentInput === "-") currentInput = "0";

    updateDisplay();
}

function toggleSign() {
    if (currentInput === "0" ||
        currentInput === "Cannot divide by zero") return;

    currentInput = currentInput.startsWith("-")
        ? currentInput.slice(1)
        : "-" + currentInput;

    updateDisplay();
}

function calculatePercentage() {
    const value = parseFloat(currentInput);

    if (Number.isNaN(value)) return;

    currentInput = String(value / 100);
    updateDisplay();
}

buttons.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button) return;

    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value !== undefined) {
        if (value >= "0" && value <= "9" && value.length === 1) {
            inputNumber(value);
        } else if (value === ".") {
            inputDecimal();
        } else {
            chooseOperator(value);
        }
    }

    switch (action) {
        case "clear":
            clearCalculator();
            break;
        case "delete":
            deleteNumber();
            break;
        case "sign":
            toggleSign();
            break;
        case "percent":
            calculatePercentage();
            break;
        case "calculate":
            calculate();
            break;
    }
});

updateDisplay();
