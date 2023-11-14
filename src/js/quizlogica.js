// Importeer benodigde modules
import '../scss/styles.scss';
import * as bootstrap from 'bootstrap';

let currentCountries = []; // Houdt de huidige landen bij voor verificatie

export function loadCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            currentCountries = data; // Sla de opgehaalde landen op
            generateCountries(data);
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
}

export default function generateCountries(countries) {
    let number = parseInt(document.getElementById("countryCount").value);
    let card = document.getElementById("result");
    let answerSection = document.getElementById("answerSection");
    card.innerHTML = "";
    answerSection.innerHTML = "";

    for (let i = 0; i < number; i++) {
        let randomIndex = Math.floor(Math.random() * countries.length);
        let country = countries[randomIndex];

        // Voeg kaarten toe
        let divcard = document.createElement("div");
        divcard.className = 'col';
        let innerCard = document.createElement("div");
        innerCard.className = 'card';
        innerCard.innerHTML = `<img src="${country.flags.png}" class="card-img-top" alt="Flag of ${country.name.common}">` +
            `<div class="card-body"><h5 class="card-title">${country.name.common}</h5></div>`;
        divcard.appendChild(innerCard);
        card.appendChild(divcard);

        // Voeg antwoordvelden toe
        let inputField = document.createElement("input");
        inputField.type = "text";
        inputField.className = "form-control mt-2";
        inputField.id = `answer-${i}`;
        inputField.placeholder = "Voer de naam van het land in";
        answerSection.appendChild(inputField);
    }
}

export function verifyAnswers() {
    let correctCount = 0;
    for (let i = 0; i < currentCountries.length; i++) {
        let userInput = document.getElementById(`answer-${i}`).value;
        let countryName = currentCountries[i].name.common;
        if (userInput.toLowerCase() === countryName.toLowerCase()) {
            correctCount++;
            document.getElementById(`answer-${i}`).style.backgroundColor = "lightgreen";
        } else {
            document.getElementById(`answer-${i}`).style.backgroundColor = "salmon";
        }
    }
    // Update de score
    document.getElementById("score").innerText = correctCount;
}
