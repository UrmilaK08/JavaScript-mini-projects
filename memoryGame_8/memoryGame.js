const move = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");

let cards;
let interval;
let firstCard = null;
let secondCard = null;
let seconds = 0,
    minutes = 0;
let movesCount = 0;
let winCount = 0;

const items = [
    { name: "bee", image: "bee.avif" },
    { name: "crocodile", image: "crocodile.jpg" },
    { name: "macaw", image: "macaw.jpg" },
    { name: "gorilla", image: "gorilla.jpg" },
    { name: "tiger", image: "tiger.webp" },
    { name: "monkey", image: "monkey.webp" },
    { name: "chameleon", image: "cham.avif" },
    { name: "piranha", image: "piranha.webp" },
    { name: "anaconda", image: "anaconda.webp" },
    { name: "sloth", image: "sloth.jpg" },
    { name: "cockatoo", image: "cockatoo.avif" },
    { name: "toucan", image: "toucan.png" },
];

const timeGenerator = () => {
    seconds++;
    if (seconds >= 60) {
        minutes++;
        seconds = 0;
    }
    let secondValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time:</span> ${minutesValue}:${secondValue}`;
};

const movesCounter = () => {
    movesCount++;
    move.innerHTML = `<span>Moves:</span> ${movesCount}`;
};

const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardValues = [];
    size = (size * size) / 2;
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
        gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
            <div class="card-before">?</div>
            <div class="card-after">
                <img src="${cardValues[i].image}" class="image" width="90" height="90"/>
            </div>
        </div>`;
    }
    gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("matched")) {
                card.classList.add("flipped");
                if (!firstCard) {
                    firstCard = card;
                } else {
                    movesCounter();
                    secondCard = card;
                    let firstCardValue = firstCard.getAttribute("data-card-value");
                    let secondCardValue = secondCard.getAttribute("data-card-value");

                    if (firstCardValue === secondCardValue) {
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        firstCard = null;
                        secondCard = null;
                        winCount++;
                        if (winCount === cardValues.length / 2) {
                            result.innerHTML = `<h2>You Won!</h2><h4>Moves: ${movesCount}</h4>`;
                            stopGame();
                        }
                    } else {
                        setTimeout(() => {
                            firstCard.classList.remove("flipped");
                            secondCard.classList.remove("flipped");
                            firstCard = null;
                            secondCard = null;
                        }, 800);
                    }
                }
            }
        });
    });
};

const startGame = () => {
    movesCount = 0;
    winCount = 0;
    seconds = 0;
    minutes = 0;
    move.innerHTML = `<span>Moves:</span> 0`;
    timeValue.innerHTML = `<span>Time:</span> 00:00`;
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    interval = setInterval(timeGenerator, 1000);
    let cardValues = generateRandom();
    matrixGenerator(cardValues);
};

const stopGame = () => {
    clearInterval(interval);
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
};

startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);
