const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
    {
        question : "Commonly used data types DO NOT INCLUDE:",
        choiceA : "strings",
        choiceB : "booleans",
        choiceC : "alerts",
        choiceD : "numbers",
        correct : "C"
    },
  
    {
        question : "The condition in an if / else statement is enclosed within ______.",
        choiceA : "quotes",
        choiceB : "curly brackets",
        choiceC : "square brackets",
        choiceD : "parentheses",
        correct : "D"
    },
    
    {
        question : "What does JS stand for:",
        choiceA : "johnsmith",
        choiceB : "javascript",
        choiceC : "javastrand",
        choiceD : "journeyscript",
        correct : "B"
    },

    {
        question : "Which company developed JavaScript:",
        choiceA : "Microsoft",
        choiceB : "Amazon",
        choiceC : "Oracle",
        choiceD : "Netscape",
        correct : "D"
      },

      {
        question : "Which symbol is used for comments in Javascript:",
        choiceA : "//",
        choiceB : "--",
        choiceC : "!",
        choiceD : "*",
        correct : "A"
      }


];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15;
const gaugeWidth = 100;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
   }

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}


function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
    
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender(){
    scoreDiv.style.display = "block";
    
    const scorePerCent = Math.round(100 * score/questions.length);
    
    let img = (scorePerCent >= 80) ? "face1.png" :
              (scorePerCent >= 60) ? "face2.png" :
              (scorePerCent >= 40) ? "face3.png" :
              (scorePerCent >= 20) ? "face4.png" :
              "face5.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
    // var x = document.getElementById("SaveL");  
    // if (x.style.display === "none") {
    //     x.style.display = "block";
    //   } else {
    //     x.style.display = "none";
    //   }
    storeLocal(scorePerCent);
};

function storeLocal(scorePerCent){
    var init = promptBox();
    if (init == null || init == "") {
    alert("You did not enter your initials and thus your score will not be saved");
    } else {
    localStorage.setItem(init, scorePerCent);
    }

};
function promptBox() {
    var txt;
    var person = prompt("Please enter your initials and you will get the results for your last question:", "");
    return person;
};
  