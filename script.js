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
