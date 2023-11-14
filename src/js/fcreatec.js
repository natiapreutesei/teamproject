/*FUNCTION THAT READS THE NUMBER OF INPUTS GIVEN AND GENERATES THAT MANY CARDS*/
function generateCountries() {
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

    for (let i = 0; i < number; i++) {
        let randomIndex = Math.floor(Math.random() * countries.length);
        let country = countries[randomIndex];

        let card = document.createElement("div");
        card.className = 'col';

        let cardInner = document.createElement("div");
        cardInner.className = 'card';

        let cardImage = document.createElement("img");
        cardImage.src = country.flags.png;
        cardImage.className = 'card-img-top';
        cardImage.alt = 'Flag of ' + country.name.common;

        let cardBody = document.createElement("div");
        cardBody.className = 'card-body';

        let cardInput = document.createElement("input");
        cardInput.className = 'card-title';

        cardBody.appendChild(cardInput);
        cardInner.appendChild(cardImage);
        cardInner.appendChild(cardBody);
        card.appendChild(cardInner);
        resultContainer.appendChild(card);
    }
}

document.getElementById("result").addEventListener("submit", (e) => {
    e.preventDefault();
    generateCountries();
});
