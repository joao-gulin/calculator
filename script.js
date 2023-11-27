let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitForSecondOperand = false;

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitForSecondOperand = false;
    updateDisplay();
}

function appendNumber(number) {
    if (waitForSecondOperand) {
        displayValue = number;
        waitForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }

    updateDisplay();
}

function appendDecimal() {
    if (waitForSecondOperand) return;
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

function setOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = operate(operator, firstOperand, inputValue);
        displayValue = String(result);
        firstOperand = result;
    }

    operator = nextOperator;
    waitForSecondOperand = true;
}

function operate(operator, num1, num2) {
    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        if (num2 === 0) {
          alert("Cannot divide by zero!");
          clearDisplay();
          return;
        }
        return num1 / num2;
      default:
        return num2;
    }
}

function calculate() {
    if (operator && !waitForSecondOperand) {
        const inputValue = parseFloat(displayValue);
        displayValue = operate(operator, firstOperand, inputValue);
        firstOperand = null;
        operator = null;
        updateDisplay();
        waitForSecondOperand = true;
    }
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
  
    if (/\d/.test(key)) {
      appendNumber(key);
    } else if (key === '.') {
      appendDecimal();
    } else if (key === 'Enter') {
      calculate();
    } else if (key === 'Backspace') {
      clearDisplay();
    } else if (['+', '-', '*', '/'].includes(key)) {
      setOperator(key);
    }
});
  
// Initialize display
updateDisplay();