let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let result = document.getElementById("result");

searchBtn.addEventListener("click", () => {
    let countryName = countryInp.value.trim(); 

    if (countryName.length === 0) {
        result.innerHTML = `<h3>The input field cannot be empty</h3>`;
        return; 
    }

    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    console.log(finalURL);

    fetch(finalURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Country not found");
            }
            return response.json();
        })
        .then((data) => {
            if (!data || !data[0]) {
                throw new Error("Country data is missing or invalid");
            }

            let country = data[0];
            let capital = country.capital ? country.capital[0] : "N/A";
            let flag = country.flags ? country.flags.svg : "N/A";
            let name = country.name ? country.name.common : "N/A";
            let continent = country.continents ? country.continents[0] : "N/A";
            let population = country.population || "N/A";
            let currencyName = country.currencies ? country.currencies[Object.keys(country.currencies)[0]].name : "N/A";
            let currencyCode = country.currencies ? Object.keys(country.currencies)[0] : "N/A";
            let languages = country.languages ? Object.values(country.languages).toString().split(",").join(", ") : "N/A";

            console.log(country);
            console.log(capital);
            console.log(flag);
            console.log(name);
            console.log(continent);
            console.log(currencyName);
            console.log(currencyCode);
            console.log(languages);

            result.innerHTML = `
                <img src="${flag}" class="flag-img" alt="Flag of ${name}">
                <h2>${name}</h2>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Capital:</h4>
                        <span>${capital}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Continent:</h4>
                        <span>${continent}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Population:</h4>
                        <span>${population}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Currency:</h4>
                        <span>${currencyName} - ${currencyCode}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Common Languages:</h4>
                        <span>${languages}</span>
                    </div>
                </div>
            `;
        })
        .catch((error) => {
            result.innerHTML = `<h3>${error.message}</h3>`;
        });
});
