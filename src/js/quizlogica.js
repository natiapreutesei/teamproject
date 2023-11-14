document.getElementById('startQuiz').addEventListener('click', startQuiz);

function startQuiz() {
    const aantalVragen = document.getElementById('aantalVragen').value;
    haalVlaggenOp(aantalVragen);
}

function haalVlaggenOp(aantal) {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            toonVlaggen(data, aantal);
        })
        .catch(error => {
            console.error('Fout bij het ophalen van de vlaggen:', error);
        });
}

function toonVlaggen(landen, aantal) {
    const vlaggenContainer = document.getElementById('vlaggenContainer');
    vlaggenContainer.innerHTML = ''; // Maak de container leeg

    for (let i = 0; i < aantal; i++) {
        const randomIndex = Math.floor(Math.random() * landen.length);
        const land = landen[randomIndex];
        const vlagElement = document.createElement('img');
        vlagElement.src = land.flags.png;
        vlagElement.alt = 'Vlag van ' + land.name.common;
        vlaggenContainer.appendChild(vlagElement);
    }

    document.getElementById('quizSectie').style.display = 'block';
}
