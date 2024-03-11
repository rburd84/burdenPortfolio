const newGame = getElement(".new-game-btn");
const rollBtn = getElement(".roll-dice-btn");
const betBtn = getElement("#bet-btn");
const form = getElement("form");

class Dice {
  constructor(pips, src = "") {
    this.pipCount = pips;
    this.src = `./images/${this.pipCount}.png`;
  }
}

class Game {
  constructor() {
    this.firstRoll = true;
    this.isPoint = false;
    this.win = false;
    this.loss = false;
    this.wager = 0;
    this.gameOver = false;
    this.currentPoint = 0;
    this.currentRoll = {};
  }
}

class GameBoard {
  constructor() {
    this.board = getElement("#board");
    this.diceContainer = getElement(".dice-container");
    this.diceDisplay = getElement(".dice-display");
    this.dice1 = getElement("#die1");
    this.dice2 = getElement("#die2");
    this.point = getElement(".point");
    this.roll = getElement(".curr-roll");
    this.outcomePoint = getElement("#outcome-point");
    this.outcomeMsg = getElement("#outcome-msg");
    this.money = getElement("#money");
    this.betAmount = getElement("#bet-amount");
  }

  printDie({ dice1, dice2 }) {
    this.dice1.src = `${dice1.src}`;
    this.dice2.src = `${dice2.src}`;

    return;
  }
}

class Bet {
  constructor(balance) {
    this.balance = balance;
  }

  increase(amount) {
    if (amount > this.balance) {
      console.log("You do not have that amount to wager");
      return this.balance;
    }
    const newBalance = this.balance + amount;
    this.balance = newBalance;

    return this.balance;
  }

  decrease(amount) {
    if (amount > this.balance) {
      console.log("You do not have that amount to wager");
      return this.balance;
    }

    const newBalance = this.balance - amount;
    this.balance = newBalance;

    return this.balance;
  }
}

const playGame = () => {
  let game = new Game();
  const board = new GameBoard();
  const bank = new Bet(2000);
  board.money.textContent = bank.balance;

  // Handle the roll of the dice
  rollBtn.addEventListener("click", () => {
    game.currentRoll = rollDie();
    const { point } = game.currentRoll;
    let msg, display;
    board.printDie(game.currentRoll);
    board.diceDisplay.classList.remove("hidden");
    board.point.textContent = game.currentRoll.point;

    const checkOutcome = () => {
      if (game.win) {
        bank.increase(game.wager);
        board.money.textContent = bank.balance;
      }

      if (game.loss) {
        bank.decrease(game.wager);
        board.money.textContent = bank.balance;
      }

      if (game.gameOver) {
        rollBtn.setAttribute("disabled", true);
      }
    };

    // Handle First Roll outcome   -  COME OUT ROLL
    if (game.firstRoll) {
      if (point === 7 || point === 11) {
        game.win = true;
        msg = "YOU WIN";
        game.gameOver = true;
      } else if (point === 2 || point === 3 || point === 12) {
        game.loss = true;
        game.gameOver = true;
        msg = "YOU LOSE";
      } else {
        game.firstRoll = false;
        game.isPoint = true;
        board.roll.textContent = point;
        game.currentPoint = point;
        msg = `YOUR POINT IS ${point}`;
      }

      board.outcomePoint.textContent = msg;
      checkOutcome();
      return;
    }

    // Handle roll if point already made
    if (game.isPoint) {
      if (point === game.currentPoint) {
        game.win = true;
        game.gameOver = true;
        display = `Congrats you WIN!!! You rolled your POINT: ${point}`;
      } else if (point === 7) {
        game.loss = true;
        game.gameOver = true;
        display = `YOU LOSE. You rolled the number ${point} before your POINT: ${game.currentPoint}`;
      }

      board.outcomeMsg.textContent = display;
      checkOutcome();
      return;
    }
  });

  newGame.addEventListener("click", () => {
    board.diceDisplay.classList.add("hidden");
    game = resetGame();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    game.wager = parseInt(board.betAmount.value);
    betBtn.setAttribute("disabled", true);
    getElement("#bet-amount").setAttribute("disabled", true);
  });
};

// Roll Dice function
function rollDie() {
  const dice1 = new Dice(Math.floor(Math.random() * 6) + 1);
  const dice2 = new Dice(Math.floor(Math.random() * 6) + 1);
  const point = dice1.pipCount + dice2.pipCount;

  return { dice1, dice2, point };
}

// Helper function to select DOM elements
function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(`Couldn't find element with selection ${selection}`);
}

// Resets the game to the initial state
function resetGame() {
  const game = new Game();
  getElement("#outcome-point").textContent = "";
  getElement("#outcome-msg").textContent = "";
  getElement(".curr-roll").textContent = "";
  getElement(".point").textContent = "";
  getElement("#bet-amount").removeAttribute("disabled");

  rollBtn.removeAttribute("disabled");
  betBtn.removeAttribute("disabled");

  return game;
}

playGame();

// switch (point) {
//   case 2:
//   case 3:
//   case 12:
//     const newGame = resetGame();
//     game = newGame;
//     console.log(newGame, game);
//     msg = "LOSE";
//     break;

//   case 7:
//   case 11:
//     msg = "WIN";
//     break;

//   default:
//     board.roll.textContent = point;
//     game.currentPoint = point;
//     console.log(game);
//     msg = "POINT";
//     break;
// }
