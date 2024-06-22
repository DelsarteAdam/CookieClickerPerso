import { duckParagraphs } from "./words.js";

let totalScore = 0;
let totalScoreHtml = document.getElementById("score");

let totalMultiplicateur = 1;
let totalMultiplicateurBonus = 1;
let totalMultiplicateurHtml = document.getElementById("multiplicateurText");

let cookieClick = document.getElementById("cookie");

let bonus1 = document.getElementById("bonus1");
let bonus2 = document.getElementById("bonus2");
let bonus3 = document.getElementById("bonus3");
let bonus4 = document.getElementById("bonus4");

let bonus1Multiplicator = 2;
let bonus2Multiplicator = 3;
let bonus3Multiplicator = 4;
let bonus4Multiplicator = 5;

let bonus1Cost = 10;
let bonus2Cost = 100;
let bonus3Cost = 1000;
let bonus4Cost = 10000;

let bonus1Number = 0;
let bonus2Number = 0;
let bonus3Number = 0;
let bonus4Number = 0;

let arrBonus = [bonus1, bonus2, bonus3];
let arrBonusCost = [bonus1Cost, bonus2Cost, bonus3Cost];

let autoClickNumber = 0;

let time200Bonus = 0;
let time200BonusCheck = false;

let progressBar = 0;
let progressBarHtml = document.getElementById("progressBarZone");
let progressBarBonus = false;
let time300Bonus = 0;

let randomTextHtml = document.getElementById("randomText");
//update score

function updateScore() {
  totalScoreHtml.innerHTML = totalScore;
}
//update multiplicatorscore

function updateMultiplicatorScore() {
  totalMultiplicateurHtml.innerHTML = totalMultiplicateurBonus;
}

// add score on cookie click

function clickScore() {
  totalScore += 1 * totalMultiplicateurBonus;
  progressBarAdd();
}

//auto clicker function
function autoClicker() {
  totalScore += autoClickNumber * totalMultiplicateurBonus;
  progressBarAdd();
}

//check able to buy

function ableToBuy() {
  for (let i = 0; i < arrBonus.length; i++) {
    if (arrBonusCost[i] > totalScore) {
      arrBonus[i].disabled = true;
    } else {
      arrBonus[i].disabled = false;
    }
  }
}

//bonus1

//update text cost bonus1:

function bonus1UpdateText() {
  bonus1.innerHTML = `multiplicator +2 cost ${bonus1Cost}`;
}

function bonus1Action() {
  totalMultiplicateur += bonus1Multiplicator;
  totalScore -= bonus1Cost;
  bonus1Cost *= 1.25;
  bonus1Cost = Math.floor(bonus1Cost);
  arrBonusCost[0] = bonus1Cost;
  bonus1UpdateText();

  updateMultiplicatorScore();
}

//bonus2 autoclicker

function bonus2UpdateText() {
  bonus2.innerHTML = `autoclicker +${autoClickNumber} cost ${bonus2Cost}`;
}

function bonus2Action() {
  autoClickNumber++;
  totalScore -= bonus2Cost;
  bonus2Cost *= 1.25;
  bonus2Cost = Math.floor(bonus2Cost);
  arrBonusCost[1] = bonus2Cost;
  bonus2UpdateText();
}

//bonus 200%

function ActionMultiplicator() {
  if (time200BonusCheck === true && progressBarBonus === true) {
    totalMultiplicateurBonus = totalMultiplicateur * 6;
    updateBonusHtml(6);
  } else if (time200BonusCheck === true) {
    totalMultiplicateurBonus = totalMultiplicateur * 2;
    updateBonusHtml(2);
  } else if (progressBarBonus === true) {
    totalMultiplicateurBonus = totalMultiplicateur * 3;
    updateBonusHtml(3);
  } else {
    totalMultiplicateurBonus = totalMultiplicateur;
    updateBonusHtml(1);
  }
}

function bonus3UpdateText() {
  bonus3.innerHTML = `bonus 200% time left${time200Bonus}sec cost ${bonus3Cost}`;
}

function bonus3Action() {
  if (time200BonusCheck === false) {
    bonus3.style.backgroundColor = "#ac851a";
    time200BonusCheck = true;
    totalScore -= bonus3Cost;
    bonus3Cost *= 1.25;
    bonus3Cost = Math.floor(bonus3Cost);
    arrBonusCost[2] = bonus3Cost;
    time200Bonus += 30;
    updateMultiplicatorScore();
    const bonusTimer = setInterval(function () {
      time200Bonus--;
      bonus3UpdateText();
      if (time200Bonus === 0) {
        bonus3UpdateText();
        time200BonusCheck = false;
        bonus3.style.backgroundColor = "";
        updateMultiplicatorScore();
        clearInterval(bonusTimer);
      }
    }, 1000);
  }
}

//all multi update

function allMultiUpdate() {
  ActionMultiplicator();
  updateMultiplicatorScore();
}

//Progress bar

function progressBarAdd() {
  if (progressBarBonus === false) {
    progressBar += 1;
    progressBarHtml.innerHTML = `${progressBar}%`;
    progressBarHtml.style.width = `${progressBar}%`;
    if (progressBar == 100) {
      progressBarBonus = true;
      bonusProgreesBar();
    } else {
    }
  } else {
  }
}

//bonus progress

function bonusProgreesBar() {
  if (progressBarBonus === true) {
    progressBarHtml.style.backgroundColor = "#ac851a";

    time300Bonus += 30;
    updateMultiplicatorScore();
    const bonusTimer2 = setInterval(function () {
      time300Bonus--;
      progressBar -= 3.3;
      progressBarHtml.style.backgroundColor = "#ac851a";
      progressBarHtml.innerHTML = `Bonus Time !`;
      progressBarHtml.style.width = `${progressBar}%`;

      if (time300Bonus === 0) {
        progressBarBonus = false;
        progressBarHtml.style.backgroundColor = "";
        progressBarHtml.style.width = `1%`;
        progressBarHtml.innerHTML = `0%`;
        progressBar = 0;
        updateMultiplicatorScore();
        clearInterval(bonusTimer2);
      }
    }, 1000);
  }
}

//bonus bonus

function updateBonusHtml(numbers) {
  document.getElementById("bonusMultiplator").innerHTML = `BONUS X ${numbers}`;
}

// random text

function randomText() {
  var randomTemp = Math.floor(Math.random() * 97);
  randomTextHtml.innerHTML = duckParagraphs[randomTemp];
}

//update able to click

window.setInterval(ableToBuy, 10);
cookieClick.addEventListener("click", clickScore);
bonus1.addEventListener("click", bonus1Action);
//auto clicker
bonus2.addEventListener("click", bonus2Action);
window.setInterval(autoClicker, 1000);
//bonus 200%
bonus3.addEventListener("click", bonus3Action);
//update score on interval
window.setInterval(updateScore, 10);
//update multiplicator
window.setInterval(allMultiUpdate, 10);
//random text
randomText();
window.setInterval(randomText, 10000);
//text update
bonus1UpdateText();
bonus2UpdateText();
bonus3UpdateText();
