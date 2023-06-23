// Define an array of words for the game
var words = [
    "Elephant",
    "Sunshine",
    "Butterfly",
    "Strawberry",
    "Adventure",
    "Computer",
    "Happiness"
];

var currentWordIndex = 0; // Tracks the index of the current word
var totalNum = words.length;
var wordAnswered = false; // Tracks if the current word has been answered correctly
var wordCount = 0;

// Function to initialize and display the current word
function initializeWord() {
    var word = words[currentWordIndex];

    // Scramble the letters of the word
    var scrambledWord = scrambleWord(word);


    // Display the scrambled word on the page
    var scrambledWordElement = document.getElementById("scrambledWord");
    scrambledWordElement.innerHTML = ""; // Clear previous content

    for (var i = 0; i < scrambledWord.length; i++) {
        var letterBox = document.createElement("div");
        letterBox.textContent = scrambledWord[i];
        letterBox.classList.add("box"); // Add a CSS class for styling
        scrambledWordElement.appendChild(letterBox);
    }

     // Clear the user's input and feedback message
     document.getElementById("userInput").value = "";
     document.getElementById("message").textContent = "";
 
    // Enable the "Next Word" button
    document.getElementById("nextWordButton").disabled = true;
    document.getElementById("nextWordButton").style.backgroundColor = "#888888";

    // Update word count
    document.getElementById("wordCount").textContent = wordCount + "/" + totalNum;

    wordAnswered = false;
}

// Function to scramble the letters of a word
function scrambleWord(word) {
    var letters = word.split("");
    for (var i = letters.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = letters[i];
        letters[i] = letters[j];
        letters[j] = temp;
    }
    return letters.join("");
}

// Function to check the user's answer
function checkAnswer() {
    var userInput = document.getElementById("userInput").value;
    var word = words[currentWordIndex];

    if (userInput.toLowerCase() === word.toLowerCase()) {
        document.getElementById("message").textContent = "Congratulations! You got it right!";
        wordAnswered = true;
        // Enable the "Next Word" button after the current word is answered correctly
        document.getElementById("nextWordButton").disabled = false;
        document.getElementById("nextWordButton").style.backgroundColor = "";
    } else {
        document.getElementById("message").textContent = "Oops! Try again.";
        wordAnswered = false;
        // Disable the "Next Word" button when the current word is not answered correctly
        document.getElementById("nextWordButton").disabled = true;
    }
}


// Function to show the next word
function showNextWord() {
    // Increment the current word index
    currentWordIndex++;
    wordCount++;

    // Check if we have reached the end of the word list
    if (currentWordIndex >= words.length) {
        currentWordIndex = 0; // Reset the index to start over
        wordCount = 0; // Reset the word count

        // Check if all words have been answered correctly
        var allWordsAnswered = words.every(function (word) {
            return wordAnsweredMap[word];
        });

        if (allWordsAnswered) {
            // Display the final message
            document.getElementById("message").textContent = "Congratulations! You answered all words correctly!";
            // Disable the "Next Word" button
            document.getElementById("nextWordButton").disabled = true;
            document.getElementById("nextWordButton").style.backgroundColor = "#888";
            return; // Stop execution
        }
    }

    // Initialize and display the new word
    initializeWord();
}

// Initialize and display the first word
window.addEventListener("DOMContentLoaded", initializeWord);
