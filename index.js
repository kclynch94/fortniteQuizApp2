let questionNumber = 0;
let score = 0;

// Hide home screen and display html on first question
function startQuiz () {
    $('main').on('click', '.startButton', function (event) {
      $('.initQuiz').css('display', 'none');
      $('.answers').css('display', 'block');
      $('.questionNumber').text(1);
  });
}

// Enter the html of the question into the answers container
function renderQuestion () {
    $('.answers').html(buildQuestion(STORE[questionNumber]));
}

// Create the html block for the question
function buildQuestion (question) {
    if (questionNumber < STORE.length) {
      const answers = question.answers.map(answer=>buildAnswers(answer)).join('');
      return `<div>
      <h2>${question.question}</h2>
      <form>
        <fieldset>
          ${answers}   
          <button type="submit" class="submitButton">Submit</button>
        </fieldset>
      </form>
      </div>`;
  } else {
      displayResults();
      handleRestart();
      $('.questionNumber').text(10)
    }
  }

// Create the html for the answers
function buildAnswers (answer) {
  return `<label class="option">
    <input type="radio" value="${answer}" name="answer" required>
    <span>${answer}</span>
    </label>`
}

// Displays total score and restart button at the end on the game
function displayResults () {
  $('.answers').html(`<div class="feedback"><p>You got ${score} / 10</p><button class="restartButton">Restart Quiz</button></div>`);
}


function handleRestart () {
  $('main').on('click', '.restartButton', function (event) {
    resetQuiz();
  });
}

// Shows home screen, reset question number and score, hides answers, prepares html for question 1
function resetQuiz () {
  $('.answers').css('display', 'none');
  $('.initQuiz').css('display', 'block');
  $('.questionNumber').text(0);
  $('.score').text(0);
  questionNumber = 0;
  score = 0;
  $('.answers').html(buildQuestion(STORE[questionNumber]));
}

// Increments score and displays new score to user
function updateScore () {
  score ++;
  $('.score').text(score);
}

// Retrieve user's selected asnwer and give feedback
function getAnswer () {
  $('main').on('submit', 'form', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    const isCorrect = answer === correctAnswer;
    handleAnswer(selected, isCorrect, correctAnswer);
  });
}

// Increments questionNumber and displays new questionNumber score to user
function changeQuestionNumber () {
  questionNumber ++;
  $('.questionNumber').text(questionNumber+1);
}

// Determines if answer is correct and what feedback to give accordingly
function handleAnswer(selected, isCorrect, correctAnswer) {
  const c = isCorrect ? 'correct' : 'wrong';
  selected.parent().addClass(c);
  if (isCorrect) {
    correctFeedback();
    updateScore();
    console.log('score');
  } else {
    incorrectFeedback(correctAnswer);
  }
}

// Progresses user to the next question
function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
  });
}
  
// Correct answer feedback
function correctFeedback () {
  $('.answers').html(`<div class="feedback"><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
}
  
// Incorrect answer feedback
function incorrectFeedback (correctAnswer) {
  $('.answers').html(`<div class="feedback"><div class="icon"><p><b>You got it wrong</b><br>The correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}
  
$(function runQuiz () {
  startQuiz();
  renderQuestion();
  getAnswer();
  renderNextQuestion();
})
  
