document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";
    const questionContainer = document.getElementById("question-container");
    const questionEl = document.getElementById("question");
    const optionsList = document.getElementById("options-list");
    const nextButton = document.getElementById("next-button");
    const scoreContainer = document.getElementById("score-container");
    const scoreEl = document.getElementById("score");
    const totalQuestionsEl = document.getElementById("total-questions");
    const restartButton = document.getElementById("restart-button");
  
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
  
    // Fetch questions from the API
    async function fetchQuestions() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        questions = data.results.map((q) => ({
          question: q.question,
          options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
          correctAnswer: q.correct_answer,
        }));
        startQuiz();
      } catch (error) {
        questionEl.textContent = "Failed to load questions. Please try again.";
        console.error("Error fetching questions:", error);
      }
    }
  
    // Start the quiz
    function startQuiz() {
      score = 0;
      currentQuestionIndex = 0;
      scoreContainer.classList.add("hidden");
      questionContainer.classList.remove("hidden");
      showQuestion();
    }
  
    // Show the current question
    function showQuestion() {
      const currentQuestion = questions[currentQuestionIndex];
      questionEl.innerHTML = currentQuestion.question;
      optionsList.innerHTML = "";
  
      currentQuestion.options.forEach((option, index) => {
        const optionEl = document.createElement("li");
        optionEl.innerHTML = `<button class="option-btn" data-index="${index}">${option}</button>`;
        optionsList.appendChild(optionEl);
      });
  
      const optionButtons = document.querySelectorAll(".option-btn");
      optionButtons.forEach((button) =>
        button.addEventListener("click", (event) => {
          handleAnswer(event.target.textContent);
        })
      );
      nextButton.disabled = true;
    }
  
    // Handle the user's answer
    function handleAnswer(selectedAnswer) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  
      if (isCorrect) {
        score++;
      }
  
      const optionButtons = document.querySelectorAll(".option-btn");
      optionButtons.forEach((button) => {
        if (button.textContent === currentQuestion.correctAnswer) {
          button.style.backgroundColor = "green";
        } else {
          button.style.backgroundColor = "red";
        }
        button.disabled = true;
      });
  
      nextButton.disabled = false;
    }
  
    // Move to the next question
    nextButton.addEventListener("click", () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        endQuiz();
      }
    });
  
    // End the quiz
    function endQuiz() {
      questionContainer.classList.add("hidden");
      scoreContainer.classList.remove("hidden");
      scoreEl.textContent = score;
      totalQuestionsEl.textContent = questions.length;
    }
  
    // Restart the quiz
    restartButton.addEventListener("click", () => {
      fetchQuestions();
    });
  
    // Fetch questions when the page loads
    fetchQuestions();
  });
  