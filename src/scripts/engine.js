const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#live"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        livesCount: 3,
        
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.lives.textContent = state.values.livesCount;
    
    if (state.values.curretTime <= 0) { 
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId); 
        alert("Jogo Terminou! O seu resultado foi: " + state.values.result);
        playSound("game-over");
    }
}
function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

let randomNumber = Math.floor(Math.random()*16);
let randomSquare = state.view.squares[randomNumber];
randomSquare.classList.add("enemy");
state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
           if(square.id === state.values.hitPosition) {
            state.values.result++ ;
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            playSound("hit");
           }
        })
    });
}

function initialize() {
    addListenerHitBox();
}

initialize();