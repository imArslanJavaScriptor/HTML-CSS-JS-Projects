const resultInput = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

let currentInput = "";
let previousInput = "";
let operator = "";
let resetDisplay = false;

// Update the display
function updateDisplay(value) {
  resultInput.value = value || "0";
}

// button clicks Handler for numbers and decimals
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (!isNaN(value) || value === ".") {
      if (resetDisplay) {
        currentInput = value; // Start fresh after "="
        resetDisplay = false;
      } else {
        if (value === "." && currentInput.includes(".")) return; // Prevent multiple decimals
        currentInput += value;
      }
      updateDisplay(currentInput);
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (operator && currentInput) calculate(); // Handle chaining
      operator = value;
      previousInput = currentInput || previousInput;
      currentInput = "";
    }
  });
});

// Perform calculation
function calculate() {
  if (!operator || !previousInput || !currentInput) return;

  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  let result;
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num2 !== 0 ? num1 / num2 : "Error";
      break;
    default:
      return;
  }

  previousInput = result.toString();
  currentInput = "";
  operator = "";
  updateDisplay(previousInput);
  resetDisplay = true; // Prepare for next input
}

// Handle equals button
equalsButton.addEventListener("click", calculate);

// Handle clear button
clearButton.addEventListener("click", () => {
  currentInput = "";
  previousInput = "";
  operator = "";
  updateDisplay("0");
});

// Initialize display
updateDisplay("0");
