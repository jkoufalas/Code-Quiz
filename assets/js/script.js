var startScreen = document.querySelector("#start-screen");
var gameScreen = document.querySelector("#game-screen");
var gameEndScreen = document.querySelector("#game-end");
var HighScoreScreen = document.querySelector("#high-score-screen");
var startButton = document.querySelector("#start-button");
var questionList = document.querySelector("#multiple-choice-list");
var questionTitle = document.querySelector("#question-title");
var questionNumber = document.querySelector("#question-number");
var answerResult = document.querySelector("#answer-animation");
var timeLeft = document.querySelector("#timer");
var countdown = document.querySelector("#countdownVal");
var timerDisplay = document.querySelector("#countdown");
var initialsInput = document.querySelector("#initials");
var submitButton = document.querySelector("#submitButton");
var highScorePageList = document.querySelector("#highScoreList");
var goBackButton = document.querySelector("#go-back");
var clearHighScoreButton = document.querySelector("#clear-high-scores");
var highScoreLink = document.querySelector("#high-score");

var finalScore;
var question_number;
var currentQuestion;
var answer;
var index;
var secondsLeft;
var answerVisible = false;
var highScore = [];
var stopTimer = false;
var tenSecPenalty;
var completedQuestions;

//the list of questions, their options the the answer each as an array of objects
var questions = [
    {
        question: "What is the use of the <noscript> tag in Javascript?",
        A: "The contents are displayed by non-JS-based browsers",
        B: "Clears all the cookies and the cache",
        C: "Both A and B",
        D: "None",
        answer: "The contents are displayed by non-JS-based browsers"
    },
    {
        question: "How are objects compared when they are checked with the strict equality operator?        ",
        A: "The contents of the object are compared",
        B: "Their references are compared",
        C: "Both A and B",
        D: "None",
        answer: "Both A and B"
    },
    {
        question: "How to select the elements with the class name “example”?",
        A: "example",
        B: "#example",
        C: "Class example",
        D: ".example",
        answer: ".example"
    },
    {
        question: "Which of the following is the property that is triggered in response to JS errors?",
        A: "onclick",
        B: "onerror",
        C: "onmessage",
        D: "onexception",
        answer: "onerror"
    },
    {
        question: "Which of the following variables takes precedence over the others if the names are the same?",
        A: "Global variable",
        B: "The local element",
        C: "The two of the above",
        D: "None of the above",
        answer: "The local element"
    },
    {
        question: "Which of the following number object function returns the value of the number?",
        A: "toString()",
        B: "valueOf()",
        C: "toLocaleString()",
        D: "toPrecision()",
        answer: "valueOf()"
    },
    {
        question: "Which of the following function of the String object returns the character in the string starting at the specified position via the specified number of characters?",
        A: "slice()",
        B: "split()",
        C: "substr()",
        D: "search()",
        answer: "substr()"
    },
    {
        question: "Which one of the following is known as the Equality operator, which is used to check whether the two values are equal or not?",
        A: "=",
        B: "===",
        C: "==",
        D: "&&",
        answer: "=="
    },
    {
        question: "Javascript is an _______ language?",
        A: "Object-Oriented",
        B: "Object-Based",
        C: "Procedural",
        D: "None",
        answer: "Object-Oriented"
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        A: "getElementbyId()",
        B: "getElementByClassName()",
        C: "Both A and B",
        D: "None",
        answer: "Both A and B"
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        A: "document.write()",
        B: "console.log()",
        C: "window.alert()",
        D: "All the above",
        answer: "All the above"
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        A: "const",
        B: "var",
        C: "let",
        D: "constant",
        answer: "const"
    },
    {
        question: "What keyword is used to check whether a given property is valid or not?",
        A: "in",
        B: "is in",
        C: "exists",
        D: "lies",
        answer: "in"
    },
    {
        question: "Which function is used to serialize an object into a JSON string in Javascript?",
        A: "stringify()",
        B: "parse()",
        C: "convert()",
        D: "None",
        answer: "stringify()"
    },
    {
        question: "How to stop an interval timer in Javascript?",
        A: "clearInterval",
        B: "clearTimer",
        C: "intervalOver",
        D: "None",
        answer: "clearInterval"
    },
    {
        question: "How do we write a comment in javascript?",
        A: "/* */",
        B: "//",
        C: "#",
        D: "$ $",
        answer: "//"
    }
]; 

