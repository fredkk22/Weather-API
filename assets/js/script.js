const title = $("h1");
const description1 = $("h2");
const description2 = $("h3");
const cityLabel = $(".citylabel");
const searchBtn = $(".searchbtn");
const userForm = $("#userform");
const cityInput = $(".cityinput");
const mainWeather = $(".mainweather");
const day1 = $("#day1");
const day2 = $("#day2");
const day3 = $("#day3");
const day4 = $("#day4");
const day5 = $("#day5");
const forecast = $(".forecast");
require('dotenv').config();


function displayHeaders() {
    cityLabel.text("Enter your location:");
    title.text("What's Your Weather?");
    description1.text("Displays present weather and 5-day forecast");
    description2.text("ONLY ACCEPTS SINGLE ENTRIES & NO ABBREVIATIONS: Los Angeles ✅ | Los Angeles, CA ❌ | LA ❌")
    searchBtn.text("Search");
}

function displayMain(weather) {

    if (mainWeather.text("")) {
        const cityNameEl = $("<h4>");
        const cityTempEl = $("<p>");
        const cityWindEl = $("<p>");
        const cityHumidityEl = $("<p>");
        const iconEl = $("<img>");
        const cityName = weather.name;
        const cityTemp = weather.main.temp;
        const cityWind = weather.wind.speed;
        const cityHumidity = weather.main.humidity;
        const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
        const iconDescription = weather.weather[0].description || weather.weather[0].main;

        cityNameEl.text(`${cityName} (${moment().format("MM/DD/YYYY")})`);
        mainWeather.append(cityNameEl);
        iconEl.attr("src", iconUrl)
        iconEl.attr("alt", iconDescription);
        cityNameEl.append(iconEl);
        cityTempEl.text(`Temp: ${cityTemp.toFixed(2)} °F`);
        mainWeather.append(cityTempEl);
        cityWindEl.text(`Wind: ${cityWind.toFixed(2)} MPH`);
        mainWeather.append(cityWindEl);
        cityHumidityEl.text(`Humidity: ${cityHumidity} %`);
        mainWeather.append(cityHumidityEl);
    }
}

function displayForecast(weather) {


    if (forecast.text("")) {
        for (i = 0; i < 5; i++) {
            const forecastDays = $("<div>");
            forecastDays.addClass("card col-2 m-3")
            const dayXDate = $("<h5>");
            dayXDate.text(`(${moment().add((i + 1), "days").format("MM/DD/YYYY")})`);
            forecastDays.append(dayXDate);
            const dayXTemp = $("<p>");
            dayXTemp.text(`Temp: ${((weather.daily[i + 1].temp.max + weather.daily[i + 1].temp.min) / 2).toFixed(2)} °F`);
            forecastDays.append(dayXTemp);
            const dayXWind = $("<p>");
            dayXWind.text(`Wind: ${(weather.daily[i + 1].wind_speed).toFixed(2)} MPH`);
            forecastDays.append(dayXWind);
            const dayXHumid = $("<p>");
            dayXHumid.text(`Humidity: ${weather.daily[i + 1].humidity}%`);
            forecastDays.append(dayXHumid);
            forecast.append(forecastDays);
        }
    }
}

const displayUVI = function (weather) {
    const cityUVI = $("<p>");
    cityUVI.text("UVI: " + weather.current.uvi);
    mainWeather.append(cityUVI);
}

function storeHistory() {
    let allCityInput = JSON.parse(localStorage.getItem("City Search History"));
    const cityInputVal = cityInput.val();

    if (cityInputVal) {
        if (!allCityInput) {
            allCityInput = [];
        } else if (allCityInput.length >= 5) {
            allCityInput.shift();
        }
        allCityInput.push(cityInputVal);
        localStorage.setItem("City Search History", JSON.stringify(allCityInput));
    }
}

const requestMain = function () {
    const cityInputVal = cityInput.val();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputVal}&appid=${process.env.API_KEY}&units=imperial`;

    fetch(url).then(res => res.json()).then(function (data) {
        displayMain(data);
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly,alerts&appid=${process.env.API_KEY}&units=imperial`)
            .then(res => (res.json())).then(data => displayUVI(data));
    });
}

const requestHistoryMain = function (event) {
    const displayStorage = JSON.parse(localStorage.getItem("City Search History"));
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${displayStorage[event.data.index]}&appid=${process.env.API_KEY}&units=imperial`;

    fetch(url).then(res => res.json()).then(function (data) {
        displayMain(data);
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly,alerts&appid=${process.env.API_KEY}&units=imperial`)
            .then(res => res.json()).then(data => displayUVI(data))
    });
};

const requestForecast = function () {
    const cityInputVal = cityInput.val();
    const forecastUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputVal}&appid=${process.env.API_KEY}&units=imperial`;

    fetch(forecastUrl).then((res) => res.json()).then(function (data) {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly,alerts&appid=${process.env.API_KEY}&units=imperial`)
            .then((res) => res.json()).then(data => displayForecast(data))
    })
}

const requestHistoryForecast = function (event) {
    const displayStorage = JSON.parse(localStorage.getItem("City Search History"));
    const forecastUrl = `https://api.openweathermap.org/data/2.5/weather?q=${displayStorage[event.data.index]}&appid=${process.env.API_KEY}&units=imperial`;

    fetch(forecastUrl).then(res => res.json()).then(function (data) {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly,alerts&appid=${process.env.API_KEY}&units=imperial`)
            .then(res => res.json()).then(data => displayForecast(data))
    })
}

const searchBtnHandler = function (event) {
    event.preventDefault();

    if (cityInput.val()) {
        requestMain();
        requestForecast();
        storeHistory();
        displayAllHistory();
        cityInput.val('');
    }
};

function displayAllHistory() {
    const displayStorage = JSON.parse(localStorage.getItem("City Search History"));

    if (displayStorage) {
        $(".leftcard").empty();
        for (i = 0; i < displayStorage.length; i++) {
            const button = $("<button>");
            button.addClass("historybutton");
            button.addClass("m-2")
            button.addClass("ml-4")
            button.text(displayStorage[i]);
            button.appendTo($(".leftcard"));
            button.click({ index: i }, requestHistoryForecast);
            button.click({ index: i }, requestHistoryMain);
        }
    }
}

userForm.submit(searchBtnHandler);
displayHeaders();
displayAllHistory();