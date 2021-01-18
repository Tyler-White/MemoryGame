// container of the entire game
const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// shuffles the color array to return random order of colors in the array 
let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// Flow (Not needed for code): 
// 1. Takes click event and sets the background color for the clicked div, adds color from the class name to array for compare, adds selected class name to div, and iterates the click count
// 2. checks if the user has checked twice:
// 2a. if yes compares the two, if matched keeps the colors flipped. resets click counter, clears check array, removes selected class. if not matched console logs what colors dont match. keep the cards flipped for 1 second. resets click counter, clears check array, removes selected class
// 2b. if no, iterates clickcounter and allows another click
// see enhancements at line 110

let clickCounter = 0; // checks number of tries user has taken
let checkColorArray = [] // creates the array that stores the two clicked guesses


function handleCardClick(event) {
  clickCounter++; // checks how many clicks the user has taken
  let clickedDiv = event.target; // gets the clicked DIV for editing
  let clickedColor = clickedDiv.className; // gets the color of the div from the className
  clickedDiv.style.backgroundColor = clickedColor; // updates div background to classname(color)
  clickedDiv.classList.add("selected"); // adds the "selected" class to the div for styling after if statement 
  checkColorArray.push(clickedColor); // adds the selected color to the array for comparison
  console.log(checkColorArray);
  console.log(clickedDiv);
  
  if (clickCounter === 2) { 
    if (checkColorArray[0] === checkColorArray[1]) { // compares the two values of the array
      console.log("Matchy matchy chicken dinney"); // logs that the user guessed right 
      checkColorArray = []; // clears the check array
      const clearDivCheck = document.querySelectorAll(".selected"); // selects the divs the user selected
      for (let resetCards of clearDivCheck) {
        resetCards.classList.remove("selected"); // loops through and removes the selected class
        // if no match > clear background color (create a boolean for if match) this would then deteremine if you clear the background. Reduce redundent code between if and else 
      }
    }
      else {
        console.log(`${checkColorArray[0]} and ${checkColorArray[1]} don't match`); // tells you what colors dont match
        setTimeout(function() { // sets a timeout so that the wrong selected colors stay up
          const clearDivCheck = document.querySelectorAll(".selected"); // sets the selected colors
          checkColorArray = []; // clears check array
          for (let resetCards of clearDivCheck) {
            resetCards.style.backgroundColor = "white"; // changes the background color to white
            resetCards.classList.remove("selected"); // removes selected class
          }
        }, 1000); // 1 second for timeout
      }
        clickCounter = 0; // resets the click counter
      }
  }

// when the DOM loads
createDivsForColors(shuffledColors);

// Enhancements:
// Remove click counter and array, store first click then compare with current click
// ex: 
// if(firstClick){
//    compare thisClick to firstClick
  
//   firstClick = null;
// } else {
//   firstClick = thisClick;
//    do first card stuff
// }
// Display click once two are active
// Add button to start game
// add button to restart once game is ended
// Increment score and display score
// Add endgame scenario, tell how many clicks it took 
// Store lowest-socring game in local, and present it at load
// Allow for any number of cards to appear?
// instead of hard-coding colors, try random colors or images
// Styling