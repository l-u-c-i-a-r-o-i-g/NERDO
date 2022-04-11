//* TOMA LAS PALABRAS/OBJETOS DE json Y LAS DEVUELVE EN EL ARRAY riddlesArray
async function loadRiddlesEasy() {
  let promise = await fetch("./json/riddles_easyLevel.json");
  let riddlesJSON = await promise.json();
  return riddlesJSON;
}
async function loadRiddlesMedium() {
  let promise = await fetch("./json/riddles_mediumLevel.json");
  let riddlesJSON = await promise.json();
  return riddlesJSON;
}
async function loadRiddlesHard() {
  let promise = await fetch("./json/riddles_hardLevel.json");
  let riddlesJSON = await promise.json();
  return riddlesJSON;
}
const changeBtnColorEasy = () => {
  btnEasy.classList.add("selectedLevel");
  btnMedium.classList.remove("selectedLevel");
  btnHard.classList.remove("selectedLevel");
  btnMedium.classList.add("d-none");
  btnHard.classList.add("d-none");
  btnEasy.disabled = true;
};
const changeBtnColorMedium = () => {
  btnMedium.classList.add("selectedLevel");
  btnEasy.classList.remove("selectedLevel");
  btnHard.classList.remove("selectedLevel");
  btnEasy.classList.add("d-none");
  btnHard.classList.add("d-none");
  btnMedium.disabled = true;
};
const changeBtnColorHard = () => {
  btnHard.classList.add("selectedLevel");
  btnEasy.classList.remove("selectedLevel");
  btnMedium.classList.remove("selectedLevel");
  btnEasy.classList.add("d-none");
  btnMedium.classList.add("d-none");
  btnHard.disabled = true;
};
const adviceOfInputs = () => {
  explanation.innerText = `⚠ TENER EN CUENTA ⚠\n>>>USAMOS ESPANGLISH... ALGUNAS PALABRAS ESTÁN EN INGLÉS(ING) Y OTRAS EN ESPAÑOL(ESP)\n>>> LOS ACENTOS DEBERÁS INGRESARLOS CUANDO SEA NECESARIO\n>>>TENES 15 SEGUNDOS PARA ADIVINAR, SI TARDAS MÁS SE TE DESCUENTAN 50 PUNTOS x_x\n>>>SI ELEGIS PASAR A OTRA PALABRA SE TE DESCUENTAN 50 PUNTOS x_x`;
};
musicOnOff.onclick = () => {
  if (volumeOff.classList.contains("d-none")) {
    volumeOn.classList.add("d-none");
    volumeOff.classList.remove("d-none");
    music.pause();
    music.currentTime = 0;
  } else if (volumeOn.classList.contains("d-none")) {
    volumeOff.classList.add("d-none");
    volumeOn.classList.remove("d-none");
    music.play();
    music.volume = 0.05;
  }
};
//*SI EL JUGADOR GANA, SE LANZA SWEETALERT y SE RESETEA EL JUEGO:
const playerWins = () => {
  if (nerdoArray.length === 45) {
    nerdoMessage();
    clueOnHtml.classList.add("d-none");
    divLetterInput.classList.add("d-none");
    btnStartGame.classList.add("d-none");
    btnEasy.classList.add("d-none");
    btnMedium.classList.add("d-none");
    btnHard.classList.add("d-none");
    btnSkipRiddle.classList.add("d-none");

    return true;
  } else if (guessedArray.length === riddlesArray.length) {
    clueOnHtml.classList.add("d-none");
    divLetterInput.classList.add("d-none");
    btnEasy.classList.remove("d-none");
    btnMedium.classList.remove("d-none");
    btnHard.classList.remove("d-none");
    explanation.classList.remove("d-none");
    explanation.innerText = `2 OPCIONES\nELEGIR OTRO NIVEL Y SEGUIR SUMANDO PUNTOS\nÓ\nREINICIAR EL JUEGO`;
    btnStartGame.classList.add("d-none");
    btnSkipRiddle.classList.add("d-none");
    winnerMessage();
    playAgain();
    return true;
  }
};
const winnerMessage = () => {
  swal({
    icon: "success",
    title: "GANASTE",
    text: "felicitaciones :) NERRRRRDO!",
    buttons: false,
    timer: 3500,
  });
};
const addGuessedToNerdoArray = () => {
  nerdoArray.push(guessedArray);
};
const nerdoMessage = () => {
  swal({
    icon: "success",
    title: "SOS THE REAL NERDO",
    text: "felicitaciones :) NERRRRRDO!",
    buttons: false,
    timer: 3500,
  });
};
const playAgain = () => {
  btnStartGame.innerText = `JUGAR DE NUEVO`;
};
const resetGame = () => {
  indexArray = [];
  guessedArray = [];
  attempt = 0;
  failedLetters = [];
  attemptOnHtml.classList.add("d-none");
  wrongLettersOnHtml.classList.add("d-none");
  btnSkipRiddle.classList.add("d-none");
};
//*EL JUEGO:
const checkHighScoreInStorage = () => {
  highestScore = JSON.parse(localStorage.getItem("HighestScore"));
  if (highestScore > 0) {
    highScore.innerText = `MEJOR PUNTAJE: ${highestScore}`;
  }
};
const resetFailedLettersAndPenalty = () => {
  failedLetters = [];
};
const initializeIndexArray = (size) => {
  if (indexArray.length === 0) {
    for (let i = 0; i < size; i++) {
      indexArray.push(i);
    }
  }
};
const shuffle = (array) => {
  return array.sort(() => Math.floor(Math.random() * array.length));
};
const pickRandomWord = (array) => {
  let randomIndex = indexArray[0];
  randomWord = array[randomIndex];
  return randomWord;
};
const hideRandomWord = (word) => {
  randomWordHidden = "_".repeat(word.name.length);
  return randomWordHidden;
};
const showClueScoreAttemptsBtns = () => {
  if (actualScore < 50) {
    btnSkipRiddle.innerText = `NO PODES ELEGIR OTRA PALABRA POR AHORA`;
    btnSkipRiddle.disabled = true;
    btnStartGame.classList.add("d-none");
    btnSkipRiddle.classList.remove("d-none");
  } else {
    btnSkipRiddle.innerText = `PREFIERO OTRA PALABRA (-50 PTS)`;
    btnSkipRiddle.disabled = false;
    btnStartGame.classList.add("d-none");
    btnSkipRiddle.classList.remove("d-none");
  }
  divLetterInput.classList.remove("d-none");
  clueOnHtml.classList.remove("d-none");
  gameScore.classList.remove("d-none");
  highScore.classList.remove("d-none");
  explanation.classList.add("d-none");
  btnRestart.classList.remove("d-none");
  attemptOnHtml.classList.remove("d-none");
  attemptOnHtml.innerHTML = `Intentos fallidos: ${attempt} de 5`;
  wrongLettersOnHtml.classList.remove("d-none");
  wrongLettersOnHtml.innerHTML = ``;
  btnStartGame.innerText = `SIGUIENTE PALABRA`;
  clueOnHtml.innerText = `${randomWord.lang}\n${randomWord.clue}\n${randomWordHidden}`;
  divLetterInput.innerHTML = `<input class="text-center p-2" type="text" name="letterInput" id="letterInput" placeholder ="INGRESA UNA LETRA" maxlength="1" autofocus>`;
};
const enteredLetterToUpperCase = () => {
  enteredLetter = document.getElementById("letterInput").value.toUpperCase();
  return enteredLetter;
};
const checkLetterReplaceHyphen = (letter) => {
  for (let i = 0; i < randomWordHidden.length; i++) {
    if (randomWord.name[i] === letter) {
      randomWordHidden =
        randomWordHidden.substring(0, i) +
        letter +
        randomWordHidden.substring(i + 1);
    }
    document.getElementById("letterInput").value = "";
  }
  return randomWordHidden;
};
const showClueAndHiddenWord = () => {
  clueOnHtml.innerText = `${randomWord.lang}\n${randomWord.clue}\n${randomWordHidden}`;
};
const addScore = (guessedWordScore) => {
  actualScore += guessedWordScore;
  if (actualScore > highestScore) {
    highestScore = actualScore;
    localStorage.setItem("HighestScore", `${highestScore}`);
    highScore.innerText = `MEJOR PUNTAJE: ${highestScore}`;
  }
  return actualScore;
};
const removeGuessedWord = () => {
  guessedArray.push(indexArray.shift());
};
const playerGuessedWord = () => {
  if (randomWordHidden === randomWord.name) {
    gameScore.innerHTML = `PUNTAJE ACTUAL: ${addScore(randomWord.score)}`;
    btnStartGame.classList.remove("d-none");
    btnSkipRiddle.classList.add("d-none");
    divLetterInput.classList.add("d-none");
    clueOnHtml.classList.add("d-none");
    attemptOnHtml.classList.add("d-none");
    wrongLettersOnHtml.classList.add("d-none");
    clearInterval(interval);
    Toastify({
      text: `ADIVINASTE!\n SUMAS ${randomWord.score} PUNTOS`,
      position: "center",
      style: {
        background: "linear-gradient(to right, #f7de1eec, #96c93d)",
      },
      avatar: "/PROYECTO/PROYECTO-FINAL/imgs/gato ganaste 2.jpg",
      duration: 2000,
    }).showToast();
    return true;
  }
};
const playerFails = () => {
  if (
    !randomWord.name.includes(enteredLetter) &&
    !failedLetters.includes(enteredLetter)
  ) {
    attempt++;
    failedLetters.push(enteredLetter);
    wrongLettersOnHtml.innerHTML = `INGRESOS ERRADOS: ${failedLetters}`;
    attemptOnHtml.innerHTML = `Intentos fallidos: ${attempt} de 5`;
    return true;
  }
};
const playerLoose = () => {
  clueOnHtml.innerText = "PERDISTE X_X";
  btnStartGame.innerText = `JUGAR DE NUEVO`;
  divLetterInput.classList.add("d-none");
  actualScore = 0;
  resetGame();
  clearInterval(interval);
};
const applyPenalty = () => {
  interval = setInterval(() => {
    if (actualScore > 0 && !playerWins()) {
      actualScore -= penalty;
      gameScore.innerHTML = `PUNTAJE ACTUAL: ${actualScore}`;
      Toastify({
        text: "Tardaste mucho, se te descuentan 50 puntos",
        className: "warning",
        style: {
          background: "linear-gradient(to right, #f7de1eec, #96c93d)",
        },
      }).showToast();
      if (actualScore < 50) {
        playerLoose();
      }
    }
  }, 15000);
};

const penaltyForSkippingRiddle = () => {
  if (actualScore != 0) {
    actualScore -= penalty;
    gameScore.innerHTML = `PUNTAJE ACTUAL: ${actualScore}`;
    Toastify({
      text: "ey! tenías que adivinar... 50 puntos menos por saltearte la palabra",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else if (actualScore < 50) {
    playerLoose();
  }
};
