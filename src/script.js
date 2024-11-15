document.addEventListener("DOMContentLoaded", () => {
  const getStartedButton = document.getElementById("get-started");
  const backHomeButton = document.getElementById("back-home");
  const homepage = document.querySelector(".homepage");
  const gameContainer = document.querySelector(".game-container");

  getStartedButton.addEventListener("click", () => {
    homepage.style.display = "none";
    gameContainer.style.display = "flex";
  });

  backHomeButton.addEventListener("click", () => {
    gameContainer.style.display = "none";
    homepage.style.display = "flex";
  });

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
            } else {
              firstCard.classList.add("incorrect");
              secondCard.classList.add("incorrect");
            }
            firstCard.classList.add("inactive");
            secondCard.classList.add("inactive");
            selectedCards = [];
          }, 1000);
        }
      }
    });
  });
});
