// Quiz Data
const questions = [
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Creative Style Sheets", correct: false },
            { text: "Computer Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to link a JavaScript file?",
        answers: [
            { text: "<script>", correct: true },
            { text: "<js>", correct: false },
            { text: "<javascript>", correct: false },
            { text: "<link>", correct: false }
        ]
    },
    {
        question: "What is the purpose of media queries in CSS?",
        answers: [
            { text: "To apply styles based on device characteristics", correct: true },
            { text: "To query a database", correct: false },
            { text: "To create animations", correct: false },
            { text: "To define variables", correct: false }
        ]
    }
];

// Quiz Variables
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultElement = document.getElementById('result');

let shuffledQuestions, currentQuestionIndex, score;

// Quiz Functions
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startQuiz() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    
    if (correct) {
        score++;
    }
    
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart Quiz';
        startButton.classList.remove('hide');
        showResult();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResult() {
    resultElement.classList.remove('hide');
    resultElement.innerHTML = `
        <h3>🎉 Quiz Completed! 🎉</h3>
        <p>Your score: <strong>${score}</strong> out of ${questions.length}</p>
        <p>${score === questions.length ? 'Perfect! 🏆' : score > questions.length/2 ? 'Good job! 👍' : 'Keep practicing! 💪'}</p>
    `;
}

// API Fetching
const fetchButton = document.getElementById('fetch-btn');
const apiDataElement = document.querySelector('.api-data .content');
const loader = document.querySelector('.loader');

fetchButton.addEventListener('click', fetchJoke);

async function fetchJoke() {
    try {
        loader.classList.remove('hide');
        apiDataElement.innerHTML = '';
        
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await response.json();
        
        loader.classList.add('hide');
        apiDataElement.innerHTML = `
            <p><strong>${data.setup}</strong></p>
            <p class="punchline">${data.punchline}</p>
        `;
        
        // Add punchline reveal animation
        const punchline = document.querySelector('.punchline');
        setTimeout(() => {
            punchline.style.opacity = '1';
            punchline.style.transform = 'translateY(0)';
        }, 500);
    } catch (error) {
        loader.classList.add('hide');
        apiDataElement.innerHTML = `<p>Failed to fetch joke. Please try again.</p>`;
        console.error("Error fetching joke:", error);
    }
}

// Image Carousel
const carouselImages = document.querySelectorAll('.carousel-img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;

// Create dots
carouselImages.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateCarousel() {
    carouselImages.forEach((img, index) => {
        img.classList.toggle('active', index === currentIndex);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    updateCarousel();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-rotate carousel
let carouselInterval = setInterval(nextSlide, 5000);

// Pause on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextSlide, 5000);
});