// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

/*FUNCTION TO READ THE JSON AND LOAD THE ELEMENTS NEEDED FOR THE PROJECT*/
function jsonLink(){ //connection making
    const xhr = new XMLHttpRequest();
    xhr.onload = onLoad;
    xhr.open("GET", "https://restcountries.com/v3.1/all", true);
    xhr.send(null);
}
function onLoad(){
    const example = document.getElementById("example");
    let ul = document.createElement("ul");
    let country = JSON.parse(this.responseText);
    for (let i=0; i<country.length;i++){
        let li = document.createElement("li");
        if (country.name !== ""){
           /!* console.log(country[i]["name"]["common"]);*!/
            li.innerHTML = country[i]["name"]["common"] + "</br>" +  country[i]["name"]["official"]+ "</br>" +  country[i]["flags"]["png"];
        }
        ul.appendChild(li);
    }
    example.appendChild(ul);
}

window.addEventListener("load",jsonLink);

/*FUNCTION THAT READS THE NUMBER OF INPUTS GIVEN AND GENERATES THAT MANY CARDS*/
/*function generateCountries() {
    let number = document.getElementById("countryCount").value;

    let card = document.getElementById("result"); // Corrected: Use the "result" div instead of "card"
    card.innerHTML = "";

    for (let i = 0; i < number; i++) { // Corrected: Change "i<=number" to "i<number"
        let divcard = document.createElement("div");
        divcard.className = 'col'; // Corrected: Set the class to 'col' for proper Bootstrap styling

        let innerCard = document.createElement("div");
        innerCard.className = 'card';

        // Add your card content here, e.g., an image, title, and text
        // innerCard.innerHTML = '<img src="..." class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p></div>';

        divcard.appendChild(innerCard);
        card.appendChild(divcard);
    }
}*/

