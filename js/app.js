let openCardsArray = [];
let matchedCardsArray = [];
let starsNum = 3;
let moveNum = 0;
let time = 0;
let addTime;
let endTime;

const secondStar = document.querySelector('.second-star');
const thirdStar = document.querySelector('.third-star');
const movesCounter = document.querySelector('.moves');
const restartButton = document.querySelector('.fa-repeat');
const showTime = document.querySelector('.timer');
const theDeck = document.querySelector('.deck');
const allCards = document.querySelectorAll('.card');
const modal = document.querySelector('.modal');
const finalStars = document.querySelector('.final-stars');
const finalMoves = document.querySelector('.final-moves');
const finalTime = document.querySelector('.final-time');
const playAgain = document.querySelector('.play-again');

/*
 * Create a list that holds all of your cards
 */
const cardClassesArray = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function shuffleDeck(array) {
    let shuffleCardsArray = shuffle(cardClassesArray);//call the shuffle function
    for (i = 0; i < array.length; i++) {
        array[i].firstElementChild.className = shuffleCardsArray[i];
    }
}

shuffleDeck(allCards);//pass allCards as argument to shuffleDeck

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//event listener if a card is clicked
theDeck.addEventListener('click', respondToClick);

/*
 * The cards will have an object property called isShowing that will monitor if the card is opened or matched.
 * If the property is set to true, then the card is opened or matched and can not be clicked again.
 */
function respondToClick (e) {
  if ((e.target.nodeName === 'LI') && (e.target.isShowing !== true) && (openCardsArray.length !== 2)) {
    displayCard (e);
    addOpenCard (e);
    compare (e);
    addMove ();
    startEndTimer ();
    removeStars ();
    allMatched ();
  }
}

//Display the card's symbol
function displayCard (e) {
  e.target.classList.add('open', 'show');
  e.target.isShowing = true;
}

//Add the card to a *list* of "open" cards
function addOpenCard(e) {
    openCardsArray.push(e.target.firstElementChild);
}

//If the list already has another card, check to see if the two cards match
function compare (e) {
  cardsMatch (openCardsArray);
  cardsNotMatch (openCardsArray);
}

//If the cards do match, lock the cards in the open position
function cardsMatch (array) {
  if (array.length === 2 && array[0].className === array[1].className) {
    array[0].parentElement.className = 'card match';
    array[1].parentElement.className = 'card match';
    openCardsArray = [];
    matchedCardsArray.push(array[0]);
  }
}

//If the cards do not match, remove the cards from the list and hide the card's symbol
function cardsNotMatch (array) {
  if (array.length === 2 && array[0].className !== array[1].className) {
    setTimeout (function () {
      array[0].parentElement.className = 'card';
      array[1].parentElement.className = 'card';
      array[0].parentElement.isShowing = false;
      array[1].parentElement.isShowing = false;
      openCardsArray = [];
    }, 500);
  }
}

//Increment the move counter and display it on the page
function addMove() {
    moveNum++;
    movesCounter.innerHTML = moveNum;
}

//Set a timer
function startEndTimer () {
  if (moveNum === 1) {
    addTime = setInterval(function () {
      time++;
      showTime.innerHTML = time;
    }, 1000);
  } else if (matchedCardsArray.length === 8) {
    clearInterval(addTime);
    endTime = time;
    finalTime.innerHTML = endTime;
  }
}

//Star rating
 function removeStars () {
   if (moveNum > 24 && moveNum <= 32) {
     thirdStar.style.display = 'none';
     starsNum = 2;
   } else if (moveNum > 32) {
     secondStar.style.display = 'none';
     starsNum = 1;
   }
 }

//If all cards have matched, display a message with the final score
function allMatched () {
  if (matchedCardsArray.length === 8) {
    modal.style.display = 'block';
    finalMoves.innerHTML = moveNum;
    finalStars.innerHTML = starsNum;
  }
}

// When the user clicks play again or the restart button, (close the modal and) start a new game
playAgain.addEventListener('click', newGame);
restartButton.addEventListener('click', newGame);

function newGame() {
  for (let i = 0; i < allCards.length; i++) {
      allCards[i].classList.remove('match', 'open', 'show');
      allCards[i].isShowing = false;
  }
  openCardsArray = [];
  matchedCardsArray = [];
  secondStar.style.display = "inline-block";
  thirdStar.style.display = "inline-block";
  moveNum = 0;
  movesCounter.innerHTML = moveNum;
  time = 0;
  showTime.innerHTML = time;
  shuffleDeck(allCards);
  modal.style.display = "none";
}
