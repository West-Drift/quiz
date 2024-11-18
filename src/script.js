document.addEventListener("DOMContentLoaded", () => {
  const getStartedButton = document.getElementById("get-started");
  const navQuiz = document.getElementById("nav-quiz");
  const navHome = document.getElementById("nav-home");
  const nextButton1 = document.getElementById("next-1");
  const nextButton2 = document.getElementById("next-2");
  const finishButton = document.getElementById("finish");
  const tryAgainButton = document.getElementById("try-again");
  const goHomeButton = document.getElementById("go-home");
  const homepage = document.querySelector(".homepage");
  const quizContainer = document.querySelector(".quiz-container");
  const page1 = document.getElementById("page-1");
  const page2 = document.getElementById("page-2");
  const gameContainer = document.querySelector(".game-container");
  const scoreboard = document.querySelector(".scoreboard");
  const scorePercentage = document.getElementById("score-percentage");
  const scoreDisplay = document.getElementById("score");
  const scoreCircle = document.querySelector(".score-circle");

  let score = 0;
  const totalQuestions = 9;

  function startQuiz() {
    homepage.style.display = "none";
    quizContainer.style.display = "block";
    page1.style.display = "block";
    shuffleOptions();
  }

  function goHome() {
    location.reload();
  }

  getStartedButton.addEventListener("click", startQuiz);
  navQuiz.addEventListener("click", startQuiz);
  goHomeButton.addEventListener("click", goHome);
  navHome.addEventListener("click", goHome);

  nextButton1.addEventListener("click", () => {
    page1.style.display = "none";
    page2.style.display = "block";
    shuffleOptions();
  });

  nextButton2.addEventListener("click", () => {
    page2.style.display = "none";
    gameContainer.style.display = "flex";
    shuffleColumns(); // Shuffle columns when the game starts
  });

  finishButton.addEventListener("click", () => {
    gameContainer.style.display = "none";
    scoreboard.style.display = "flex";
    const percentage = Math.round((score / totalQuestions) * 100);
    scorePercentage.textContent = `${percentage}%`;
    scoreDisplay.textContent = score;
    updateScoreCircleColor(percentage);
  });

  tryAgainButton.addEventListener("click", () => {
    location.reload();
  });

  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      if (option.dataset.correct === "true") {
        option.classList.add("correct");
        score++;
      } else {
        option.classList.add("incorrect");
      }
      option.parentElement.querySelectorAll(".option").forEach((btn) => {
        btn.disabled = true;
      });
      checkNextButton(option.closest(".quiz-page"));
    });
  });

  function checkNextButton(page) {
    const allAnswered = Array.from(page.querySelectorAll(".option")).every(
      (btn) => btn.disabled
    );
    if (allAnswered) {
      if (page.id === "page-1") {
        nextButton1.style.display = "block";
      } else if (page.id === "page-2") {
        nextButton2.style.display = "block";
      }
    }
  }

  function shuffleOptions() {
    const questions = document.querySelectorAll(".question");
    questions.forEach((question) => {
      const options = Array.from(question.querySelectorAll(".option"));
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      options.forEach((option) => question.appendChild(option));
    });
  }

  function shuffleColumn(column) {
    const cards = Array.from(column.querySelectorAll(".card"));
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    cards.forEach((card) => column.appendChild(card));
  }

  function shuffleColumns() {
    const columns = document.querySelectorAll(".column");
    columns.forEach((column) => shuffleColumn(column));
  }

  const cards = document.querySelectorAll(".card");
  let selectedCards = [];
  let matchedCards = [];

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const column = card.closest(".column").dataset.column;

      if (
        selectedCards.length < 2 &&
        !card.classList.contains("matched") &&
        !card.classList.contains("inactive")
      ) {
        if (
          selectedCards.length === 1 &&
          selectedCards[0].closest(".column").dataset.column === column
        ) {
          selectedCards[0].classList.remove("selected");
          selectedCards = [];
        }

        card.classList.add("selected");
        selectedCards.push(card);

        if (selectedCards.length === 2) {
          setTimeout(() => {
            const [firstCard, secondCard] = selectedCards;
            if (firstCard.dataset.id === secondCard.dataset.id) {
              firstCard.classList.add("matched");
              secondCard.classList.add("matched");
              matchedCards.push(firstCard, secondCard);
              firstCard.classList.add("correct");
              secondCard.classList.add("correct");
              score++;
            } else {
              firstCard.classList.add("incorrect");
              secondCard.classList.add("incorrect");
            }
            firstCard.classList.add("inactive");
            secondCard.classList.add("inactive");
            selectedCards = [];
            if (
              Array.from(cards).every((card) =>
                card.classList.contains("inactive")
              )
            ) {
              finishButton.style.display = "block";
            }
          }, 1000);
        }
      }
    });
  });

  function updateScoreCircleColor(percentage) {
    if (percentage <= 25) {
      scoreCircle.classList.add("red");
    } else if (percentage <= 50) {
      scoreCircle.classList.add("orange");
    } else if (percentage <= 75) {
      scoreCircle.classList.add("yellow");
    } else {
      scoreCircle.classList.add("green");
    }
  }
});
