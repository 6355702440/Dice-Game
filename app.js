/* Game Rules
1.) The Game has 2 players, played in rounds
2.) In each run a player rolls a dice as many times he wishes. Each result get added to ROUND scores.
3.) But if the player rolls a 1, all his ROUND scores gets lost. After that it's the next player's turn.
4.) The player can choose to hold, which means that his round scores gets added to his GLOBAL score.
 After that it's the next player's turn .
5.)The first player to reach 100 points GLOBAL score wins the game.*/


// EXTRA
// 1.)A player his entire content when he playes to Six.After that its next player;s turn.

var scores,roundscore,activePlayer,dice,gamePlaying,lastdice;

init();

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).textContent = roundScore;

document.querySelector('.btn-roll').addEventListener('click',function() {
    if(gamePlaying)
    {
        // 1.Random number
        dice =  Math.floor(Math.random() * 6) + 1;

        // 2.Display the Result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
   

        // 3.Update the Round score if the rolled score was not 1
        if(dice === 6 && lastdice ===6){
            scores[activePlayer] = 0;
            document.querySelector('#scores-'+activePlayer).textContent = 0;
            nextPlayer();

        }

        else if(dice !==1 ){
            roundscore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundscore;
        }
        
        else{
            //NEXT PLAYER
            nextPlayer();
        }
        lastdice = dice ; 
    }
    
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying)
    {
         // 1).ADD CURERNT SCORE TO GLOBAL SCORE
        scores[activePlayer] += roundscore;

        //2).UPDATE THE UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
    
        // 3.)CHECK IF PLAYER WON THE GAME
        if(scores[activePlayer] >= 10)
        {
            document.querySelector('#name-'+activePlayer).textContent = 'WINNER';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.section-'+activePlayer).classList.add('winner');
            document.querySelector('.section-'+activePlayer).classList.remove('active')
            gamePlaying = false
        }
        else{
            //next player
            nextPlayer();
        }
    }
   

});

document.querySelector('.btn-new').addEventListener('click',init);
function init(){
    gamePlaying = true;
    scores = [0,0];
    roundscore = 0;
    activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'PLAYER1';
    document.getElementById('name-1').textContent = 'PLAYER2';
    document.querySelector('.section-0').classList.remove('winner');
    document.querySelector('.section-1').classList.remove('winner');
    document.querySelector('.section-0').classList.remove('active');
    document.querySelector('.section-1').classList.remove('active');
    document.querySelector('.section-0').classList.add('active');
}

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundscore = 0;

    document.querySelector('#current-0' ).textContent = '0';
    document.querySelector('#current-1' ).textContent = '0';

    document.querySelector('.section-0').classList.toggle('active');
    document.querySelector('.section-1').classList.toggle('active');

    // document.querySelector('.section-0').classList.remove('active');
    // document.querySelector('.section-1').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}


