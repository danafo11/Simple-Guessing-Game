// Ask the user to input his or her nickname
// Tell the user he or she only has 10 numbers to guess and 3 chances per section and he or she has 10 seconds to guess.
// Create a secret number and ask the user to guess with a timing of 10 seconds.
// If guessed correctly, give the user 2 points.
// If guessed wrongly, give the user two more chances and if guessed wrongly again, tell the user he or she is wrong, give the user 0 point and move to the next section.
// When the 10 sections of guessing is complete, add up all the points the user had and display it to the user and if the user got up to average, also display "Wow, you are good" along side with the score and if the user didn't get up to average, display "You should be nicknamed AJALEKOKO" with a laughing emoji along side with the score.
// And then log the user out, remember they are logging in only with nickname

let nickname;
let points = 0;
let currentSection = 1;
let attempts = 0;
let secretNumber;
let timerInterval;

function startGame() {
    nickname = document.getElementById('nickname').value;
    if (nickname === '') {
        alert('Please enter a nickname');
        return;
    }
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    startSection();
}

function startSection() {
    if (currentSection > 4) {
        endGame();
        return;
    }
    secretNumber = Math.floor(Math.random() * 10) + 1;
    attempts = 0;
    document.getElementById('section-info').textContent = `Section ${currentSection}: Guess the number (1-10)`;
    document.getElementById('message').textContent = '';
    document.getElementById('guess-input').value = '';
    startTimer();
}

function startTimer() {
    let timeLeft = 10;
    document.getElementById('time').textContent = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            processGuess(false, null);
        }
    }, 1000);
}

function submitGuess() {
    clearInterval(timerInterval);
    const guess = parseInt(document.getElementById('guess-input').value);
    if (isNaN(guess) || guess < 1 || guess > 10) {
        alert('Please enter a number between 1 and 10');
        startTimer();
        return;
    }
    processGuess(guess === secretNumber, guess);
}

function processGuess(isCorrect, guess) {
    if (isCorrect) {
        points += 2;
        document.getElementById('message').textContent = 'Correct! You earned 2 points.';
        setTimeout(nextSection, 4000);
    } else {
        attempts++;
        if (attempts < 3) {
            document.getElementById('message').textContent = `Wrong! You have ${3 - attempts} attempts left.`;
            startTimer();
        } else {
            document.getElementById('message').textContent = `Wrong! The correct number was ${secretNumber}. No points for this section.`;
            setTimeout(nextSection, 4000);
        }
    }
}

function nextSection() {
    currentSection++;
    startSection();
}

function endGame() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    const average = 10;
    document.getElementById('final-score').textContent = `Your final score is: ${points}`;
    if (points >= average) {
        document.getElementById('final-score').textContent += '\nWow, you are good!';
    } else {
        document.getElementById('final-score').textContent += '\nYou should be nicknamed AJALEKOKO 😂';
    }
}

function restartGame() {
    points = 0;
    currentSection = 1;
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
}

