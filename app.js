/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var roundScore, scores, inProgress;

init();

// Handles Roll Dice Button
document.querySelector('.btn-roll').addEventListener('click', function(){
    /*  In each turn, a player rolls a dice as many 
        times as he whishes. Each result get added 
        to his ROUND score */
    
    if( inProgress ) {
        console.log('INFO\tClicked on Roll button');

        currentScoreDOM = document.getElementById('current-'+activePlayer);
        diceDOM = document.getElementById('dice-img');

        var dice = getRandomDice();
        console.log('INFO\tGot dice ->', dice);

        if (dice === 1 ) {
            /*  If the player rolls a 1, all his ROUND score 
                gets lost. After that, it's the next player's turn */
            roundScore = 0;
            switchPlayer();
        }
        else { 
            /*  Sums current round score */
            handleDiceImage('block', 'images/dice-' + dice + '.png');
            roundScore += dice; 
        }

        currentScoreDOM.textContent = roundScore;
        
    }
})

// Handles Hold Current Score Button
document.querySelector('.btn-hold').addEventListener('click', function(){
    /*  The player can choose to 'Hold', which means that 
        his ROUND score gets added to his GLOBAL score. 
        After that, it's the next player's turn*/
    if ( inProgress ){
        scores[activePlayer] += roundScore;
        roundScore = 0;

        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        document.getElementById('current-' + activePlayer).textContent = roundScore;

        if ( scores[activePlayer] >= 100 ) {
            /*  The first player to reach 100 points on GLOBAL 
                score wins the game */
            console.log('Found a winner ->', activePlayer);
            inProgress = false;
        }
        else{
            switchPlayer();    
        }
    }
})

// Handles New Game Button
document.querySelector('.btn-new').addEventListener('click', function(){
    init();
})

function init(){
    console.log('INFO\tInitializing Game');
    
    roundScore = 0;
    scores = [0,0];
    activePlayer = 0;
    inProgress = true;
    
    
    for(var player = 0; player < 2; player++){
        document.getElementById('score-' + player).textContent = 0;
        document.getElementById('current-' + player).textContent = 0;
    }
    
    handleDiceImage();
}

function getRandomDice(){
    var randomFloat = Math.random() * 5;
    return Math.round(randomFloat) + 1; 
}

function switchPlayer(){
    activePlayer = activePlayer === 0 ? 1 : 0;
    handleDiceImage();
}

function handleDiceImage(action='none', src='images/dice-1.png'){
    diceDOM               = document.getElementById('dice-img');
    diceDOM.style.display = action;
    diceDOM.src           = src;
}