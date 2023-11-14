/*FUNCTION THAT READS THE NUMBER OF INPUTS GIVEN AND GENERATES THAT MANY CARDS*/
function generateCountries() {
    scorecounter = 0; // Reset de score
    updateScoreboard(); // Update het scoreboard
    let number = parseInt(document.getElementById("countryCount").value);

    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            displayCountries(data, number);
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
}


function displayCountries(countries, number) {
    let resultContainer = document.getElementById("result");
    resultContainer.innerHTML = "";
    let currentCountries = [];

    for (let i = 0; i < number; i++) {
        let randomIndex = Math.floor(Math.random() * countries.length);
        let country = countries[randomIndex];
        currentCountries.push(country);

        let card = document.createElement("div");
        card.className = 'col';
        card.id = 'countryCard_' + i;

        let cardInner = document.createElement("div");
        cardInner.style.width = "350px";
        cardInner.className = 'card m-4';

        let cardImage = document.createElement("img");
        cardImage.src = country.flags.png;
        cardImage.style.height = "130px";
        cardImage.style.width = "100%";
        cardImage.className = 'card-img-top';
        cardImage.alt = 'Flag of ' + country.name.common;

        let cardBody = document.createElement("div");
        cardBody.className = 'card-body d-flex justify-content-between';

        let cardTitle =  document.createElement("h5");
        cardTitle.className = "my-auto";
        cardTitle.textContent = `Guess:`;

        let cardInput = document.createElement("input");
        cardInput.className = '';

        let cardButton = document.createElement("button");
        cardButton.className = 'btn btn-success';
        cardButton.textContent = 'Check!';

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardInput);
        cardInner.appendChild(cardImage);
        cardInner.appendChild(cardBody);
        card.appendChild(cardInner);
        cardBody.appendChild(cardButton);
        resultContainer.appendChild(card);

        let feedback = document.createElement("div");
        feedback.id = `feedback-${i}`;
        feedback.className = 'ms-2 my-auto';
        cardBody.appendChild(feedback);
        cardButton.addEventListener('click', function() {
            verifyAnswer(i, country.name.common, cardInput.value, feedback);
        });
        resultContainer.appendChild(card);
    }


}

document.getElementById("result").addEventListener("submit", (e) => {
    e.preventDefault();
    generateCountries();
});

let scorecounter = 0; // Globale score variabele

function verifyAnswer(index, correctName, userInput, feedbackElement) {
    if (userInput.toLowerCase() === correctName.toLowerCase()) {
        feedbackElement.textContent = "JUIST";
        feedbackElement.style.color = "green";
        scorecounter++; // Verhoog de score
        updateScoreboard(); // Update het scoreboard
    } else {
        feedbackElement.textContent = "FOUT";
        feedbackElement.style.color = "red";
    }
}

function updateScoreboard() {
    const scoreDisplay = document.getElementById("score");
    scoreDisplay.textContent = scorecounter;
}
