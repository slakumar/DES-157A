(function () {
    'use strict';
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');

    // Audio elements
    const buttonClickSound = document.getElementById('button-click-sound');
    const gameMusic = document.getElementById('game-music');
    const winMusic = document.getElementById('win-music');

    // Rules overlay elements
    const rulesButton = document.getElementById('rules-button');
    const rulesOverlay = document.getElementById('rules-overlay');
    const closeOverlay = document.getElementById('close-overlay');

    // Quit button
    let quitButton;

    const gameData = {
        dice: ['images/Group_1.png', 'images/Group_2.png',
            'images/Group_3.png', 'images/Group_4.png',
            'images/Group_5.png', 'images/Group_6.png'],
        players: ['Brown', 'Pink'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 30 // Game ends when a player scores 30 points or more
    };

    // Event listener for starting the game
    startGame.addEventListener("click", function () {
        buttonClickSound.play(); // Play button click sound
        gameMusic.play();

        gameControl.innerHTML = '<h2>The game has started</h2>';
        gameControl.innerHTML += '<button id="quit">Wanna Quit?</button>';

        quitButton = document.getElementById('quit');

        // Add functionality to reload page when Quit is clicked
        quitButton.addEventListener("click", function () {
            location.reload();
        });

        setUpTurn();
    });

    // Event listener for showing rules
    rulesButton.addEventListener('click', function () {
        buttonClickSound.play(); // Play button click sound
        rulesOverlay.style.display = 'block'; // Show overlay
    });

    closeOverlay.addEventListener('click', function () {
        rulesOverlay.style.display = 'none'; // Hide overlay when "Close" is clicked
    });

    rulesOverlay.addEventListener('click', function (e) {
       if (e.target === rulesOverlay) { 
           rulesOverlay.style.display = 'none'; // Hide overlay when clicking outside content
       }
   });

   // Setup turn for current player
   function setUpTurn() {
    game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
       
       // Ensure dice area is cleared before adding new content
    //    actionArea.innerHTML = ''; 
       actionArea.innerHTML = '<button id="roll">Roll the dice</button>';
       document.getElementById('roll').addEventListener('click', throwDice);
   }

   function throwDice() {
    console.log('dice throw');
    //    actionArea.innerHTML = ''; 
       // Clear existing action content
       gameData.roll1 = Math.floor(Math.random() * 6) + 1;
       gameData.roll2 = Math.floor(Math.random() * 6) + 1;
       game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
       game.innerHTML += `<img src="${gameData.dice[gameData.roll1 - 1]}">
                          <img src="${gameData.dice[gameData.roll2 - 1]}">`;
       gameData.rollSum = gameData.roll1 + gameData.roll2;

       if (gameData.rollSum === 2) {
           game.innerHTML += '<p>Oh Snap! Snake Eyes!</p>';
           gameData.score[gameData.index] = 0; // Reset current player's score to zero
           switchPlayer();
           setTimeout(setUpTurn, 2000);
       } else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
           switchPlayer();
           setTimeout(setUpTurn, 2000);
           game.innerHTML += `<p>Sorry, one of your rolls was a one. Switching to ${gameData.players[gameData.index]}</p>`;
       } else {
           gameData.score[gameData.index] += gameData.rollSum; // Update score for current player
           checkWinningCondition(); // Check if the current player has won

           if (gameData.score[gameData.index] < gameData.gameEnd) {
               actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';
               document.getElementById('rollagain').addEventListener('click', throwDice);
               document.getElementById('pass').addEventListener('click', function () {
                   switchPlayer();
                   setUpTurn();
               });
           }
       }
   }

   function switchPlayer() {
       gameData.index = (gameData.index === 0) ? 1 : 0; // Toggle between players
   }

   function checkWinningCondition() {
       
       if (gameData.score[gameData.index] >= gameData.gameEnd) {
           score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;
           actionArea.innerHTML = '';

           // Stop current music and play win music
           gameMusic.pause();
           winMusic.play();

           // Change player image to GIF based on the winner and play sound
           if (gameData.players[gameData.index] === 'Brown') {
               const player1Image = document.getElementById('player1-img');
               player1Image.src = 'images/brown-candle.gif'; 
           } else if (gameData.players[gameData.index] === 'Pink') {
               const player2Image = document.getElementById('player2-img');
               player2Image.src = 'images/pink-candle.gif'; 
           }
   
           // Update Quit button to "Start a New Game?" and show it
           quitButton.textContent = "Start a New Game?";
           quitButton.style.display = 'block';
           quitButton.addEventListener('click', function () {
               location.reload(); // Reload page to reset the game
               winMusic.pause(); // Stop win music when starting a new game
           });
       } else {
           score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]}: ${gameData.score[0]}</strong> and <strong>${gameData.players[1]}: ${gameData.score[1]}</strong></p>`;
       }
   }
})();
