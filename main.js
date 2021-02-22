const button = document.getElementById("button");
button.addEventListener("click", showDataButton);
const input = document.getElementById("input");
input.addEventListener("keyup", showDataKeyboard);
const page= document.getElementById("mainpage");

function returnURL() {
    let inputValue = input.value;
    let apiURL = "https://restcountries.eu/rest/v2/name/" + inputValue + "?fullText=true";
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

async function fetchData() {
    const endpoint = await axios.get(returnURL());
    const result = endpoint.data[0].name + " is situated in " + endpoint.data[0].subregion + ". "
            + "It has a population of " + endpoint.data[0].population + " people."
    return result;
    }

async function fetchCurrencies() {
    const endpoint = await axios.get(returnURL());
    let string = "The capital is " + endpoint.data[0].capital + " and you can pay with ";
    const currencies = endpoint.data[0].currencies;
    for (const currency of currencies) {
        if (currency === currencies[0]) {
            string = string + (currency.name) + "'s.";
        } else if (currency > currencies[0]) {
            string = string + " and " + (currency.name) + "'s."
        }
    }
    return string;
}

async function fetchLanguages() {
    const endpoint = await axios.get(returnURL());
    let string = "The people from " + endpoint.data[0].name + " speak ";
    const languages = endpoint.data[0].languages;
    for (const language of languages) {
        if (language === languages[0] && languages.length === 1) {
            string = string + language.name + ".";
        }
        if (language === languages[0] && languages.length > 1) {
            string = string + language.name;
        }
        if (languages.length === 2 && language === languages[1]) {
            string = string + " and " + language.name + ".";
        }
        if (languages.length > 2 && language !== languages[0] && language !== languages[languages.length - 1]) {
            string = string + ", " + language.name;
        }
        if (languages.length > 2 && language === languages[languages.length - 1]) {
            string = string + " and " + language.name + ".";
        }
    }
    return string;
}

async function fetchFlag() {
    const endpoint = await axios.get(returnURL());
    const flagItem = document.createElement("img");
    const country = endpoint.data[0];
    flagItem.setAttribute("src", country.flag);
    flagItem.setAttribute("id", "flag");
    return flagItem;
}

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



