let startButton = document.querySelector('.startBtn');
let infoBox = document.querySelector('.infoBox');
let exitBtn = document.querySelector('.exit-btn');
let continueBtn = document.querySelector('.continue-btn');
let quizBox = document.querySelector('.quiz-box');
let questionText = document.querySelector('.quetionText');
let allOptions = document.querySelectorAll('.options');
let nextBtn = document.querySelector('.nextBtn');
let timeline = document.querySelector('.time-line');
let currrentQuestionIndicator = document.querySelector('.currrentQuestionIndicator');
let progressBar = document.querySelector('.progressBar');
let timeLineTitle = document.querySelector('.time-line-title');
let replayQuiz = document.querySelector('.replay-quiz');
let quitQuiz = document.querySelector('.quit-quiz');
let resultBox = document.querySelector('.resultBox');
let scoreText = document.querySelector('.scoreText');


let currentQuestionIndex = 0;
let timeLineInterval = null;
let progressBarInterval = null;
let userScore = 0;

const TickIcon = `<div class="icon tick"><i class="fa-solid fa-check"></i></div>`;
const CrossIcon = `<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>`;

startButton.addEventListener('click', () => {
  infoBox.classList.add('activeInfoBox');
});

exitBtn.addEventListener('click', () => {
  infoBox.classList.remove('activeInfoBox');
});

nextBtn.addEventListener('click', () => {
  if (currentQuestionIndex < 9){
  currentQuestionIndex = currentQuestionIndex + 1;
  // reset timer and progress bar
  handleTimmer(15);
  handleProgressBar();
  showQuestion(currentQuestionIndex)
  nextBtn.classList.remove('active');
  timeLineTitle.innerText = 'Time Left';
  }
  else{
    clearInterval(timeLineInterval);
    clearInterval(progressBarInterval);
    quizBox.classList.remove('activeQuizBox');
    resultBox.classList.add('activeResultBox');
    handleShowResults();
  }
});

quitQuiz.addEventListener('click', () => {
  resultBox.classList.remove('activeResultBox');
  replayQuiz();
});

replayQuiz.addEventListener('click', () => {
  restartQuiz();
  resultBox.classList.remove('activeResultBox');
  quizBox.classList.add('activeQuizBox');
  showQuestion(currentQuestionIndex);
  handleTimmer(15);
  handleProgressBar();
  timeLineTitle.innerText = 'Time Left';
})

continueBtn.addEventListener('click', () => {
  infoBox.classList.remove('activeInfoBox');
  quizBox.classList.add('activeQuizBox');
  // here we can call a function to show the first question
  showQuestion(currentQuestionIndex);
  handleTimmer(15);
  handleProgressBar();
  timeLineTitle.innerText = 'Time Left';
})

// funtion  to render / show questions
const showQuestion = (index) => {
  questionText.innerText = '' + questions?.[index].numb + '. ' + questions?.[index].question;

  for (let i = 0; i < allOptions?.length; i++){
    allOptions[i].innerText = questions?.[index].options[i];
    allOptions[i].classList.remove('correct', 'wrong', 'disabled');
    if (index === 0){
      allOptions[i].addEventListener('click', optionsClickHandler)
    }
    
  }

  currrentQuestionIndicator.innerText = index + 1;
}

const handleTimmer = (time) => {
  clearInterval(timeLineInterval);
  timeline.innerText = time;
  let timeValue = time;
  timeLineInterval = setInterval(() => {
    timeValue--;
    if (timeValue < 10){
      timeline.innerText = '0' + timeValue;
    }
    else{
      timeline.innerText = timeValue;
    }
    
    if (timeValue === 0){
      timeLineTitle.innerText = 'Time Off'; 
      clearInterval(timeLineInterval);
      const correctAnswer = questions[currentQuestionIndex].answer;
      for (let i = 0; i < allOptions?.length; i++){
        allOptions[i].classList.add('disabled');
        
        if(allOptions[i].innerText === correctAnswer){
          allOptions[i].classList.add('correct');
          allOptions[i].insertAdjacentHTML('beforeend', TickIcon);
        }
      }
      nextBtn.classList.add('active');
    }
  }, 1000)
}

const handleProgressBar = () => {
  clearInterval(progressBarInterval);
  progressBar.style.width = '0%';
  let currentPercent = 0;
  progressBarInterval = setInterval(() => {
    currentPercent += 1/15;
    progressBar.style.width = currentPercent + '%';

    if (currentPercent >= 100){
      clearInterval(progressBarInterval);
    }
  }, 10)  
}



const optionsClickHandler = (e) => {
  clearInterval(timeLineInterval);
  clearInterval(progressBarInterval);
  nextBtn.classList.add('active');
  const userAnswer = e.target.innerText;
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (userAnswer === correctAnswer){
    userScore++;
    e.target.classList.add('correct');
    e.target.insertAdjacentHTML('beforeend', TickIcon);
  }
  else{
    // wrong answer
    e.target.classList.add('wrong');
    e.target.insertAdjacentHTML('beforeend', CrossIcon);
  }

  for (let i = 0; i < allOptions?.length; i++){
        allOptions[i].classList.add('disabled');
        
        if(userAnswer !== correctAnswer && allOptions[i].innerText === correctAnswer){
          allOptions[i].classList.add('correct');
          allOptions[i].insertAdjacentHTML('beforeend', TickIcon);
        }
      }
}

const restartQuiz = () => {
  clearInterval(timeLineInterval);
  clearInterval(progressBarInterval);
  userScore = 0;
  currentQuestionIndex = 0;
  timeLineTitle.innerText = 'Time Left';

}

const handleShowResults = () => {
  scoreText.innerHTML = `<span>and nice, You got <p>${userScore}</p>out of <p>${questions.length}</p></span>`
  
}