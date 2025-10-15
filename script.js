document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusMessage = document.querySelector('.status-message');
    const restartButton = document.querySelector('.restart-button');
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];

    // Function to handle a cell being played
    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        
        // Add class for styling
        clickedCell.classList.add(currentPlayer === 'X' ? 'x-color' : 'o-color');
    };

    // Function to handle the change of player
    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.innerHTML = `Player ${currentPlayer}'s Turn`;
    };

    // Function to announce the result (Win, Draw)
    const handleResultValidation = () => {
        let roundWon = false;
        
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusMessage.innerHTML = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }

        // Check for a Draw (if no empty cells remain)
        let roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusMessage.innerHTML = `Game Draw!`;
            gameActive = false;
            return;
        }

        // If no win or draw, continue the game
        handlePlayerChange();
    };

    // Main cell click handler
    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return; // Cell already played or game is over
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    };

    // Function to restart the game
    const handleRestartGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusMessage.innerHTML = `Player ${currentPlayer}'s Turn`;
        
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('x-color', 'o-color');
        });
    };

    // Attach event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
});