var question_list;

function init(){
    //only show the start div, make all the others invisible
    gameScreen.style.display = "none";
    gameEndScreen.style.display = "none";
    HighScoreScreen.style.display = "none";
    timerDisplay.style.display = "none";
    //parse high scores
    var highScoreList = JSON.parse(localStorage.getItem("highScore"));
    //initialise high score array
    highScore = [];
    //loop through high scores parsed from loacl storage
    for (var currentScore in highScoreList) {
        //create object from each parsed input
        var scoreElement = {
            score: highScoreList[currentScore].score,
            initials: highScoreList[currentScore].initials
        }
        //add that to the high score array
        highScore.push(scoreElement);
    }
}

//once the user has pressed start this method will start the game setting up what is required.
function startGame(){
    //initialises the variables needed each time the game is started
    question_number = 0;
    completedQuestions = 0;
    gameScreen.style.display = "block";
    startScreen.style.display = "none";
    timerDisplay.style.display = "block";
    //duplicates the questions array so that we can maintain a current list of questions
    //that haven't been used
    question_list = [...questions];
    secondsLeft = 90;

    //gets the first question from the array of questions
    getNewQuestion();

    //renders that question to the page
    renderQuestion();

    //starts timer
    setTime();

    //shows the initial time on the timer
    countdown.innerHTML = secondsLeft;
    //this flag sets is set so if the game is stopped or redirected to another screen
    //then it will stop the timer so that it wont continue
    stopTimer = false;
}

function getNewQuestion(){
    //increment the question number so that it can be dynamically printed
    question_number++;
    //randomly selects a question from the array and assigns it to the current question
    index = Math.floor(Math.random()*question_list.length);
    currentQuestion = question_list[index];
    //removes it from the list so that it can be chosen again
    question_list.splice(index,1);
}

function renderQuestion() {
    // Clear todoList element and update todoCountSpan
    questionList.innerHTML = "";

    //loops through every item in the current question
    for (var key in currentQuestion) {
        if (currentQuestion.hasOwnProperty(key)) {
            //if the attribute is the question then print it out
            if(key === "question"){
                questionNumber.textContent = question_number + "/ ";
                questionTitle.textContent = currentQuestion[key];
            //if the key is the answer attribute then set it as the answer
            }else if(key === 'answer'){
            answer = currentQuestion[key];
            //otherwise the key is an option
            }else{
            //create list item element
            var li = document.createElement("li");
            li.setAttribute("question-index", key);
            // create button
            var button = document.createElement("button");
            // populate the buttons text with the option
            button.textContent = key + ". " + currentQuestion[key];
            button.classList.add('buttonStyle');
            li.appendChild(button);
            //add button to list item
            questionList.appendChild(li);
            //add list item to ul
            }
        }
    }
  }

  function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      //these are the exit conditions for the timer 
      //1. if the timer finishes
      //2. if there are no more questions
      //3. if the user moved away from the game to another screen
      if(secondsLeft === 0 || questions.length === completedQuestions || stopTimer) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        //making sure that the end game screen is not run if the user has moved away
        if(!stopTimer){
            endGame();
        }
      }
      secondsLeft--;
      countdown.innerHTML = secondsLeft;
    }, 1000);
  }
  function setTimeForAnswer() {
    // this is a separate timer for the result that is shown when the user selects an option
    // this is done because it cannot be done when the user clicks the button because at that time we
    // are diplaying the result from being hidden. if we hide it at the same time then we will never see the answer
    // because it will hide and show at the same time, the timer will wait, then hide the answer
    var countANS = 0;
    var answerInterval = setInterval(function() {
        countANS++;
        if(countANS === 7 || stopTimer){
            if(answerVisible){
                //removes the appear class, but this seems to remove all classes so then i re add the animation class
                answerResult.classList.remove('appear');
                answerResult.classList.add('answer-animation');
                answerVisible = false;
              }
            clearInterval(answerInterval);
        }
    }, 100);
  }


  function endGame(){
    //displays the end game screen and hides the others
    gameScreen.style.display = "none";
    gameEndScreen.style.display = "block";
    timerDisplay.style.display = "none";
    //sets the timer to final time and sets the final score
    timeLeft.textContent = secondsLeft;
    finalScore = secondsLeft;    
}

