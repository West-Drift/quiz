document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  let selectedCards = [];
  let matchedCards = [];

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (selectedCards.length < 2 && !card.classList.contains("matched")) {
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
              setTimeout(() => {
                firstCard.classList.remove("selected", "incorrect");
                secondCard.classList.remove("selected", "incorrect");
              }, 1000);
            }
            selectedCards = [];
          }, 1000);
        }
      }
    });
  });
});
