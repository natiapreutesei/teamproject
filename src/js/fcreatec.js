


let highScores = [];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('highScores')) {
        highScores = JSON.parse(localStorage.getItem('highScores'));
        displayHighScores();
    }

    document.getElementById("generateButton").addEventListener("click", (e) => {
        e.preventDefault();
        generateCountries();
    });

    document.getElementById("resetHighScoreButton").addEventListener("click", resetHighScores);
});

function generateCountries() {
    let welcomeText = document.getElementById('welcomeText');
    if (welcomeText) {
        welcomeText.style.display = 'none';
    }
    let number = 15;
    let playerName = document.getElementById("playerName").value;
    let continent = document.getElementById("continentSelect").value;
    let apiUrl = continent === 'all' ? 'https://restcountries.com/v3.1/all' : `https://restcountries.com/v3.1/region/${continent}`;

    if (!validateInput(number, playerName)) return;



    // Reset answersSubmitted naar false bij het starten van een nieuwe spelronde
    answersSubmitted = false;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            selectedCountries = []; // Leeg de array voordat nieuwe landen worden gegenereerd
            displayCountries(data, number, playerName);
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
}


function validateInput(number, playerName) {
    if (!playerName) {
        alert("Naam ingeven is verplicht!");
        return false;
    }

    return true;
}

function displayCountries(countries, number, playerName) {
    let resultContainer = document.getElementById("result");
    resultContainer.innerHTML = "";
    let selectedCountries = [];
    let usedIndices = new Set();

    while (selectedCountries.length < number) {
        let index = Math.floor(Math.random() * countries.length);
        if (!usedIndices.has(index)) {
            usedIndices.add(index);
            selectedCountries.push(countries[index]);
        }
    }



    selectedCountries.forEach((country, i) => {
        let options = generateRandomOptions(countries, country.name.common);
        let optionsHtml = options.map((option, index) =>
            `<div class="form-check fade-in">
                <input  class="form-check-input " type="radio" name="countryOption_${i}" id="option_${i}_${index}" value="${option}">
                
                
                <label class="form-check-label" for="option_${i}_${index}">
                    ${option}
                </label>
            </div>`).join('');


        resultContainer.innerHTML += `
        <div class="col-md-6 country-quiz col-12 col-md-6 col-lg-4 " id="countryQuiz_${i}">
            <div class="flip-card bounce-in-top flag-img">
                <div class="flip-card-inner jello-horizontal">
                    <div class="flip-card-front ">
                        <img src="${country.flags.png}" class="card-img-top flag-img center" alt="Flag of ${country.name.common}">
                    </div>
                    <div class="flip-card-back " id="backFace-${i}">
                        <p id="answerText-${i}"></p>
                    </div>
                </div>
            </div>
            <div class="options">${optionsHtml}</div>
        </div>`;
    });

    resultContainer.innerHTML += '<button id="checkAnswersButton" class="btn btn-primary ' +
        ' mt-3' +
        ' pulse">Ben je zeker?</button>';
    document.getElementById("checkAnswersButton").addEventListener("click", () => checkAllAnswers(selectedCountries, playerName));
}

function generateRandomOptions(countries, correctOption) {
    let options = new Set([correctOption]);
    while (options.size < 3) {
        let randomOption = countries[Math.floor(Math.random() * countries.length)].name.common;
        options.add(randomOption);
    }
    return Array.from(options);
}

let answersSubmitted = false;

function checkAllAnswers(selectedCountries, playerName) {
    if (answersSubmitted) return;
    answersSubmitted = true;
    let correctAnswers = 0;

    selectedCountries.forEach((country, index) => {
        let selectedOption;
        let radioButtons = document.querySelectorAll(`input[name="countryOption_${index}"]:checked`);
        if (radioButtons.length > 0) {
            selectedOption = radioButtons[0].value;
        }

        let cardElement = document.getElementById(`countryQuiz_${index}`);
        let backFaceElement = cardElement.querySelector(`#backFace-${index}`);
        let answerTextElement = cardElement.querySelector(`#answerText-${index}`);

        if (selectedOption === country.name.common) {
            answerTextElement.textContent = "Correct!";
            backFaceElement.style.backgroundColor = "green";
            correctAnswers++;
        } else {
            answerTextElement.textContent = "Incorrect";
            backFaceElement.style.backgroundColor = "red";
        }

        cardElement.querySelector('.flip-card-inner').classList.add('flipped');

        // Update de kleuren van de radiobuttons en labels
        document.querySelectorAll(`input[name="countryOption_${index}"]`).forEach(radioButton => {
            let label = document.querySelector(`label[for="${radioButton.id}"]`);
            if (radioButton.value === country.name.common) {
                label.style.color = radioButton.checked ? "green" : "black";
            } else {
                label.style.color = radioButton.checked ? "red" : "black";
            }
        });
    });

    updateHighScoreBoard(playerName, correctAnswers, selectedCountries.length);
}

function updateHighScoreBoard(playerName, score, total) {
    let feedback = determineFeedback(score, total);
    let existingEntry = highScores.find(entry => entry.name === playerName && entry.total === 0);

    if (existingEntry) {
        existingEntry.score = score;
        existingEntry.total = total;
        existingEntry.feedback = feedback;
    } else {
        let scoreEntry = { name: playerName, score: score, total: total, feedback: feedback };
        highScores.push(scoreEntry);
    }

    // Sorteer de highScores-array op basis van scores in aflopende volgorde
    highScores.sort((a, b) => b.score - a.score);

    // Verplaats deze aanroep naar hier om het scoreboard bij te werken
    displayHighScores();
}


function determineFeedback(correct, total) {
    let percentage = (correct / total) * 100;
    if (percentage === 100) {
        return "Excellent!!!";
    } else if (percentage > 50) {
        return "Close but no cigar";
    } else if (percentage === 0) {
        return "Bummer...";
    } else {
        return "Try a book in the future...";
    }
}

function displayHighScores() {
    let highScoreBoard = document.getElementById("highScoreBoard");
    highScoreBoard.innerHTML = highScores.map(score =>
        `<div>${score.name}: ${score.score}/${score.total} - ${score.feedback}</div>`
    ).join('');
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('highScores')) {
        highScores = JSON.parse(localStorage.getItem('highScores'));
        displayHighScores();
    }
});

document.getElementById("resetHighScoreButton").addEventListener("click", resetHighScores);

function resetHighScores() {
    highScores = [];
    displayHighScores();
    localStorage.setItem('highScores', JSON.stringify(highScores));
}
