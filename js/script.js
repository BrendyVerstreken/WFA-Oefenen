"use strict";

var divContainer;
var data;
var rdbKleuren;

window.addEventListener("load", Initialise);


function Initialise() {
  FetchDataJson();
  divContainer = document.getElementById("divContainer");

  rdbKleuren = document.getElementsByName("Kleur");

  for (let index = 0; index < rdbKleuren.length; index++) {
    rdbKleuren[index].addEventListener('change',
      (event) => {
        KiesKleurVanWagen(event.target.value);
      });
  }
  VulSelect();
}

// function FetchDataJson() {
//   //Koppelingen naar een externe site.
//   fetch("https://howest-gp-wfa.github.io/st-2021-1-S2-a-wfa-pe03-BrendyVerstreken/api/voertuig.json")
//     .then(function (response) { return response.json(); })
//     .then(function (arr) {
//       data = arr;
//       ToonDetails(arr);
//     });
//}

function ToonDetails(data) {

  //de data heeft verschillende keys (LuxeWagens, SUVAuto's, StadsAutos)
  //dit komt terecht in 'key'.
  for (let key in data) {

    //nu we door de verschillende keys lussen, lussen we ook nog eens door de verschillende auto's per category
    //merk op dat je hier .Autos nog eens moet toevoegen omdat je nog eens deze property voorzag in de json
    //vandaar mijn opmerking van daarnet dat deze misschien overbodig is.
    //dit is een array, dus heeft een .length property
    for (let index = 0; index < data[key].length; index++) {

      //auto's is de array, dus geef mij de zoveelste auto
      //en toon deze in de console
      console.log(data[key].Autos[index]);
    }

    function VulSelect() {
      for (let categorie in autovoertuigen) {
        slcCategorie[slcCategorie.length] = new Option(categorie, categorie)
      }
    }

    function KiesKleurVanWagen(kleuren) {
      let voertuig = [];
      divVoertuigen.innerHTML = "";

      for (let index = 0; index < voertuigen.length; index++) {
        if (kleuren == "Alles") {
          voertuig.push(voertuigen[index]);
        }
        else if (kleuren == voertuigen[index].kleuren) {
          voertuig.push(voertuigen[index]);
        }
      }
      MaakVoertuigen(voertuig);
    }
  }
}