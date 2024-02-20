document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    
    const X_CLASS = 'x';
    const O_CLASS = 'o';
    let currentPlayer = X_CLASS;
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(e) {
        const cell = e.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));

        if (gameBoard[cellIndex] !== '' || !gameActive) return;

        placeMark(cell, cellIndex);
        if (checkWin()) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
        }
    }

    function placeMark(cell, cellIndex) {
        gameBoard[cellIndex] = currentPlayer;
        cell.classList.add(currentPlayer);
    }

    function swapTurns() {
        currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
        status.innerText = `${currentPlayer}'s Turn`;
    }

    function checkWin() {
        return winningCombos.some(combo => {
            return combo.every(index => {
                return gameBoard[index] === currentPlayer;
            });
        });
    }

    function isDraw() {
        return gameBoard.every(cell => {
            return cell !== '';
        });
    }

    function endGame(draw) {
        if (draw) {
            status.innerText = 'It\'s a draw!';
        } else {
            status.innerText = `${currentPlayer} wins!`;
        }
        gameActive = false;
    }

    function resetBoard() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = X_CLASS;
        gameActive = true;
        status.innerText = `${currentPlayer}'s Turn`;
        board.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
        });
    }

    function startGame() {
        board.innerHTML = '';
        status.innerText = `${currentPlayer}'s Turn`;
        gameBoard.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.setAttribute('data-index', index);
            cellElement.addEventListener('click', handleClick);
            board.appendChild(cellElement);
        });
    }

    resetButton.addEventListener('click', resetBoard);
    startGame();
});
