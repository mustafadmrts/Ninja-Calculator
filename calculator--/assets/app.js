const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let initValue = 0;
let operatorValue = "";
let numWait = false;

function sendNumberValue(number) {
  if (numWait) {
    calculatorDisplay.textContent = number;
    numWait = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}


function addDecimal() {
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}


function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);

  if (operatorValue && numWait) {
    operatorValue = operator;
    return;
  }
  if (!initValue) {
    initValue = currentValue;
  } else {
    const calculation = calc[operatorValue](initValue, currentValue);
    calculatorDisplay.textContent = calculation;
    initValue = calculation;
  }
  numWait = true;
  operatorValue = operator;
}


const calc = {
  "/": (firstNum, secNum) => firstNum / secNum,
  "*": (firstNum, secNum) => firstNum * secNum,
  "+": (firstNum, secNum) => firstNum + secNum,
  "-": (firstNum, secNum) => firstNum - secNum,
  "=": (firstNum, secNum) => secNum,
};


inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});


function resetAll() {
  calculatorDisplay.textContent = "0";
  initValue = 0;
  operatorValue = "";
  numWait = false;
}

clearBtn.addEventListener("click", resetAll);
    