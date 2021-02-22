const countries = document.getElementById("countries");

async function fetchData(){
    const apiURL = await axios.get("https://restcountries.eu/rest/v2/all");
    console.log(apiURL);
}
fetchData()

async function sortByPopulation() {
    const API = await axios.get("https://restcountries.eu/rest/v2/all");
    const countries=API.data;
    const arrayPopulations=[];
    for (country of countries) {
        const name = country.name;
        const flag = country.flag;
        const population = country.population;
        const region= country.region;
        arrayPopulations.push({name,flag,population,region});
    }
    arrayPopulations.sort((a,b) => {
        return a.population-b.population;
    });
    console.log(arrayPopulations);
    return arrayPopulations;
}

async function showCountries() {
    const countriesList = await sortByPopulation();
        for (country of countriesList) {
            const flag = document.createElement("img");
            flag.setAttribute("src", country.flag);
            flag.setAttribute("id", "flagmap")
            newItem = document.createElement("div");
            newItem.setAttribute("id", "worldmap-item");
            newItem.append(flag, country.name);
            if (country.region==="Africa") {
                newItem.style.setProperty("color", "#5575c1");
            }
            else if (country.region==="Americas") {
                newItem.style.setProperty("color", "#4d824b");
            }
            else if (country.region==="Asia") {
                newItem.style.setProperty("color", "#d04e5b");
            }
            else if (country.region==="Europe") {
                newItem.style.setProperty("color", "#ffd435");
            }
            else if (country.region==="Oceania") {
                newItem.style.setProperty("color", "#a653ba");
            }
            else {
                newItem.style.setProperty("color", "white");
            }
            countries.appendChild(newItem);
        }
}
showCountries()
