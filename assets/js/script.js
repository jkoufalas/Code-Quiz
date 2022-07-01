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


var questions = [
    {
        question: "The HTML attribute used to define the internal stylesheet is___________",
        A: "style",
        B: "<style>",
        C: "<link>",
        D: "<script>",
        E: "link",
        answer: "<style>"
    },
    {
        question: "Which of the following is the correct syntax to display the hyperlinks without any underline?",
        A: "a {decoration : no-underline;}",
        B: "a {text-decoration : underline;}",
        C: "a {text-decoration : none;}",
        D: "None",
        answer: "a {text-decoration : none;}"
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
        question: "CSS stands for _________",
        A: "Color and style sheets",
        B: "Cascading style sheet",
        C: "Cascade style sheets",
        D: "None",
        answer: "Cascading style sheet"
    },
    {
        question: "Which of the following is the correct syntax to select the p siblings of a div element?",
        A: "p",
        B: "div p",
        C: "div + p",
        D: "div ~ p",
        answer: "div ~ p"
    },
    {
        question: "The CSS property used to specify the transparency of an element is____________",
        A: "visibility",
        B: "filter",
        C: "opacity",
        D: "overlay",
        answer: "opacity"
    },
    {
        question: "Which of the following is not a type of combinator?",
        A: "~",
        B: ">",
        C: "+",
        D: "*",
        answer: "*"
    },
    {
        question: "Which of the following selector in CSS is used to select the elements that do not match the selectors?",
        A: ":not selector",
        B: ":empty selector",
        C: ":! selector",
        D: "None",
        answer: ":not selector"
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

function startGame(){
    question_number = 0;
    gameScreen.style.display = "block";
    startScreen.style.display = "none";
    timerDisplay.style.display = "block";
    question_list = [...questions];
    secondsLeft = 90;
    getNewQuestion();
    renderQuestion();
    setTime();
    countdown.innerHTML = secondsLeft;
    stopTimer = false;
}

function getNewQuestion(){
    question_number++;
    index = Math.floor(Math.random()*question_list.length);
    currentQuestion = question_list[index];
    question_list.splice(index,1);
}

function renderQuestion() {
    // Clear todoList element and update todoCountSpan
    questionList.innerHTML = "";

    for (var key in currentQuestion) {
        if (currentQuestion.hasOwnProperty(key)) {
            if(key === "question"){
                questionNumber.textContent = question_number + "/ ";
                questionTitle.textContent = currentQuestion[key];
            }else if(key === 'answer'){
            answer = currentQuestion[key];
            }else{
            var li = document.createElement("li");
            //li.textContent = key + "/ " + currentQuestion[key];
            li.setAttribute("question-index", key);
            var button = document.createElement("button");
            button.textContent = key + ". " + currentQuestion[key];
            button.classList.add('buttonStyle');
            li.appendChild(button);
            questionList.appendChild(li);
            }
        }
    }
    //answerResult.classList.remove('appear');

  }

  function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      
      if(secondsLeft === 0 || question_list.length === 0 || stopTimer) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        if(!stopTimer){
        // Calls function to create and append image
            endGame();
        }
      }
      secondsLeft--;
      countdown.innerHTML = secondsLeft;
    }, 1000);
  }
  function setTimeForAnswer() {
    // Sets interval in variable
    var countANS = 0;
    var answerInterval = setInterval(function() {
        countANS++;
        if(countANS === 7 || stopTimer){
            if(answerVisible){
                answerResult.classList.remove('appear');
                answerResult.classList.add('answer-animation');
                answerVisible = false;
              }
            clearInterval(answerInterval);
        }
    }, 100);
  }


  function endGame(){
    gameScreen.style.display = "none";
    gameEndScreen.style.display = "block";
    timerDisplay.style.display = "none";
    timeLeft.textContent = secondsLeft;
    finalScore = secondsLeft;    
}


function submitScore(event){
    event.preventDefault();
    var scoreElement = {
        score: finalScore,
        initials: initialsInput.value.trim()
    }
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
    localStorage.setItem("highScore", JSON.stringify(highScore));

    gameEndScreen.style.display = "none";
    HighScoreScreen.style.display = "block";

    createHighScoreList();

    clearHighScoreButton.style.display = "inline";
    //clearHighScoreButton.removeAttribute("style");
    console.log("Got Here")

}

function goToHighScores(){
    startScreen.style.display = "none";
    gameScreen.style.display = "none";
    startScreen.style.display = "none";
    gameEndScreen.style.display = "none";
    timerDisplay.style.display = "none";
    HighScoreScreen.style.display = "block";

    createHighScoreList();
    stopTimer = true;
}

function createHighScoreList(){
    highScorePageList.innerHTML = "";
    if(highScore.length == 0){
        clearHighScoreButton.style.display = "none";
        //clearHighScoreButton.style.visibility = "invisible";
    }
    for (var i = 0; i < highScore.length; i++) {        
        var li = document.createElement("li");
        var adjustedIndex = i+1;
        li.textContent = adjustedIndex+": " + highScore[i].initials.toUpperCase() + " - " + highScore[i].score;
        highScorePageList.appendChild(li);
    }

}

  questionList.addEventListener("click", function(event) {
    var element = event.target;
  
    // Checks if element is a button
    if (element.matches("button") === true) {
      // Get its data-index value and remove the todo element from the list
        var index = element.parentElement.getAttribute("question-index");
        if(currentQuestion[index] === answer){
            answerResult.textContent = "Correct";
            answerResult.style.color = "Green"
        }else{
            answerResult.textContent = "Wrong";
            answerResult.style.color = "Red"

            if(secondsLeft < 10){
                secondsLeft = 0;
            }else{
                secondsLeft = secondsLeft - 10;
            }
            countdown.innerHTML = secondsLeft;
        }
        answerResult.classList.add('appear');
        setTimeForAnswer();
        answerVisible = true;
        if (question_list.length > 0){
            getNewQuestion();
            renderQuestion();
        }else{
            endGame();
        }
    }
    
  });
function clearHighScore(){
  highScorePageList.innerHTML = "";
  clearHighScoreButton.style.display = "none";
  //clearHighScoreButton.style.visibility = "invisible";
  localStorage.removeItem("highScore");
  highScore = [];
}


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