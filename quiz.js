
const questions = [
    {
        question: "which is the largest animal in the world?",
        answers: [
            { text: "shark", correct: false },
            { text: "Bluewhale", correct: true },
            { text: "Elephant", correct: false },
            { text: "camel", correct: false }
        ]
    },
    {
        question: "which is the national animal of india?",
        answers: [
            { text: "Dog", correct: false },
            { text: "Tiger", correct: true },
            { text: "Elephant", correct: false },
            { text: "camel", correct: false }
        ]
    },
    {
        question: "which is the largest bird?",
        answers: [
            { text: "Peacock", correct: false },
            { text: "emu", correct: false },
            { text: "Ostrich", correct: true },
            { text: "pigeon", correct: false }
        ]
    },
    {
        question: "What is the capital of india?",
        answers: [
            { text: "Delhi", correct: true },
            { text: "Mumbai", correct: false },
            { text: "Kolkata", correct: false },
            { text: "Madhya Pradesh", correct: false }
        ]
    }
]

const questionElement = document.getElementById("question")
const answerbuttons = document.getElementById("button")
const nextbutton = document.getElementById("btn-2")

let CurrentQuestionIndex = 0;
let score = 0;

function StartQuiz() {
    CurrentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next"
    showQuestion()
}

function showQuestion() {

    resetState()

    let currentquestion = questions[CurrentQuestionIndex];
    let questionNo = CurrentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentquestion.question

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerbuttons.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswers)
    })
}

function resetState() {
    nextbutton.style.display = "none";
    while (answerbuttons.firstChild) {
        answerbuttons.removeChild(answerbuttons.firstChild)
    }
}

function selectAnswers(e) {
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if (iscorrect) {
        selectedbtn.classList.add("correct")
        score++;
    } else {
        selectedbtn.classList.add("incorrect")
    }

    Array.from(answerbuttons.children).forEach(button => {
        if (button.dataset.correct === "true") {
      button.classList.add("correct")
        }
        button.disabled = true
    })
    nextbutton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
}

function NextButtton(){
    CurrentQuestionIndex++
    if(CurrentQuestionIndex<questions.length){
        showQuestion()
    }else{
        showScore()
    }
}

nextbutton.addEventListener('click' , ()=>{
    if(CurrentQuestionIndex<questions.length){
     NextButtton()
    }else{
        StartQuiz()
    }
})

StartQuiz()