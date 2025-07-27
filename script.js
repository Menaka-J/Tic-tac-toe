const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const resultDisplay = document.getElementById("result");
const resetBtn = document.getElementById("reset");
const playerTurn = document.getElementById("player");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Handle Cell Click
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");

        if (boardState[index] === "" && gameActive) {
            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add("taken");
            checkWinner();
            switchPlayer();
        }
    });
});

// Switch Player
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerTurn.textContent = currentPlayer;
}

// Check Winner
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            resultDisplay.textContent = `Player ${boardState[a]} Wins! 🎉`;
            highlightWinner(pattern);
            return;
        }
    }

    if (!boardState.includes("")) {
        gameActive = false;
        resultDisplay.textContent = "It's a Draw! 😲";
    }
}

// Highlight Winning Cells
function highlightWinner(pattern) {
    pattern.forEach(index => {
        cells[index].style.background = "green";
        cells[index].style.color = "white";
    });
}

// Reset Game
resetBtn.addEventListener("click", () => {
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    playerTurn.textContent = currentPlayer;
    resultDisplay.textContent = "";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
        cell.style.background = "rgba(255, 255, 255, 0.2)";
        cell.style.color = "black";
    });
});