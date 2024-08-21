let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameMode = 'player'; // Can be 'player' or 'bot'
let gameActive = true;
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

function startGame(mode) {
    gameMode = mode;
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
}

function makeMove(index) {
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    document.querySelectorAll('.cell')[index].textContent = currentPlayer;

    if (checkWinner()) {
        document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        document.getElementById('status').textContent = `It's a tie!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (gameMode === 'bot' && currentPlayer === 'O') {
        botMove();
    } else {
        document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
    }
}

function botMove() {
    // Simple bot logic: pick random empty spot
    let emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    setTimeout(() => {
        makeMove(randomMove);
    }, 500); // Small delay to mimic thinking
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}
