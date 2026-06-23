//
const ResultDisplay = document.getElementById("Result");
const OperationDisplay = document.getElementById("Operation");

// Declaration
let firsttime = true;
let previousValue = null;
let operator = null;
let nextValue = null;
let waitingForSecondOperand = true;
let finalResult = null;

// Clear Display
function clearDisplay() {
  firsttime = true;
  currentInput = "0";
  previousValue = null;
  operator = null;
  nextValue = null;
  waitingForSecondOperand = true;
  ResultDisplay.value = 0;
  OperationDisplay.innerHTML = "";
}

// Numbers
function handleNumbers(num) {
  if ("vibrate" in navigator) {
    navigator.vibrate(60);
  }
  if (waitingForSecondOperand) {
    if (firsttime) {
      OperationDisplay.innerHTML = "";
      previousValue = num;
      firsttime = false;
      ResultDisplay.value = previousValue;
    } else {
      ResultDisplay.value += num;
      previousValue = ResultDisplay.value;
    }
  } else {
    if (firsttime) {
      nextValue = num;
      firsttime = false;
      ResultDisplay.value = nextValue;
    } else {
      ResultDisplay.value += num;
      nextValue = ResultDisplay.value;
    }
    handleCalculation(previousValue, nextValue, operator);
  }
}

// final result
function handleResult() {
  if (nextValue === "0" && operator === "÷") {
    ResultDisplay.value = "Error: Division by zero";
    return;
  }
  ResultDisplay.value = finalResult;
  firsttime = true;
  previousValue = finalResult;
  operator = null;
  nextValue = null;
  waitingForSecondOperand = true;
}

// handel Desimal
function handelDesimal() {
  if (waitingForSecondOperand) {
    ResultDisplay.value = previousValue / 100;
    previousValue = ResultDisplay.value;
  } else {
    ResultDisplay.value = nextValue / 100;
    nextValue = ResultDisplay.value;
    handleCalculation(previousValue, nextValue, operator);
  }
}

// toggle sign
function toggleSign() {
  if (waitingForSecondOperand) {
    ResultDisplay.value = previousValue * -1;
    previousValue = ResultDisplay.value;
  } else {
    ResultDisplay.value = nextValue * -1;
    nextValue = ResultDisplay.value;
    handleCalculation(previousValue, nextValue, operator);
  }
}

// operation
function handelOperation(op) {
  waitingForSecondOperand = false;
  firsttime = true;
  operator = op;
  OperationDisplay.innerHTML = `${previousValue} ${op}`;
}

function handleCalculation(first, second, op) {
  let result;
  if (op === "+") {
    result = Number(first) + Number(second);
  } else if (op === "-") {
    OperationDisplay.innerHTML = first + op;
    result = Number(first) - Number(second);
  } else if (op === "x") {
    OperationDisplay.innerHTML = first + op;
    result = Number(first) * Number(second);
  } else if (op === "÷") {
    OperationDisplay.innerHTML = first + op;
    result = Number(first) / Number(second);
  }
  // finalResult = result;
  finalResult = roundToDecimalPlaces(result, 4);
  OperationDisplay.innerHTML = `${previousValue} ${operator} ${nextValue}`;
}

function roundToDecimalPlaces(num, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
}
// console.log(roundToDecimalPlaces(3.14159, 2)); // Output: 3.14

// delete last digit
function handleDelete() {
  if (waitingForSecondOperand) {
    previousValue = previousValue.slice(0, -1);
    ResultDisplay.value = previousValue || "0";
  } else {
    nextValue = nextValue.slice(0, -1);
    ResultDisplay.value = nextValue || "0";
    handleCalculation(previousValue, nextValue, operator);
  }
}

document.addEventListener("keydown", (event) => {
  if ((event.key >= "0" && event.key <= "9") || event.key === ".") {
    handleNumbers(event.key);
  }
  if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/"
  ) {
    handelOperation(
      event.key === "*" ? "x" : event.key === "/" ? "÷" : event.key,
    );
  }
  if (event.key === "Enter" || event.key === "=") {
    handleResult();
  }
  if (event.key === "%") {
    handelDesimal();
  }
  if (event.key === "Backspace") {
    handleDelete();
  }
  if (event.key === "Escape") {
    clearDisplay();
  }
});
