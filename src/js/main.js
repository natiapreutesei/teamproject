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
           /* console.log(country[i]["name"]["common"]);*/
            li.innerHTML = country[i]["name"]["common"] + "</br>" +  /*country[i]["name"]["official"]+ "</br>" +*/  country[i]["flags"]["png"];
        }
        ul.appendChild(li);
    }
    example.appendChild(ul);
}

window.addEventListener("load",jsonLink);
