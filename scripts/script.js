const peopleCard = document.querySelector('#people');
const planetCard = document.querySelector('#planets');
const speciesCard = document.querySelector('#species');
const sectionDiv = document.querySelector('#contentHook');
const planetApiPoint = 'https://swapi.co/api/planets';
const peopleApiPoint = 'https://swapi.co/api/people/';
const speciesApiPoint = 'https://swapi.co/api/species/';

function planets() {
  sectionDiv.innerHTML = '';

  fetch(planetApiPoint).then((
    response // initial API call for 1st page
  ) =>
    response.json().then(rawData => {
      nextPageCheck(rawData.next); //url to next page
      filterData(rawData.results); //array with planets
    })
  );
}

function nextPageData(nextPage) {
  console.log(nextPage);
  fetch(nextPage).then(response =>
    response.json().then(rawData => {
      nextPageCheck(rawData.next); //url to next page
      filterData(rawData.results); //array with planets
    })
  );
}

function filterData(data) {
  console.log(data);
  data.map(planets => {
    const { name, population, diameter } = planets;
    createTextContent(name, population, diameter);
  });
}

//check if array has a method with another page

function nextPageCheck(pageCheck) {
  if (pageCheck != null) {
    nextPageData(pageCheck);
  }
}

async function peopleData() {
  const peoplePromise = await fetch(peopleApiPoint).then(r => r.json());

  peoplePromise.results.map(res => {
    const { name, homeworld, birth_year } = res;

    async function getPlanet() {
      const planetPromise = await fetch(homeworld).then(r => r.json());
      const planetName = planetPromise.name;
      console.log(planetName);
      return planetName;
    }

  });
  const finalData = await Promise.all([peoplePromise, getPlanet()]);
  console.log(finalData);
}

function createTextContent(name, population, diameter) {
  const div = document.createElement('div');

  div.classList.add('content-card');
  div.innerHTML = `<h2 class="heading-secondary">Name</h2>
      <p class="content-card__description">${name}</p>
      <h2 class="heading-secondary">Population</h2>
      <p class="content-card__description">${population}</p>
      <h2 class="heading-secondary">Diameter</h2>
      <p class="content-card__description">${diameter}</p>`;
  sectionDiv.appendChild(div);
}

peopleCard.addEventListener('click', peopleData);
planetCard.addEventListener('click', planets);
// speciesCard.addEventListener('click', getSpeciesData);
