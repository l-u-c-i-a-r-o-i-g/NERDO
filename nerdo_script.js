const explanation = document.getElementById("explanation");
const btnEasy = document.getElementById("btnEasy");
const btnMedium = document.getElementById("btnMedium");
const btnHard = document.getElementById("btnHard");
const btnStartGame = document.getElementById("btnStartGame");
const btnSkipRiddle = document.getElementById("btnSkipRiddle");
const btnRestart = document.getElementById("btnRestart");
let randomWord;
let randomWordHidden;

const clueOnHtml = document.getElementById("clueOnHtml");
const divLetterInput = document.getElementById("divLetterInput");

let attempt = 0;
const attemptOnHtml = document.getElementById("attempt");
const wrongLettersOnHtml = document.getElementById("wrongLetters");
let failedLetters = [];

let enteredLetter = document.getElementById("letterInput");
let guessedWord;

const gameScore = document.getElementById("gameScore");
const highScore = document.getElementById("highScore");
let actualScore = 0;
let highestScore;

const penalty = 50;
let interval;

const music = document.getElementById("music");
music.volume = 0.05;
const musicOnOff = document.getElementById("musicOnOff");
const volumeOn = document.getElementById("volumeOn");
const volumeOff = document.getElementById("volumeOff");

//*ARRAY DE PALABRAS PARA ADIVINAR
let riddlesArray = [];
//* ARRAY DE INDICES LANZADOS ALEATORIAMENTE
let indexArray = [];
//* ARRAY DE INDICES DE PALABRAS ADIVINADAS
let guessedArray = [];
//*ARRAY NERDO, SI LO COMPLETAS SOS THE REAL NERDO
let nerdoArray = [1];

btnEasy.onclick = () => {
  loadRiddlesEasy().then((data) => {
    riddlesArray = data;
  });
  btnStartGame.classList.remove("d-none");
  changeBtnColorEasy();
  adviceOfInputs();
};

btnMedium.onclick = () => {
  loadRiddlesMedium().then((data) => {
    riddlesArray = data;
  });
  btnStartGame.classList.remove("d-none");
  changeBtnColorMedium();
  adviceOfInputs();
};

btnHard.onclick = () => {
  loadRiddlesHard().then((data) => {
    riddlesArray = data;
  });
  btnStartGame.classList.remove("d-none");
  changeBtnColorHard();
  adviceOfInputs();
};

btnRestart.onclick = () => {
  location.reload();
};

btnStartGame.onclick = () => {
  if (playerWins()) {
    resetGame();
  } else {
    checkHighScoreInStorage();
    resetFailedLettersAndPenalty();
    initializeIndexArray(riddlesArray.length);
    shuffle(indexArray);
    hideRandomWord(pickRandomWord(riddlesArray));
    showClueScoreAttemptsBtns();
    if (guessedArray.length >= 1) {
      applyPenalty();
    }
  }
};

divLetterInput.onchange = () => {
  checkLetterReplaceHyphen(enteredLetterToUpperCase());
  showClueAndHiddenWord();
  if (playerGuessedWord()) {
    removeGuessedWord();
    addGuessedToNerdoArray();
  } else {
    playerFails();
  }
  if (attempt === 5) {
    playerLoose();
  }
};

btnSkipRiddle.onclick = () => {
  penaltyForSkippingRiddle();
  if (playerWins()) {
    resetGame();
  } else {
    checkHighScoreInStorage();
    resetFailedLettersAndPenalty();
    initializeIndexArray(riddlesArray.length);
    shuffle(indexArray);
    hideRandomWord(pickRandomWord(riddlesArray));
    showClueScoreAttemptsBtns();
  }
};
