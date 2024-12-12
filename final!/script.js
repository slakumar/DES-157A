(function () {
    'use strict';
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score1 = document.querySelector('#player1-score');
    const score2 = document.querySelector('#player2-score');
    const message = document.querySelector('.message');
    const diceArea = document.querySelector('#dice-area');

    // Audio elements
    const gameMusic = document.getElementById('game-music');
    const winMusic = document.getElementById('win-music');

    // Rules overlay elements
    const rulesButton = document.getElementById('rules-button');
    const rulesOverlay = document.getElementById('rules-overlay');
    const closeOverlay = document.getElementById('close-overlay');

    // Quit button
    let quitButton;

    const gameData = {
        dice: ['images/Dice_1.png', 'images/Dice_2.png',
            'images/Dice_3.png', 'images/Dice_4.png',
            'images/Dice_5.png', 'images/Dice_6.png'],
        players: ['Brown', 'Pink'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 30
    };

    // Event listener for starting the game
    startGame.addEventListener("click", function () {
        gameMusic.play();

        // Hide only the start button
        startGame.style.display = 'none';

        // Create and append the quit button
        quitButton = document.createElement('button');
        quitButton.id = 'quit';
        quitButton.textContent = 'Quit';
        gameControl.appendChild(quitButton);

        // Add functionality to reload page when Quit is clicked
        quitButton.addEventListener("click", function () {
            location.reload();
        });

        setUpTurn();
    });

    // Event listeners for rules (unchanged)
    rulesButton.addEventListener('click', function () {
        rulesOverlay.style.display = 'block';
    });

    closeOverlay.addEventListener('click', function () {
        rulesOverlay.style.display = 'none';
    });

    rulesOverlay.addEventListener('click', function (e) {
        if (e.target === rulesOverlay) {
            rulesOverlay.style.display = 'none';
        }
    });

    // Function to set up a player's turn
    function setUpTurn() {
        message.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        
        // Clear the action area and add a new Roll Dice button
        game.innerHTML = '<button id="roll">Roll Dice</button>';
        
        // Attach event listener to the Roll Dice button
        document.getElementById('roll').addEventListener('click', throwDice);
    }

    // Function to handle dice rolls
    function throwDice() {
        console.log('Throwing dice...');
        
        // Generate random dice rolls
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        
        // Update the game area with dice images and results
        message.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        diceArea.innerHTML = `<img src="${gameData.dice[gameData.roll1 - 1]}" id= "dice1">
                           <img src="${gameData.dice[gameData.roll2 - 1]}" id="dice2">`;
        
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        if (gameData.rollSum === 2) { // Snake Eyes condition
            message.innerHTML = '<p>Oh Snap! Snake Eyes! Your score resets to zero.</p>';
            gameData.score[gameData.index] = 0; // Reset current player's score
            switchPlayer();
            setTimeout(setUpTurn, 2000); // Delay before switching turns
        } else if (gameData.roll1 === 1 || gameData.roll2 === 1) { // Roll contains a "1"
            switchPlayer();
            setTimeout(setUpTurn, 2000); // Delay before switching turns
            message.innerHTML = `<p>Sorry, you rolled a one! Switching to ${gameData.players[gameData.index]}.</p>`;
        } else { // Valid roll, add to score
            gameData.score[gameData.index] += gameData.rollSum;
            checkWinningCondition(); // Check if current player has won

            if (gameData.score[gameData.index] < gameData.gameEnd) {
                game.innerHTML = '<button id="rollagain">Roll Again</button> or <button id="pass">Pass</button>';
                // Event listeners for Roll Again and Pass buttons
                document.getElementById('rollagain').addEventListener('click', throwDice);
                document.getElementById('pass').addEventListener('click', function () {
                    switchPlayer();
                    setUpTurn();
                });
            }
        }
    }

    function switchPlayer() {
        // Toggle between players
        gameData.index = (gameData.index === 0) ? 1 : 0;
    }

    function checkWinningCondition() {
        if (gameData.score[gameData.index] >= gameData.gameEnd) { // Player wins
            message.innerHTML = `<h2>${gameData.players[gameData.index]} Wins With ${gameData.score[gameData.index]} Points!</h2>`;
            game.innerHTML = ''; // Clear action area

            // Stop current music and play win music
            gameMusic.pause();
            winMusic.play();

            if (gameData.players[gameData.index] === 'Brown') {
                const player1Image = document.getElementById('player1-img');
                player1Image.src = 'images/brown-candle.gif';
                player1Image.className = 'winner-gif';
            } else if (gameData.players[gameData.index] === 'Pink') {
                const player2Image = document.getElementById('player2-img');
                player2Image.src = 'images/pink-candle.gif';
                player2Image.className = 'winner-gif';
            }

            // Update Quit button to "Start New Game?"
            quitButton.textContent = "Start New Game?";
            
            quitButton.removeEventListener("click", location.reload); // Remove previous event listener
            
            quitButton.addEventListener('click', function () {
                location.reload(); // Reload page to reset the game
                winMusic.pause(); // Stop win music when starting a new game
            });
        } else { 
            score1.innerHTML = `${gameData.score[0]}`;
            score2.innerHTML = `${gameData.score[1]}`;
        }
    }
})();