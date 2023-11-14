// Importeer benodigde modules
import '../scss/styles.scss';
import * as bootstrap from 'bootstrap';

// ... andere imports en code ...

export function loadCountries() {


// Functie om landen te genereren
export default function generateCountries(countries) {
    let number = parseInt(document.getElementById("countryCount").value);
    let card = document.getElementById("result");
    card.innerHTML = "";

    for (let i = 0; i < number; i++) {
        let randomIndex = Math.floor(Math.random() * countries.length);
        let country = countries[randomIndex];

        let divcard = document.createElement("div");
        divcard.className = 'col';

        let innerCard = document.createElement("div");
        innerCard.className = 'card';

        innerCard.innerHTML = `<img src="${country.flags.png}" class="card-img-top" alt="Flag of ${country.name.common}">` +
            `<div class="card-body"><h5 class="card-title">${country.name.common}</h5><p class="card-text">This is a card for ${country.name.common}.</p></div>`;

        divcard.appendChild(innerCard);
        card.appendChild(divcard);
    }
}

export function loadCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            generateCountries(data);
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
}
// Functie om landen van de API te laden
function loadCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            generateCountries(data);
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
}

    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            generateCountries(data);
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
}
