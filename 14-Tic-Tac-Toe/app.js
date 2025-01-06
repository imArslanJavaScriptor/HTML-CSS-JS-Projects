const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset-btn");
let currentPlayer = "X";
let board = Array(9).fill(null);
let gameOver = false;

const checkWinner = (player) => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Vertical
    [0, 4, 8],
    [2, 4, 6], // Diagonal
  ];

  return winningCombos.some((combo) =>
    combo.every((index) => board[index] === player)
  );
};

const updateBoard = (index) => {
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
};

const handleClick = (event) => {
  const cellIndex = event.target.dataset.cell;

  if (board[cellIndex] || gameOver) return;

  updateBoard(cellIndex);

  if (checkWinner(currentPlayer)) {
    message.textContent = `${currentPlayer} wins!`;
    gameOver = true;
  } else if (board.every((cell) => cell !== null)) {
    message.textContent = "It's a draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
};

const resetGame = () => {
  board = Array(9).fill(null);
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
  message.textContent = `Player X's turn`;
  gameOver = false;
};

cells.forEach((cell) => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
