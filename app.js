"use strict";

const searchBar = document.querySelector(".search");
const countryList = document.getElementById("countryList");
const select = document.getElementById("select");
let data = [];

const searchApi = (e) => {
  const searchString =
    typeof e.target.value === "number"
      ? e.target.value
      : e.target.value.toLowerCase();

  const filteredCountries = data.filter((country) => {
    switch (select.value) {
      case "Country":
        return country.name.toLowerCase().includes(searchString);
      case "Capital":
        return country.capital.toLowerCase().includes(searchString);
      case "Region":
        return country.region.toLowerCase().includes(searchString);
      case "Population":
        return country.population.toString().includes(searchString);
      default:
        return (
          country.name.toLowerCase().includes(searchString) ||
          country.capital.toLowerCase().includes(searchString) ||
          country.population.toString().includes(searchString) ||
          country.region.toLowerCase().includes(searchString) ||
          country.flag.toLowerCase().includes(searchString)
        );
    }
  });
  displayCountries(filteredCountries);
};
searchBar.addEventListener("keyup", searchApi);

const displayCountries = (countries) => {
  const htmlString = countries
    .map((country) => {
      return `<tr>
                        <th scope="col"><img style="width: 60px" src="${country.flag}"></th>
                        <td class="country-name">${country.name}</td>
                        <td>${country.capital}</td>
                        <td>${country.region}</td>
                        <td>${country.population}</td>
                        </tr>`;
    })
    .join("");
  countryList.innerHTML = htmlString;
};

const getApi = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  data = await res.json();
  console.log(data);
};
getApi();
