let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newGameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

let winningPattern = [
    [0, 1, 2], [0, 3, 6], [2, 5, 8], [6, 7, 8],
    [3, 4, 5], [1, 4, 7], [0, 4, 8], [2, 4, 6]
];

let xTurn = true;
let count = 0;

// Disable all buttons
const disableButtons = () => {
    btnRef.forEach((element) => element.disabled = true);
    popupRef.classList.remove("hide");
};

// Enable buttons and reset game
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    popupRef.classList.add("hide");
};

// Show winning message
const winFunction = (letter) => {
    msgRef.innerText = `Player ${letter} Wins!`;
    disableButtons();
};

// Check for a win or draw
const winChecker = () => {
    for (let pattern of winningPattern) {
        let [a, b, c] = pattern;
        let element1 = btnRef[a].innerText;
        let element2 = btnRef[b].innerText;
        let element3 = btnRef[c].innerText;

        if (element1 !== "" && element1 === element2 && element2 === element3) {
            winFunction(element1);
            return;
        }
    }

    // Check for a draw
    if (count === 9) {
        msgRef.innerText = "It's a Draw!";
        disableButtons();
    }
};

// Add event listeners to buttons
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            element.innerText = "X";
            element.style.color = "#d161ff";
            xTurn = false;
        } else {
            element.innerText = "O";
            element.style.color = "#8052ec";
            xTurn = true;
        }
        element.disabled = true;
        count += 1;
        winChecker();
    });
});

// Restart and New Game functionality
newGameBtn.addEventListener("click", () => {
    count = 0;
    xTurn = true;
    enableButtons();
});

restartBtn.addEventListener("click", () => {
    count = 0;
    xTurn = true;
    enableButtons();
});
