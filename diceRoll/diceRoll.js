let images=["dice-1.png",
"dice-2.png",
"dice-3.png",
"dice-4.png",
"dice-5.png",
"dice-6.png"];
let dice = document.querySelectorAll("img");

function roll(){
    dice.forEach(function(die){
        die.classList.add("shake");
    });

    setTimeout(function(){
        dice.forEach(function(die){
            die.classList.remove("shake");
        });

        let dieOneValue = Math.floor(Math.random() * 6);
        let dieTwoValue = Math.floor(Math.random() * 6);
        
        console.log("Rolled values:", dieOneValue, dieTwoValue);
        console.log("Image paths:", images[dieOneValue], images[dieTwoValue]);

        document.querySelector("#die-1").setAttribute("src", images[dieOneValue]);
        document.querySelector("#die-2").setAttribute("src", images[dieTwoValue]);
    }, 1000);
}
