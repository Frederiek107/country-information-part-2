const button = document.getElementById("button");
button.addEventListener("click", showDataButton);
const input = document.getElementById("input");
input.addEventListener("keyup", showDataKeyboard);
const page= document.getElementById("mainpage");

function returnURL() {
    let apiURL = "https://restcountries.eu/rest/v2/name/" + input.value + "?fullText=true";
    return apiURL;
}

async function showDataButton(e) {
        showResults();
}

function showDataKeyboard(e) {
    if (e.keyCode === 13) {
        showResults();
    }
}

// Returns a string with the subregion and population
async function fetchData() {
    const endpoint = await axios.get(returnURL());
    const {name, subregion, population} = endpoint.data[0];
    const result = name +  " is situated in " + subregion + ". It has a population of " + population.toLocaleString() + " people."
    return result;
    }

// Returns a string with the capital and currency
async function fetchCurrencies() {
    const endpoint = await axios.get(returnURL());
    const {capital, currencies} = endpoint.data[0];
    let string = "The capital is " + capital + " and you can pay with ";
    for (const currency of currencies) {
        if (currency === currencies[0]) {
            string = string + currency.name + "'s.";
        } else if (currency > currencies[0]) {
            string = string + " and " + currency.name + "'s."
        }
    }
    return string;
}

// Returns a string with the language(s)
async function fetchLanguages() {
    const endpoint = await axios.get(returnURL());
    const {name, languages} = endpoint.data[0];
    let string = "The people from " + name + " speak ";
    for (const language of languages) {
        if (languages.length === 1) {
            string = string + language.name + ".";
        }
        if (language === languages[0] && languages.length > 1) {
            string = string + language.name;
        }
        if (language === languages[1] && languages.length === 2) {
            string = string + " and " + language.name + ".";
        }
        if (language !== languages[0] && language !== languages[languages.length-1] && languages.length > 2) {
            string = string + ", " + language.name;
        }
        if (language === languages[languages.length - 1] && languages.length > 2) {
            string = string + " and " + language.name + ".";
        }
    }
    return string;
}

// Returns an image-element with the flag
async function fetchFlag() {
    const endpoint = await axios.get(returnURL());
    const flagItem = document.createElement("img");
    const {flag} = endpoint.data[0];
    flagItem.setAttribute("src", flag);
    flagItem.setAttribute("id", "flag");
    return flagItem;
}

// Shows the combined results on the page
async function showResults() {
    try {
        const endpoint = await axios.get(returnURL());
        const country = endpoint.data[0];
        page.textContent = "";
        const result = document.createElement("div");
        const resultname = document.createElement("div");
        resultname.setAttribute("id", "result-name");
        result.setAttribute("style", "white-space: pre;");
        result.append (await fetchData(), "\n" , await fetchCurrencies(), "\n", await fetchLanguages());
        resultname.append(country.name, await fetchFlag());
        page.appendChild(resultname);
        page.style.removeProperty("display");
        page.style.setProperty("display","flex");
        page.appendChild(result);
        input.value = "";
    } catch (e) {
        page.textContent = "";
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "We couldn't find this country. Please try again!";
        errorMessage.setAttribute("id", "error");
        page.appendChild(errorMessage);
        input.value = "";
    }
}



