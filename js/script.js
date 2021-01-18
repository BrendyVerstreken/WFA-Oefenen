"use strict";

var divContainer, divCategorie;
var data;
var rdbKleuren;

var dataLuxe, dataSuv, dataStads;


window.addEventListener("load", Initialise);


function Initialise() {
  FetchDataJson();
  //divContainer = document.querySelector("divContainer");
  divCategorie = document.getElementById("divCategorie");

  rdbKleuren = document.getElementsByName("Kleur");
  for (let index = 0; index < rdbKleuren.length; index++) {
    rdbKleuren[index].addEventListener('change',
      (event) => {
        ToonVolgensKleur(event.target.value);
      });
  }

  VulSelect();
  slcCategorie.addEventListener("change", ToonInhoudCategorie);
  ToonInhoudCategorie();
}

function FetchDataJson() {
  //Koppelingen naar een externe site.
  fetch("https://brendyverstreken.github.io/WFA-Oefenen/api/voertuig.json")
    .then(function (response) { return response.json(); })
    .then(function (arr) {
      dataLuxe = arr.Luxewagen;
      console.log(dataLuxe);
      createCardLuxe(dataLuxe);

      dataSuv = arr.SUVAutos;
      createCardSuv(dataSuv);

      dataStads = arr.StadsAutos;
      createCardStads(dataStads);
    });
}

function createCardStads(arr) {
  arr.forEach(element => {
    let article = document.createElement("article");
    article.className = "card";

    let name = document.createElement("h2");
    name.innerHTML = element.Naam;

    let imgCard = document.createElement("img");
    imgCard.src = element.Afbeeldingen;
    imgCard.class = "imgCar";

    let price = document.createElement("p");
    price.innerHTML = `€ ${element.Prijs}`;

    let kleur = document.createElement("p");
    kleur.innerHTML = element.KLeuren;

    document.getElementById("containerStads").appendChild(article);

    article.appendChild(name);
    article.appendChild(imgCard);
    article.appendChild(price);
    article.appendChild(kleur);

  });
}

function createCardSuv(arr) {
  arr.forEach(element => {
    let article = document.createElement("article");
    article.className = "card";

    let name = document.createElement("h2");
    name.innerHTML = element.Naam;

    let imgCard = document.createElement("img");
    imgCard.src = element.Afbeeldingen;
    imgCard.class = "imgCar";

    let price = document.createElement("p");
    price.innerHTML = `€ ${element.Prijs}`;

    let kleur = document.createElement("p");
    kleur.innerHTML = element.KLeuren;

    document.getElementById("containerSuv").appendChild(article);

    article.appendChild(name);
    article.appendChild(imgCard);
    article.appendChild(price);
    article.appendChild(kleur);

  });
}

function createCardLuxe(arr) {
  arr.forEach(element => {
    let article = document.createElement("article");
    article.className = "card";

    let name = document.createElement("h2");
    name.innerHTML = element.Naam;

    let imgCard = document.createElement("img");
    imgCard.src = element.Afbeeldingen;
    imgCard.class = "imgCar";

    let price = document.createElement("p");
    price.innerHTML = `€ ${element.Prijs}`;

    let kleur = document.createElement("p");
    kleur.innerHTML = element.KLeuren;

    document.getElementById("containerLuxe").appendChild(article);

    article.appendChild(name);
    article.appendChild(imgCard);
    article.appendChild(price);
    article.appendChild(kleur);

  });
}



function VulSelect() {
  for (let categorie in autovoertuigen) {
    slcCategorie[slcCategorie.length] = new Option(categorie, categorie)
  }
}

//Met deze functie toon je de autos die passen bij de keuze die je hebt gemaakt
//met de select
function ToonInhoudCategorie() {
  divCategorie.innerHTML = '';

  let keuze = slcCategorie[slcCategorie.selectedIndex].text;

  if (Array.isArray(autovoertuigen[keuze])) {
    for (let i = 0; i < autovoertuigen[keuze].length; i++) {
      divCategorie.appendChild(CreateDivision(autovoertuigen[keuze][i]))
    }
  }
  else {
    divCategorie.appendChild(CreateDivision(autovoertuigen[keuze]));
  }
}

function CreateDivision(objectCar) {
  let toevoeging = document.createElement('div');
  let inhoudToevoeging = '';

  for (let gegeven in objectCar) {
    inhoudToevoeging += `${gegeven} : ${objectCar[gegeven]} <br/>`;
  }

  toevoeging.classList.add("car");
  toevoeging.innerHTML = inhoudToevoeging;
  return toevoeging;

}




