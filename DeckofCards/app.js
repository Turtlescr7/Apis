let deckId = null;

// Initialize a new deck when the page loads
fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
  .then((response) => response.json())
  .then((data) => {
    deckId = data.deck_id;
    console.log("Deck ID:", deckId); // Log the deck ID for debugging
  })
  .catch((error) => console.error("Error:", error));

// Draw a card when the button is clicked
document.getElementById("draw-card").addEventListener("click", () => {
  if (!deckId) {
    alert("Deck is still loading. Please wait and try again.");
    return;
  }

  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then((response) => response.json())
    .then((data) => {
      if (data.remaining === 0) {
        alert("No more cards left in the deck!");
        return;
      }

      const card = data.cards[0];
      const cardContainer = document.getElementById("cards-container");

      // Create a new card element
      const cardElement = document.createElement("div");
      cardElement.className = "card";
      cardElement.innerHTML = `
        <p>${card.value} of ${card.suit}</p>
        <img src="${card.image}" alt="${card.value} of ${card.suit}">
      `;

      cardContainer.appendChild(cardElement);
    })
    .catch((error) => console.error("Error:", error));
});
