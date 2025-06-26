const state = {
  currentPage: 1,
  currentCity: "",
};

async function searchByCity(city, page) {
  state.currentCity = city;
  try {
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?by_city=${city}&page=${page}&per_page=10`
    );
    if (!response.ok) {
      throw new Error("Network error. Status: ", response.status);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("ERROR Fetching by city: ", error.message);
  } finally {
    console.log("Finished fetching by city");
  }
}

// searchByCity("san diego", 1);
// searchByCity("philadelphia", 2);

function renderBreweries(breweryData) {
  const breweryContainer = document.getElementById("brewery-container");
  breweryContainer.innerHTML = "";
  // breweryContainer.className = "border red"

  if (breweryData.length === 0) {
    const noDataElm = document.createElement("p");
    noDataElm.innerText = "No breweries found.";
    noDataElm.className = "font-bold";
    breweryContainer.appendChild(noDataElm);
    return;
  }

  breweryData.forEach((breweries) => {
    const breweryElm = document.createElement("div");

    const nameElm = document.createElement("p");
    nameElm.innerHTML = breweries.name;
    nameElm.className = "font-bold";

    const cityElm = document.createElement("p");
    cityElm.innerHTML = breweries.city;

    const stateElm = document.createElement("p");
    stateElm.innerHTML = breweries.state;

    const streetElm = document.createElement("p");
    streetElm.innerHTML = breweries.street;

    breweryElm.appendChild(nameElm);
    breweryElm.appendChild(cityElm);
    breweryElm.appendChild(stateElm);
    breweryElm.appendChild(streetElm);

    breweryContainer.appendChild(breweryElm);
  });
}

async function handlesSubmitCitySearch(event) {
  event.preventDefault();

  const city = event.target["search-city"].value;
  state.currentPage = 1;
  state.currentCity = city;

  const data = await searchByCity(city, state.currentPage);

  renderBreweries(data);

  renderPagination(data.length);
}

function renderPagination(currentPageDataLength) {
  const paginationContainer = document.getElementById("pagination-section");
  paginationContainer.innerHTML = "";
  const prevBtn = document.getElementById("previous");
  const nextBtn = document.getElementById("next");

  prevBtn.disabled = state.currentPage === 1;
  nextBtn.disabled = currentPageDataLength < 10;

  nextBtn.onclick = async () => {
    state.currentPage++;
    const data = await searchByCity(state.currentCity, state.currentPage);
    renderBreweries(data);
    renderPagination(data.length);
  };

  prevBtn.onclick = async () => {
    if (state.currentPage > 1) {
      state.currentPage--;
      const data = await searchByCity(state.currentCity, state.currentPage);
      renderBreweries(data);
      renderPagination(data.length);
    }
  };

  const pageCountElem = document.createElement("p");
  //   pageCountElem.className = " ";
  pageCountElem.innerHTML = `Page ${state.currentPage}`;

  paginationContainer.appendChild(pageCountElem);
}
