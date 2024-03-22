window.addEventListener('load', init);

const levels = {
  easy: 6,
  medium: 4,
  hard: 3,
  difficult: 1
};


let currentLevel = levels.easy;
let time = currentLevel;
let score = 0;
let isPlaying;
let highscore = 0;


const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const hscore = document.querySelector('#highscore');
const levelmessage = document.getElementById('levelmessage');
const animateTimer = document.getElementById('animateTimer');
const animateHighScore = document.getElementById('animateHighScore');
const animateScore = document.getElementById('animateScore');


const words = [
  'laptop',
  'programming',
  'walk',
  'battery',
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'jason',
  'runaway',
  'joke',
  'developer',
  'establish',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition',
  'facebook',
  'instagram',
  'snapchat',
  'leopard',
  'live',
  'server',
  'family',
  'kingdom',
  'king',
  'java',
  'python',
  'assignment',
  'only',
  'information',
  'technology',
  'language',
  'icon',
  'motivation',,
  'naruto',
  'sakura',
  'sasuke',
  'madara',
  'furina',
  'aether'
];


function init() {
  showWord(words);
  wordInput.addEventListener('input', startMatch);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 50);
}


function startMatch() {
  levelNumber(currentLevel);
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }

  if (score > 40) {
    currentLevel = levels.difficult;
  } else if (score > 30) {
    currentLevel = levels.hard;
  } else if (score > 20) {
    currentLevel = levels.medium;
  }

  if (score === -1) {
    scoreDisplay.innerHTML = localStorage.getItem('currentscore');
  } else {
    scoreDisplay.innerHTML = score;
  }
}

function levelNumber(currentLevel) {
  if (currentLevel == levels.easy) {
    levelmessage.innerHTML = ` Level I`;
  } else if (currentLevel == levels.medium) {
    levelmessage.innerHTML = ` Level II`;
  } else if (currentLevel == levels.hard) {
    levelmessage.innerHTML = ` Level III`;
  } else if (currentLevel == levels.difficult) {
    levelmessage.innerHTML = ` Level IV`;
  }
}

function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    return true;
  } else {
    return false;
  }
}


function showWord(words) {
  animate(currentWord, 'jackInTheBox');
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    if (score != -1) {
      localStorage.setItem('currentscore', score);
    }

    if (currentWord.innerHTML !== 'Try Again') {
      if (currentWord.textContent !== 'Game Over!!') {
        animate(currentWord, 'bounceInRight');
        animate(animateScore, 'bounceIn');

      }
      animate(animateTimer, 'shake');
      currentWord.innerHTML = 'Game Over!!';

      setTimeout(() => {
        if (currentWord.innerHTML !== 'Try Again')
          animate(currentWord, 'swing');
        currentWord.innerHTML = 'Try Again';
        wordInput.placeholder = 'Type Try Again to start the game...';
      }, 3000);

    }
    currentLevel = levels.easy;
    setLocalStorage(score);
    score = -1;
  } else {
    wordInput.placeholder = 'Type above text...';
  }
}

function setLocalStorage(score) {
  highscore = localStorage.getItem('highscore');
  if (highscore < score) {
    animate(animateHighScore, 'shake');
    localStorage.setItem('highscore', score);
  }
  hscore.innerHTML = localStorage.getItem('highscore');

}


function animate(element, animation) {
  element.classList.add('animated', animation);
  const wait = setTimeout(() => {
    element.classList.remove('animated', animation);
  }, 1000);
}


document.oncontextmenu = function () {
  return false;
}

document.onkeydown = function (event) {
  if (event.which == 123)
    return false;
  else if (event.ctrlKey && event.shiftKey && event.keyCode == 73)
    return false;
  else if (event.ctrlKey && event.which == 85)
    return false;
}
