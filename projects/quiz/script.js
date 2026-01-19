const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const questionElement = document.getElementById('question');
const answersContainer = document.getElementById('answersContainer');
const currentQuestionElement = document.getElementById('currentQuestion');
const totalQuestionsElement = document.getElementById('totalQuestions');
const timerElement = document.getElementById('timer');
const currentScoreElement = document.getElementById('currentScore');
const progressFill = document.getElementById('progressFill');
const finalScoreElement = document.getElementById('finalScore');
const correctAnswersElement = document.getElementById('correctAnswers');
const wrongAnswersElement = document.getElementById('wrongAnswers');
const totalTimeElement = document.getElementById('totalTime');
const resultMessage = document.getElementById('resultMessage');

const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which CSS property is used to change text color?",
        answers: ["text-color", "font-color", "color", "text-style"],
        correct: 2
    },
    {
        question: "What is the correct JavaScript syntax to print 'Hello World'?",
        answers: [
            "print('Hello World')",
            "console.log('Hello World')",
            "echo('Hello World')",
            "printf('Hello World')"
        ],
        correct: 1
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        answers: ["<css>", "<script>", "<style>", "<link>"],
        correct: 2
    },
    {
        question: "What does CSS stand for?",
        answers: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 1
    },
    {
        question: "Which JavaScript method is used to access an HTML element by id?",
        answers: [
            "getElementById()",
            "getElement()",
            "getElementByClass()",
            "querySelector()"
        ],
        correct: 0
    },
    {
        question: "What is the correct HTML for creating a hyperlink?",
        answers: [
            "<a url='http://example.com'>",
            "<a href='http://example.com'>",
            "<link href='http://example.com'>",
            "<hyperlink>http://example.com</hyperlink>"
        ],
        correct: 1
    },
    {
        question: "Which property is used to change the background color in CSS?",
        answers: ["bgcolor", "background-color", "color-background", "bg-color"],
        correct: 1
    },
    {
        question: "What is the correct way to declare a JavaScript variable?",
        answers: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
        correct: 0
    },
    {
        question: "Which HTML attribute specifies an alternate text for an image?",
        answers: ["title", "src", "alt", "longdesc"],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
let correctCount = 0;
let wrongCount = 0;
let totalTimeTaken = 0;
let quizStartTime;

// Start Quiz
function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    currentQuestionIndex = 0;
    score = 0;
    correctCount = 0;
    wrongCount = 0;
    totalTimeTaken = 0;
    quizStartTime = Date.now();
    totalQuestionsElement.textContent = questions.length;
    showQuestion();
}

// Show Question
function showQuestion() {
    resetTimer();
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    currentQuestionElement.textContent = currentQuestionIndex + 1;
    currentScoreElement.textContent = score;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    
    // Clear previous answers
    answersContainer.innerHTML = '';
    
    // Display answers
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
    
    nextBtn.style.display = 'none';
    startTimer();
}

// Start Timer
function startTimer() {
    timeLeft = 15;
    timerElement.textContent = timeLeft;
    timerElement.parentElement.classList.remove('warning');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 5) {
            timerElement.parentElement.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

// Reset Timer
function resetTimer() {
    clearInterval(timerInterval);
    timerElement.parentElement.classList.remove('warning');
}

// Handle Timeout
function handleTimeout() {
    wrongCount++;
    const buttons = answersContainer.querySelectorAll('.answer-btn');
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === questions[currentQuestionIndex].correct) {
            btn.classList.add('correct');
        }
    });
    nextBtn.style.display = 'block';
}

// Select Answer
function selectAnswer(selectedIndex) {
    resetTimer();
    const question = questions[currentQuestionIndex];
    const buttons = answersContainer.querySelectorAll('.answer-btn');
    
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        }
        if (index === selectedIndex && selectedIndex !== question.correct) {
            btn.classList.add('wrong');
        }
    });
    
    if (selectedIndex === question.correct) {
        score += 10;
        correctCount++;
        currentScoreElement.textContent = score;
    } else {
        wrongCount++;
    }
    
    nextBtn.style.display = 'block';
}

// Next Question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Show Results
function showResults() {
    totalTimeTaken = Math.floor((Date.now() - quizStartTime) / 1000);
    
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    finalScoreElement.textContent = score;
    correctAnswersElement.textContent = correctCount;
    wrongAnswersElement.textContent = wrongCount;
    totalTimeElement.textContent = totalTimeTaken;
    
    // Set result message based on score
    let message = '';
    if (score >= 90) {
        message = '🎉 Outstanding! You\'re a quiz master!';
    } else if (score >= 70) {
        message = '👏 Great job! You did really well!';
    } else if (score >= 50) {
        message = '👍 Good effort! Keep practicing!';
    } else {
        message = '💪 Don\'t give up! Try again to improve!';
    }
    
    resultMessage.textContent = message;
}

// Restart Quiz
function restartQuiz() {
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
}

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
