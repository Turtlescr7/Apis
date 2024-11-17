// Favorite number
const favoriteNumber = 7;

// Container to display the facts
const factsContainer = document.getElementById("facts-container");

// Fetch a single fact about the favorite number
fetch(`http://numbersapi.com/${favoriteNumber}?json`)
  .then((response) => response.json())
  .then((data) => {
    const factElement = document.createElement("p");
    factElement.textContent = `Single Fact: ${data.text}`;
    factsContainer.appendChild(factElement);
  })
  .catch((error) => console.error("Error fetching single fact:", error));

// Fetch multiple facts for a list of numbers
const numbersList = [7, 10, 20];
fetch(`http://numbersapi.com/${numbersList.join(",")}?json`)
  .then((response) => response.json())
  .then((data) => {
    const factsTitle = document.createElement("h3");
    factsTitle.textContent = "Facts for multiple numbers:";
    factsContainer.appendChild(factsTitle);

    for (let number in data) {
      const factElement = document.createElement("p");
      factElement.textContent = `Fact about ${number}: ${data[number]}`;
      factsContainer.appendChild(factElement);
    }
  })
  .catch((error) => console.error("Error fetching multiple facts:", error));

// Fetch 4 facts for the favorite number
const fetchMultipleFacts = async () => {
  const factsTitle = document.createElement("h3");
  factsTitle.textContent = "4 Facts about your favorite number:";
  factsContainer.appendChild(factsTitle);

  for (let i = 0; i < 4; i++) {
    try {
      const response = await fetch(
        `http://numbersapi.com/${favoriteNumber}?json`
      );
      const data = await response.json();
      const factElement = document.createElement("p");
      factElement.textContent = data.text;
      factsContainer.appendChild(factElement);
    } catch (error) {
      console.error("Error fetching fact:", error);
    }
  }
};

// Call the function to fetch 4 facts
fetchMultipleFacts();
