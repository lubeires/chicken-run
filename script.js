const background = document.querySelector('.background')
const chicken = document.querySelector('.chicken')

var chickenPosition = 0;
var scorePoints = 0;
var isJumping = false;
var isGameOver = false;

function handleKeyUp(event) {
    if ((event.keyCode === 32 || event.keyCode === 38) && !isJumping) jump();
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (chickenPosition >= 220) {
            //down
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (chickenPosition <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    chickenPosition -= 18;
                    chicken.style.bottom = chickenPosition + 'px'
                }
            }, 18)
        } else {
            //up
            chickenPosition += 18;
            chicken.style.bottom = chickenPosition + 'px'
        }
    }, 18)
}


function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1300
    let randomTime = Math.random() * 5000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition+'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition <= -48) {
            //out of screen
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition >= 701 && cactusPosition <= 744 && chickenPosition <= 80) {
            //game over
            clearInterval(leftInterval);
            isGameOver = true;
            document.body.innerHTML =
                '<div class="game-over"><h1>GAME OVER</h1><h2 class="final-score">YOUR SCORE: ' + scorePoints + '</h2><a id="try-again" href="index.html">TRY AGAIN</a></div>'
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px'
        }

    }, 18)

    setTimeout(createCactus, randomTime);
}

function score() {
    const score = document.createElement('h2');
    score.classList.add('score');
    background.appendChild(score);

    setInterval(() => {
        if (!isGameOver) scorePoints++;
        score.innerHTML = scorePoints;
    }, 100)
}

createCactus()
score()
document.addEventListener('keyup', handleKeyUp)