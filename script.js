const url = "https://restcountries.com/v3.1/all";
const country = [];
const btn = document.querySelector(".dark");
const search = document.querySelector("input");
const countryList = document.querySelector(".countries-wrapper");
const fbc = document.querySelector("select");
// fetch
fetch(url)
  .then((blob) => {
    if (!blob.ok) {
      alert(`HTTP error: ${blob.status}`);
    }

    return blob.json();
  })
  .then((data) => {
    country.push(...data);
    showAll();
    moreData();
  })
  .catch((err) => {
    alert("Error" + err);
  });

// show all
function showAll() {
  let allCountry = country
    .map((place) => {
      return ` <ul class="countries">
        <li class='flag'      > <img src=${place.flags.svg} >
        <li class='name'     > ${place.name.official} </li>
        <li class='population' > Population: <span class="fw-nr">${place.population}</span> </li>
        <li class='contient'   > Region: <span class="fw-nr"> ${place.continents} </span> </li>
        <li class='capital'   > Capital: <span class="fw-nr"> ${place.capital} </sapn> </li> 
        
        </ul>`;
    })
    .join("");

  countryList.innerHTML = allCountry;
}

// show  by contient

function findByConteints(e) {
  let cont = this.options[this.selectedIndex].value;
  var x = country.filter((place) => {
    if (place.continents[0].match(cont)) {
      return place;
    }
  });

  let contientCountry = x
    .map((place) => {
      return `<ul>
    <li   class='flag'> <img src=${place.flags.svg} >
    <li   class='name'> ${place.name.official} </li>
    <li   class='population'> Population: ${place.population} </li>
    <li   class='contient'> Region: ${place.continents} </li>
    <li   class='capital'> Capital: ${place.capital} </li> 
    
    </ul>`;
    })
    .join("");

  countryList.innerHTML = contientCountry;
}

// search fillter
function findCountry(wordToWatch) {
  return country.filter((place) => {
    const regx = new RegExp(wordToWatch, "gi");
    if (place.name.official.match(regx) || place.name.common.match(regx)) {
      return place;
    }
  });
}

function display() {
  let wordToWatch = search.value;

  const myMatch = findCountry(wordToWatch);

  if (myMatch.length == 0) {
    countryList.innerHTML = "<h2> Not found Or you type wrong </h2>";
    return;
  }
  let searchCountry = myMatch
    .map((place) => {
      return `<ul>
    <li   class='flag'> <img src=${place.flags.svg} >
    <li   class='name'>  ${place.name.official} </li>
    <li   class='population'> Population: ${place.population} </li>
    <li   class='contient'> Region: ${place.continents} </li>
    <li   class='capital'> Capital: ${place.capital} </li>  
    </ul>`;
    })
    .join("");
  countryList.innerHTML = searchCountry;
}
function darkMode() {
  document.querySelector("body").classList.toggle("dark");
}

function moreData() {
  const x = document.querySelectorAll(".countries");

  x.forEach((x) => x.addEventListener("click", moreDetails));
}

function moreDetails(e) {
  console.log(this);
}

fbc.addEventListener("change", findByConteints);
search.addEventListener("change", display);
btn.addEventListener("click", darkMode);