//when the user submits the initals to record then do this function
function submitScore(event){
    //stops the default submit logic
    event.preventDefault();
    //creates the score object
    var scoreElement = {
        score: finalScore,
        initials: initialsInput.value.trim()
    }
    //if the user didn't submit any initials then do nothing until they do
    if(initialsInput.value === ""){
        return;
    }

    var index;
    var positionFound = false;
    //insert score in list and add it ordered by high score
    for(var i = 0; i < highScore.length; i++){
        //test to see if this beats the current score, if so then add here else it will loop to the next score
        // using greater than will add score to the bottom of the list of the same score, that  way earlier score are
        //higher
        if(scoreElement.score > highScore[i].score && !positionFound){
            index = i;
            positionFound = true;
        }
    }
    //if it beat any score add it before its index otherwise add it to the end.
    if(positionFound){
        highScore.splice(index, 0, scoreElement);
    }else{
        highScore.push(scoreElement);

    }  
    //once the high score array is set then push it to the local storage 
    localStorage.setItem("highScore", JSON.stringify(highScore));

    //move to the high score screen
    gameEndScreen.style.display = "none";
    HighScoreScreen.style.display = "block";

    //render the high score list
    createHighScoreList();

    //make sure that the clear button is on the same line as the back button
    clearHighScoreButton.style.display = "inline";
}

function goToHighScores(){
    //displays high score screen and hide the others
    startScreen.style.display = "none";
    gameScreen.style.display = "none";
    startScreen.style.display = "none";
    gameEndScreen.style.display = "none";
    timerDisplay.style.display = "none";
    HighScoreScreen.style.display = "block";
        
    //render the high score list
    createHighScoreList();
    stopTimer = true;
}

function createHighScoreList(){
    //resets the high score list
    highScorePageList.innerHTML = "";
    //if the high score list is empty then done show the clear button
    if(highScore.length == 0){
        clearHighScoreButton.style.display = "none";
    }
    //loop through all the high scores and render them
    for (var i = 0; i < highScore.length; i++) {        
        var li = document.createElement("li");
        var adjustedIndex = i+1;
        li.textContent = adjustedIndex+": " + highScore[i].initials.toUpperCase() + " - " + highScore[i].score;
        highScorePageList.appendChild(li);
    }

}
//when the users selects an option from the question
  questionList.addEventListener("click", function(event) {
    //sets the element to the event the user clicked
    var element = event.target;
    // Checks if element is a button
    if (element.matches("button") === true) {
        completedQuestions++;
      // Get its data-index value from the parent li item
        var index = element.parentElement.getAttribute("question-index");
        //if the option selected via the index is the same as the answer
        if(currentQuestion[index] === answer){
            //if so display correct and change color to green
            answerResult.textContent = "Correct";
            answerResult.style.color = "Green"
        }else{
            //if incorrect display wrong and change color to red
            answerResult.textContent = "Wrong";
            answerResult.style.color = "Red"
            //if wrong and the timer is less than 10 secs then end game
            if(secondsLeft < 10){
                secondsLeft = 0;
            }else{
                //otherwise decrease time by 10 as penalty
                secondsLeft = secondsLeft - 10;
            }
            //display new time
            countdown.innerHTML = secondsLeft;
        }
        //display result in div
        answerResult.classList.add('appear');
        //set timer so that result can dissapear, cannot do at once as hide will override show
        setTimeForAnswer();
        //sets the global variable to say that the answer is visible
        answerVisible = true;
        //if all the questions have been answered end game, otherwise get new question and render it
        if (questions.length === completedQuestions){
            endGame();
        }else{
            getNewQuestion();
            renderQuestion();
        }
    }
    
  });
function clearHighScore(){
    //clear high score from list, hide clear button, reset high score array and delete local storage of scores
  highScorePageList.innerHTML = "";
  clearHighScoreButton.style.display = "none";
  localStorage.removeItem("highScore");
  highScore = [];
}

//when back button is pressed at high score then re initialise
function goBack(){
    startScreen.style.display = "block";
    init();
  }



startButton.addEventListener("click",startGame);
submitButton.addEventListener("click", submitScore);
goBackButton.addEventListener("click", goBack);
clearHighScoreButton.addEventListener("click", clearHighScore);
highScoreLink.addEventListener("click", goToHighScores);



init();