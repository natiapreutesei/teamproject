function startGame() {
    correctAnswers = 0; // Reset het aantal correcte antwoorden
    playSound(); // Speel een geluid af (indien nodig).
    startTimer(); // Start de timer.
    generateCountries(); // Start het spel.
}

let startTime;
let timerInterval;


function startTimer() {
    stopTimer();
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000); // Update de timer elke seconde
}

function updateTimer() {
    let currentTime = new Date();
    let elapsedTime = Math.floor((currentTime - startTime) / 1000); // Tijd in seconden
    let minutes = Math.floor(elapsedTime / 60);
    let seconds = elapsedTime % 60;

    document.getElementById("timerDisplay").textContent = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
}

function stopTimer() {
    clearInterval(timerInterval);
    console.log("Timer gestopt"); // Bevestig dat de timer is gestopt
}

function generateCountries() {
    let number = 15;
    let playerName = document.getElementById("playerName").value;
    let continent = document.getElementById("continentSelect").value;
    let apiUrl = continent === 'all' ? 'https://restcountries.com/v3.1/all' : `https://restcountries.com/v3.1/region/${continent}`;

    if (!validateInput(number, playerName)) return;
    {
        startTimer();
    }
    let generateButton = document.getElementById("generateButton");
    if (generateButton) {
        generateButton.addEventListener("click", startGame);
    } else {
        console.error("Element met ID 'generateButton' niet gevonden.");
    }




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
        <div class="col-md-6 col-lg-4 border border-1 border-white bg-white bg-opacity-25 rounded-5 rounded-top-0">
            <div class="d-flex flex-column " id="countryQuiz_${i}">
             <div class=" bounce-in-top flag-img text-center align-self-center">
                <div class="jello-horizontal">
                        <img src="${country.flags.png}" class="card-img-top flag-img center" alt="Flag of ${country.name.common}">
                </div>
             </div>
            <div class="options align-self-center">${optionsHtml}</div>
         </div>
        </div>`;
    });

    resultContainer.innerHTML += '<button id="checkAnswersButton" class="w-25 btn btn-primary ' +
        ' mt-3 mx-auto' +
        ' pulse">Ben je zeker?</button>';
    document.getElementById("checkAnswersButton").addEventListener("click", () => checkAllAnswers(selectedCountries, playerName));
}

function generateRandomOptions(countries, correctOption) {
    let options = [correctOption];
    while (options.length < 3) {
        let randomOption = countries[Math.floor(Math.random() * countries.length)].name.common;
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }
    // Shuffle de opties
    return options.sort(() => Math.random() - 0.5);
}



function checkAllAnswers(selectedCountries, playerName) {
    stopTimer();
    if (answersSubmitted) return;
    answersSubmitted = true;

    correctAnswers = 0; // Reset correctAnswers voor elke nieuwe spelronde

    console.log("checkAllAnswers wordt uitgevoerd"); // Debugging

    selectedCountries.forEach((country, index) => {
        let selectedOption;
        let radioButtons = document.querySelectorAll(`input[name="countryOption_${index}"]:checked`);
        if (radioButtons.length > 0) {
            selectedOption = radioButtons[0].value;
            if (selectedOption === country.name.common) {
                correctAnswers++;
            }
        }



        // Update de kleuren van de radiobuttons en labels
        document.querySelectorAll(`input[name="countryOption_${index}"]`).forEach(radioButton => {
            let label = document.querySelector(`label[for="${radioButton.id}"]`);
            if (radioButton.value === country.name.common) {
                label.style.color = radioButton.checked ? "green" : "black";
            } else {
                label.style.color = radioButton.checked ? "red" : "black";
            }
        });


        let feedback = determineFeedback(correctAnswers, selectedCountries.length);
        updateHighScoreBoard(playerName, correctAnswers, selectedCountries.length, feedback);

    })



}

function updateHighScoreBoard(playerName, score, total, feedback) {
    let finalTime = document.getElementById("timerDisplay").textContent;
    console.log("Score: " + score + ", Total: " + total + ", Time: " + finalTime);

    let existingEntry = highScores.find(entry => entry.name === playerName);
    if (existingEntry) {
        if (score > existingEntry.score) { // Update only if the new score is higher
            existingEntry.score = score;
            existingEntry.time = finalTime;
            existingEntry.feedback = feedback;
            console.log("Bijwerken bestaande invoer: ", existingEntry);
        }
    } else {
        let newEntry = { name: playerName, score: score, total: total, time: finalTime, feedback: feedback };
        highScores.push(newEntry);
        console.log("Nieuwe invoer toegevoegd: ", newEntry);
    }

    highScores.sort((a, b) => b.score - a.score);
    displayHighScores();
    localStorage.setItem('highScores', JSON.stringify(highScores));
}


function determineFeedback(correct, total) {
    let percentage = (correct / total) * 100;

    // Toevoegen van console logs voor debugdoeleinden
    console.log("Aantal correcte antwoorden: " + correct);
    console.log("Totaal aantal vragen: " + total);
    console.log("Behaalde percentage: " + percentage + "%");

    if (percentage === 100) {
        console.log("Feedback: Supreme SmartAss!!!");
        return "Supreme SmartAss!!!";
    } else if (percentage >= 80) {
        console.log("Feedback: Close but no cigar!");
        return "Close but no cigar!";
    } else if (percentage >= 60) {
        console.log("Feedback: Amazing!...(If you're going for average)");
        return "Amazing!...(If you're going for average)";
    } else if (percentage >= 40) {
        console.log("Feedback: Oh well... Better luck next time!");
        return "Oh well... Better luck next time!";
    } else if (percentage >= 20) {
        console.log("Feedback: Don't quit your day job!");
        return "Don't quit your day job!";
    } else {
        console.log("Feedback: Maybe you should try a book once in a while...");
        return "Maybe you should try a book once in a while...";
    }
}


function displayHighScores() {
    let highScoreBoard = document.getElementById("highScoreBoard");
    highScoreBoard.innerHTML = highScores.map(score =>
        `<div>${score.name}: ${score.score}/${score.total} - Time: ${score.time} - : ${score.feedback}</div>`
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

function playSound() {
    var sound = document.getElementById("mySound");
    sound.play();
    document.body.style.setProperty('--after-opacity', '1');
}