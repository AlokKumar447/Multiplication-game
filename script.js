const gameDiv = document.querySelector(".game");
const questionDiv = document.querySelector(".question");
const timerDiv = document.querySelector(".timer");
const answerDiv = document.querySelector(".answer");
let countdown;
let result = 0;
let isRunning = false;
let currentMode = null;
let tableRange = {};
let multiplicationMode = "";
let calcTime = 0;
let answerTime = 0;

function showGame() {
  document.querySelector(".menu").classList.add("hidden");
  gameDiv.classList.remove("hidden");
  answerDiv.classList.add("hidden");
}

function stopGame() {
  clearInterval(countdown);
  isRunning = false;
  document.querySelector(".menu").classList.remove("hidden");
  gameDiv.classList.add("hidden");
}

// Table Mode Handlers
function startTable(min, max) {
  showGame();
  tableRange = { min, max };
  currentMode = "table";
  multiplicationMode = "";
  isRunning = true;

  // Set timing rules for table modes
  if (max <= 10) {
    calcTime = 2;
    answerTime = 1;
  } else if (max <= 20) {
    calcTime = 4;
    answerTime = 1;
  } else {
    calcTime = 5;
    answerTime = 1;
  }

  nextTableQuestion();
}

function nextTableQuestion() {
  if (!isRunning) return;

  let a = Math.floor(Math.random() * 10) + 1;
  let b =
    Math.floor(Math.random() * (tableRange.max - tableRange.min + 1)) +
    tableRange.min;
  result = a * b;

  questionDiv.innerHTML = `<h2>${b} × ${a}</h2>`;
  answerDiv.innerHTML = `<p>= ${result}</p>`;
  answerDiv.classList.add("hidden");
  startTimer(calcTime);
}

// Multiplication Mode Handlers
function startMultiplication(mode) {
  showGame();
  currentMode = "multiplication";
  multiplicationMode = mode;
  isRunning = true;

  // Set timing based on mode
  switch (mode) {
    case "2x2":
      calcTime = 30;
      answerTime = 2;
      break;
    case "3x3":
      calcTime = 100;
      answerTime = 2;
      break;
    case "4x4":
      calcTime = 180;
      answerTime = 3;
      break;
  }

  nextMultiplicationQuestion();
}

function nextMultiplicationQuestion() {
  if (!isRunning) return;

  let a, b;

  // Generate numbers based on the current multiplication mode
  switch (multiplicationMode) {
    case "2x2":
      a = Math.floor(Math.random() * 90) + 10; // 10-99
      b = Math.floor(Math.random() * 90) + 10; // 10-99
      break;
    case "3x3":
      a = Math.floor(Math.random() * 900) + 100; // 100-999
      b = Math.floor(Math.random() * 900) + 100; // 100-999
      break;
    case "4x4":
      a = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
      b = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
      break;
  }

  result = a * b;

  questionDiv.innerHTML = `
    <h2>Solve:</h2>
    <p class="multiplication-problem">  ${  a}</p>
    <p class="multiplication-problem"> ${b}</p>
  `;
  answerDiv.innerHTML = `<p>Result: ${result.toLocaleString()}</p>`;
  answerDiv.classList.add("hidden");

  startTimer(calcTime);
}

// Common timer function
function startTimer(duration) {
  clearInterval(countdown);
  let remaining = duration;
  updateTimerDisplay(remaining);

  countdown = setInterval(() => {
    remaining--;
    updateTimerDisplay(remaining);
    if (remaining <= 0) {
      clearInterval(countdown);
      showAnswer(true);
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timerDiv.innerHTML = `Time remaining: ${mins > 0 ? `${mins}m ` : ""}${secs}s`;
}

function showAnswer(auto = false) {
  clearInterval(countdown);
  answerDiv.classList.remove("hidden");
  updateTimerDisplay(answerTime);

  setTimeout(() => {
    if (!isRunning) return;

    if (currentMode === "table") nextTableQuestion();
    else if (currentMode === "multiplication") nextMultiplicationQuestion();
  }, answerTime * 1000);
}
