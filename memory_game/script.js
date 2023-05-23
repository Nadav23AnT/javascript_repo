// HTML Elements
const gameContainer = document.getElementById('game-container');
const timerElement = document.getElementById('timer');
const playerNameElement = document.getElementById('player-name');
const successRateElement = document.getElementById('success-rate');
const restartButton = document.getElementById('restart-button');

// Game variables
let cards = [];
let openedCards = [];
let matchedCards = [];
let timer;
let remainingTime;
let successGuesses = 0;

// Prompt user for name and number of cards
const playerName = prompt('Please enter your name:');
let numCards = parseInt(prompt('Please enter the number of cards (up to 30, even number only):'), 10);

// Validate the input for the number of cards
while (isNaN(numCards) || numCards <= 0 || numCards > 30 || numCards % 2 !== 0) {
  numCards = parseInt(prompt('Invalid input! Please enter an even number of cards (up to 30):'), 10);
}

// Update player name
playerNameElement.textContent = `Player: ${playerName}`;

// Function to reset the game
function resetGame() {
  // Clear the game container
  gameContainer.innerHTML = '';

  // Reset game variables
  cards = [];
  openedCards = [];
  matchedCards = [];
  successGuesses = 0;

  // Generate an array of cards with random numbers
  for (let i = 1; i <= numCards / 2; i++) {
    cards.push({ id: i, value: i });
    cards.push({ id: i, value: i });
  }

  // Shuffle the array of cards
  shuffle(cards);

  // Render the cards on the game board
  renderCards();

  // Update success rate
  updateSuccessRate();

  // Calculate the initial remaining time
  remainingTime = 60 * numCards / 2 + Math.floor(numCards / 2) * 30;

  // Start the game timer
  startTimer();
}

// Generate the initial game
resetGame();

// Shuffle function to randomize the order of cards
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Function to render the cards on the game board
function renderCards() {
  for (let i = 0; i < numCards; i++) {
    const card = document.createElement('div');
    const cardInner = document.createElement('div');
    const cardFront = document.createElement('div');
    const cardBack = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = cards[i].id;
    cardInner.classList.add('card-inner');
    cardFront.classList.add('card-front');
    cardBack.classList.add('card-back');
    cardFront.innerText = cards[i].value;
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    gameContainer.appendChild(card);
  }

  const cardElements = document.querySelectorAll('.card');
  cardElements.forEach(card => {
    card.addEventListener('click', flipCard);
  });
}

// Function to handle card click event
function flipCard(event) {
  const clickedCard = event.target.closest('.card');

  if (
    clickedCard &&
    !clickedCard.classList.contains('flip') &&
    openedCards.length < 2 &&
    !matchedCards.includes(clickedCard)
  ) {
    clickedCard.classList.add('flip');
    openedCards.push(clickedCard);

    if (openedCards.length === 2) {
      checkMatch();
    }
  }
}

// Function to check if the opened cards are a match
function checkMatch() {
  const card1 = openedCards[0];
  const card2 = openedCards[1];

  if (card1.dataset.id === card2.dataset.id) {
    card1.classList.add('match');
    card2.classList.add('match');
    matchedCards.push(card1, card2);
    successGuesses++;
    updateSuccessRate();
    checkWin();
  } else {
    setTimeout(() => {
      card1.classList.remove('flip');
      card2.classList.remove('flip');
    }, 1000);
  }

  openedCards = [];
}

// Function to check if the player has won the game
function checkWin() {
  if (matchedCards.length === numCards) {
    stopTimer();
    restartButton.disabled = false;
    const playAgain = confirm(`Congratulations, ${playerName}! You won the game!\n\nDo you want to play again?`);

    if (playAgain) {
      numCards = parseInt(prompt('Please enter the number of cards (up to 30, even number only):'), 10);

      while (isNaN(numCards) || numCards <= 0 || numCards > 30 || numCards % 2 !== 0) {
        numCards = parseInt(prompt('Invalid input! Please enter an even number of cards (up to 30):'), 10);
      }

      restartButton.disabled = true;
      resetGame();
    }
  }
}

// Function to start the game timer
function startTimer() {
  timer = setInterval(() => {
    remainingTime--;
    timerElement.innerText = `Time: ${Math.floor(remainingTime / 60)}:${remainingTime % 60}`;

    if (remainingTime === 0) {
      stopTimer();
      restartButton.disabled = false;
      alert(`Time's up, ${playerName}! Game over.`);
    }
  }, 1000);
}

// Function to stop the game timer
function stopTimer() {
  clearInterval(timer);
}

// Function to update the success rate
function updateSuccessRate() {
  const percentage = Math.floor((successGuesses / (numCards / 2)) * 100);
  successRateElement.textContent = `Success Rate: ${percentage}%`;
}

// Event listener for the restart button
restartButton.addEventListener('click', () => {
  numCards = parseInt(prompt('Please enter the number of cards (up to 30, even number only):'), 10);

  while (isNaN(numCards) || numCards <= 0 || numCards > 30 || numCards % 2 !== 0) {
    numCards = parseInt(prompt('Invalid input! Please enter an even number of cards (up to 30):'), 10);
  }

  restartButton.disabled = true;
  resetGame();
});
