// script.js
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Jupiter", "Mars", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        answer: "William Shakespeare"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Silver", "Hydrogen"],
        answer: "Oxygen"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 10; // Time limit for each question in seconds

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const skipBtn = document.getElementById("skip-btn");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");

// Load the current question
function loadQuestion() {
    clearInterval(timer); // Clear previous timer
    timerEl.innerText = `Time remaining: ${timeLimit}s`; // Reset timer display

    const currentQuestion = questions[currentQuestionIndex];
    questionEl.innerHTML = currentQuestion.question;
    optionsEl.innerHTML = "";
    
    currentQuestion.options.forEach(option => {
        const optionBtn = document.createElement("button");
        optionBtn.className = "btn btn-outline-primary btn-block";
        optionBtn.innerText = option;
        optionBtn.onclick = () => selectAnswer(option, optionBtn);
        optionsEl.appendChild(optionBtn);
    });

    startTimer();
}

// Start the timer
function startTimer() {
    let timeLeft = timeLimit;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Time remaining: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(); // Automatically go to the next question if time runs out
        }
    }, 1000);
}

// Select answer and validate
function selectAnswer(selectedOption, optionBtn) {
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
        score++;
    }

    clearInterval(timer); // Stop the timer
    currentQuestionIndex++;
    setTimeout(nextQuestion, 1000); // Move to the next question after a delay
}

// Move to the next question or show result if done
function nextQuestion() {
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// Skip question functionality
skipBtn.onclick = () => {
    clearInterval(timer); // Stop the timer
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

// Show the final result with the score
function showResult() {
    quizContainer.style.display = "none";
    resultEl.innerHTML = `Your Score: ${score} / ${questions.length}`;
}

// Load the first question
loadQuestion();
