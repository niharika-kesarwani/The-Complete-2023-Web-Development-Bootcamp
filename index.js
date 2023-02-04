// Detecting Button Press

var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfDrumButtons; i++) {
    document.querySelectorAll("button")[i].addEventListener('click', function () {

        var buttonInnerHTML = this.innerHTML;

        makeSound(buttonInnerHTML);

        buttonAnimation(buttonInnerHTML);

    });

}

// Detecting Keyboard Press

document.addEventListener("keydown", function (event) {

    makeSound(event.key);

    buttonAnimation(event.key);

})

function makeSound(key) {

    switch (key) {
        case "w":
        case "W":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;

        case "a":
        case "A":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;

        case "s":
        case "S":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;

        case "d":
        case "D":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;

        case "j":
        case "J":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;

        case "k":
        case "K":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;

        case "l":
        case "L":
            var kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
            break;

        default:
            console.log(buttonInnerHTML);
            break;
    }
}

function buttonAnimation (currentKey) {

    var activeButton = document.querySelector("." + currentKey);

    activeButton.classList.add("pressed");

    setTimeout(function () {
        activeButton.classList.remove("pressed");
    }, 100);
}