"use strict";

var divContainer, divCategorie;
var data;
var rdbKleuren;

var selectedCar;

window.addEventListener("load", Initialise);


function Initialise() {
  FetchDataJson();
  //divContainer = document.querySelector("divContainer");
  divCategorie = document.getElementById("divCategorie");

  rdbKleuren = document.getElementsByName("Kleur");
  for (let index = 0; index < rdbKleuren.length; index++) {
    rdbKleuren[index].addEventListener('change',
      (event) => {
        KiesKleurVanWagen(event.target.value);
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
      data = arr;
      //ToonDetails(arr);
    });
}

function ToonDetails(data) {

  //de data heeft verschillende keys (LuxeWagens, SUVAuto's, StadsAutos)
  //dit komt terecht in 'key'.
  for (let key in data) {

    //nu we door de verschillende keys lussen, lussen we ook nog eens door de verschillende auto's per category
    //vandaar mijn opmerking van daarnet dat deze misschien overbodig is.
    //dit is een array, dus heeft een .length property
    for (let index = 0; index < data[key].length; index++) {

      //Hier word de auto aangemaakt
      const car = data[key][index];
      console.log('Car: ' + car);

      let divCar = document.createElement('div');
      let carNaam = car.Naam;
      let carPrijs = car.Prijs;
      let carKleur = car.Kleuren.join(" - ");

      let samenvatting = `<h3>${carNaam}</h3><br/>
                          Prijs: €${carPrijs}<br/><br/>
                          <b>Kleuren:</b>${carKleur}<br/>`;

      divCar.className = 'carInfo';
      divCar.id = index;
      divCar.innerHTML = samenvatting;

      //divContainer.appendChild(divCar);

      //auto's is de array, dus geef mij de zoveelste auto
      //en toon deze in de console
      console.log(data[key][index]);

    }
  }
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
