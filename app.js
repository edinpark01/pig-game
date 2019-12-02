/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var roundScore, scores, inProgress, prevDice, maxScore;

init();

// Handles Roll Dice Button
document.querySelector('.btn-roll').addEventListener('click', function(){
    /*  In each turn, a player rolls a dice as many 
        times as he whishes. Each result get added 
        to his ROUND score */
    
    if( inProgress ) {
        var lostRound = false;

        var currentScoreDOM = document.getElementById('current-' + activePlayer);

        var dice0 = getRandomDice();
        var dice1 = getRandomDice();
        
        console.log('INFO\tDice 0 ->', dice0);
        console.log('INFO\tDice 1 ->', dice1);
        
        if (prevDice === 6 && prevDice === dice0){
            /*  A player looses his ENTIRE global score when he/she rolls 
                two 6s in a row. After that, it is the next player's round. */
            document.getElementById('score-'+activePlayer).textContent = 0
            lostRound = true;
        }
        else if (dice0 === 1 || dice1 === 1 ) {
            /*  If the player rolls a 1, all his ROUND score 
                gets lost. After that, it's the next player's turn */
            lostRound = true;
        }
        else { 
            /*  Sums current round score */
            img0 = 'images/dice-' + dice0 + '.png';
            img1 = 'images/dice-' + dice1 + '.png';
            
            handleDiceImage('block',  img0, img1);
            roundScore += dice0 + dice1; 
            prevDice = dice0
        }

        if ( lostRound ){
            roundScore = 0;
            switchPlayer();   
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
        maxScore = document.getElementById('max-score').value;
        scores[activePlayer] += roundScore;
        roundScore = 0;

        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        document.getElementById('current-' + activePlayer).textContent = roundScore;

        if ( scores[activePlayer] >= maxScore ) {
            /*  The first player to reach maxScore on GLOBAL 
                score wins the game */
            console.log('Found a winner ->', activePlayer);
            document.getElementById('name-' + activePlayer).textContent = 'WINNER ' + activePlayer;
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


/************************************************************
* UTILITY FUNCTIONS
*/
function init(){
    console.log('INFO\tInitializing Game');
    
    roundScore = 0;
    scores = [0,0];
    activePlayer = 0;
    inProgress = true;
    
    
    for(var player = 0; player < 2; player++){
        document.getElementById('score-' + player).textContent = 0;
        document.getElementById('current-' + player).textContent = 0;
        document.getElementById('name-' + player).textContent = 'Player ' + player;
    }

    maxScore = document.getElementById('max-score').value;
    
    handleDiceImage('none');
}

function getRandomDice(){
    var randomFloat = Math.random() * 5;
    return Math.round(randomFloat) + 1; 
}

function switchPlayer(){
    activePlayer = activePlayer === 0 ? 1 : 0;
    handleDiceImage('none');
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function handleDiceImage(action, srcZero='', srcOne=''){
    diceZeroDOM           = document.getElementById('dice-img-0');
    diceOneDOM            = document.getElementById('dice-img-1');
    
    diceZeroDOM.style.display = action;
    diceOneDOM.style.display = action;
    
    diceZeroDOM.src = srcZero;
    diceOneDOM.src = srcOne;
}