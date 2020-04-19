var start = document.getElementById("start");

var quiz = document.getElementById("quizCon");

var question = document.getElementById("question");

var counter = document.getElementById("counter");

var timeBar = document.getElementById("timeBar");

var choiceA = document.getElementById("A");

var choiceB = document.getElementById("B");

var choiceC = document.getElementById("C");

var choiceD = document.getElementById("D");

var progress = document.getElementById("progress");

var scoreCon = document.getElementById("scoreCon");

var questions = [
    {
        question: "Which of these options are NOT a laguage make up of the Web?",
        choiceA: "HTML",
        choiceB: "CSS",
        choiceC: "MVP",
        choiceD: "JavaScript",
        correct: "C"
    },
    {
        question: "What is HTML?",
        choiceA: "HTML is the standard markup language for Web pages",
        choiceB: "HTML is a rock band",
        choiceC: "HTML is a bar",
        choiceD: "HTML allows you to implement complex features on a web",
        correct: "A"
    },
    {
        question: "How many SuperBowls has Tom Brady won?",
        choiceA: "10",
        choiceB: "6",
        choiceC: "5",
        choiceD: "3",
        correct: "B"
    },
];

var lastQuestionIndex = questions.length - 1;
var runningQuestionIndex = 0;

function renderQuestion() {
    var quest = questions[runningQuestionIndex];
    question.innerHTML = "<p>" + quest.question + "</p>";
    choiceA.innerHTML = quest.choiceA;
    choiceB.innerHTML = quest.choiceB;
    choiceC.innerHTML = quest.choiceC;
    choiceD.innerHTML = quest.choiceD;
}

start.style.display="none";
renderQuestion();
quiz.style.display="block";

function progressRender() {
    for (var qIndex = 0; qIndex <= lastQuestionIndex; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
};

function answerIsCorrect() {
    document.getElementById(runningQuestionIndex).style.backgroundColor = "green";
};

function answerIsWrong() {
    document.getElementById(runningQuestionIndex).style.backgroundColor = "red";
};

var questionTime = 0;
var timerWidth = 200;
var count = 0;
var timeBarUnit = timerWidth / questionTime;

function counterRender() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeBar.style, width = timeBarUnit * count + "px";
        count++;
    }
    else {
        count = 0;
        answerIsWrong();
        if (runningQuestionIndex < lastQuestionIndex) {
            runningQuestionIndex++;
            questionRender();
        }
        else {
            clearInterval(TIMER);
            scoreRender();
        }
    }

    var TIMER = setInterval(counterRender, 2000);
    clearInterval(TIMER);
};

function checkAnswer(answer) {
    if (question[runningQuestionIndex].correct == answer) {
        score++;
        answerIsCorrect();
    }
    else {
        answerIsWrong();
    }
    if (runningQuestionIndex < lastQuestionIndex) {
        count = 0;
        runningQuestionIndex++;
        questionRender();
    }
    else {
        clearInterval(TIMER);
        scoreRender();
    }
};

start.addEventListener("click", startQuiz);

var TIMER;

function startQuiz() {
    start.style.display = "none";
    counterRender();
    TIMER = setInterval(counterRender, 2000);
    progressRender();
    questionRender();
    quiz.style.display= "block";
};

function scoreRender(){
    scoreCon.style.display="block";
    var scorePer= Math.round(100 * score/questions.length);
}