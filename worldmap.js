const countries = document.getElementById("countries");
countries.setAttribute("id", "countries")


//Returns an array with all countries, sorted by population
async function sortByPopulation() {
    const API = await axios.get("https://restcountries.eu/rest/v2/all");
    console.log(API);
    const arrayPopulations=[];
    for (let country of API.data) {
        const {name, flag, population, region} = country;
        arrayPopulations.push({name,flag,population,region});
    }
    arrayPopulations.sort((a,b) => {
        return a.population-b.population;
    });
    return arrayPopulations;
}

//Shows all countries on the page in corresponding colors
async function showCountries() {
    const countriesList = await sortByPopulation();
        for (let country of countriesList) {
            const flag = document.createElement("img");
            flag.setAttribute("src", country.flag);
            flag.setAttribute("id", "flagmap");
            const newItem = document.createElement("div");
            const newItemPopulation = document.createElement("div");
            newItemPopulation.setAttribute("id", "population-"+(country.name));
            newItem.append(flag, country.name);
            switch (country.region) {
                case "Africa":
                    newItem.style.setProperty("color", "#5575c1");
                    break;
                case "Americas":
                    newItem.style.setProperty("color", "#4d824b");
                    break;
                case "Asia":
                    newItem.style.setProperty("color", "#d04e5b");
                    break;
                case "Europe":
                    newItem.style.setProperty("color", "#ffd435");
                    break;
                case "Oceania":
                    newItem.style.setProperty("color", "#a653ba");
                    break;
                default:
                    newItem.style.setProperty("color", "white");
            }
            countries.appendChild(newItem);
            countries.appendChild(newItemPopulation);
        }
    countries.addEventListener("click", showPopulation);
}
showCountries()

// Shows the population below clicked country.
async function showPopulation(e) {
    const clickedCountry = e.srcElement.innerText;
    console.log(clickedCountry);
    const ID="population-"+clickedCountry;
    console.log(ID);
    const clickedElement = document.getElementById("population-"+clickedCountry);
    clickedElement.style.setProperty("color", "goldenrod");
    if (clickedElement.hasChildNodes()){
        clickedElement.removeChild(clickedElement.childNodes[0]);
        return;
    }
    //fetch population
    const countriesList = await sortByPopulation();
    const result = countriesList.filter(country=> {
    return country.name===clickedCountry})
    //append info
    clickedElement.textContent="Population: "+result[0].population.toLocaleString();
}
