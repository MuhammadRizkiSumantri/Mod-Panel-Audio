const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const toggleTurnBtn = document.getElementById('toggle-turn-btn');

const musicPlayer = document.getElementById('game-music');
const musicBtn = document.getElementById('music-btn');

const chessPieces = {
    'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙',
    'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟'
};

let boardState = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

let selectedPiece = null;
let turn = 'Putih';

function createBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square', (row + col) % 2 === 0 ? 'white' : 'black');
            square.dataset.row = row;
            square.dataset.col = col;
            square.textContent = chessPieces[boardState[row][col]] || '';
            square.addEventListener('click', onSquareClick);
            boardElement.appendChild(square);
        }
    }
}

function onSquareClick(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (selectedPiece) {
        const startRow = selectedPiece.dataset.row;
        const startCol = selectedPiece.dataset.col;
        
        boardState[row][col] = boardState[startRow][startCol];
        boardState[startRow][startCol] = '';
        
        selectedPiece.classList.remove('selected');
        selectedPiece = null;
        turn = turn === 'Putih' ? 'Hitam' : 'Putih';
        statusElement.textContent = `Giliran: ${turn}`;
        createBoard();

    } else {
        if (boardState[row][col]) {
            selectedPiece = event.target;
            selectedPiece.classList.add('selected');
        }
    }
}

function resetGame() {
    boardState = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];
    turn = 'Putih';
    selectedPiece = null;
    statusElement.textContent = `Giliran: ${turn}`;
    createBoard();
}

function toggleTurn() {
    turn = turn === 'Putih' ? 'Hitam' : 'Putih';
    statusElement.textContent = `Giliran: ${turn}`;
}

let isPlaying = true;

function toggleMusic() {
    if (isPlaying) {
        musicPlayer.pause();
        musicBtn.textContent = 'Play Musik';
    } else {
        musicPlayer.play();
        musicBtn.textContent = 'Pause Musik';
    }
    isPlaying = !isPlaying;
}

resetBtn.addEventListener('click', resetGame);
toggleTurnBtn.addEventListener('click', toggleTurn);
musicBtn.addEventListener('click', toggleMusic);

createBoard();