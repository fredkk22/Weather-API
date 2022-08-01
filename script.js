var title = $("h1");
var cityLabel = $(".citylabel");
var searchBtn = $(".searchbtn");
var userForm = $("#userform");
var cityInput = $(".cityinput");
var mainWeather = $(".mainweather");
var day1 = $("#day1");
var day2 = $("#day2");
var day3 = $("#day3");
var day4 = $("#day4");
var day5 = $("#day5");
var forecast = $(".forecast");
var historyButton = $(".historybutton")
var allCityInput = [];

cityLabel.text("Search for a City:");

title.text("Weather Dashboard");

searchBtn.text("Search");

function displayMain(weather) {

    if (mainWeather.text("")) {
        var cityName = $("<h2>");
        cityName.text(weather.name + " (" + moment().format("MM/DD/YYYY") + ")");
        mainWeather.append(cityName);

        var cityTemp = $("<p>");
        cityTemp.text("Temp: " + weather.main.temp.toFixed(2) + " °F");
        mainWeather.append(cityTemp);

        var cityWind = $("<p>");
        cityWind.text("Wind: " + weather.wind.speed.toFixed(2) + " MPH");
        mainWeather.append(cityWind);

        var cityHumid = $("<p>");
        cityHumid.text("Humidity: " + weather.main.humidity + "%");
        mainWeather.append(cityHumid);
        console.log(requestMain);
    }
}

function displayForecast(weather) {

    if (forecast.text("")) {
        for (i = 0; i < 5; i++) {
            var forecastDays = $("<div>");
            forecastDays.addClass("card col-2 m-3")
            var dayXDate = $("<h3>");
            dayXDate.text("(" + moment(("D" + (i + 1)), "D").format("MM/DD/YYYY") + ")");
            forecastDays.append(dayXDate);
            var dayXTemp = $("<p>");
            dayXTemp.text("Temp: " + ((weather.daily[i].temp.max + weather.daily[i].temp.min) / 2).toFixed(2) + " °F");
            forecastDays.append(dayXTemp);
            var dayXWind = $("<p>");
            dayXWind.text("Wind: " + (weather.daily[i].wind_speed).toFixed(2) + " MPH");
            forecastDays.append(dayXWind);
            var dayXHumid = $("<p>");
            dayXHumid.text("Humidity: " + weather.daily[i].humidity + "%");
            forecastDays.append(dayXHumid);
            forecast.append(forecastDays);
        }
    }
}

var displayUVI = function (weather) {
    var cityUVI = $("<p>");
    cityUVI.text("UVI: " + weather.current.uvi);
    mainWeather.append(cityUVI);
}

function displayHistory() {
    var displayStorage = JSON.parse(localStorage.getItem("City Search History"));
    var cityInputVal = cityInput.val();

    if (cityInputVal) {
        var button = $("<button>");
        button.addClass("historybutton");
        button.addClass("m-2")
        button.addClass("ml-4")
        button.text(displayStorage[displayStorage.length - 1]);
        button.appendTo($(".leftcard"));
    }
}

function storeHistory() {
    var cityInputVal = cityInput.val();

    if (cityInputVal) {
        JSON.parse(localStorage.getItem("City Search History"));
        allCityInput.push(cityInputVal);
        localStorage.setItem("City Search History", JSON.stringify(allCityInput));
    }
}

var requestMain = function () {
    var cityInputVal = cityInput.val();
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInputVal + "&appid=c3724c60a3fb224ac5bc841e274c0689&units=imperial";

    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                        displayMain(data);
                    });
            };
        });
}

var requestUVI = function () {
    var cityInputVal = cityInput.val();
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInputVal + "&appid=c3724c60a3fb224ac5bc841e274c0689&units=imperial";

    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        fetch("http://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=minutely,hourly,alerts&appid=c3724c60a3fb224ac5bc841e274c0689&units=imperial")
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (data) {
                                displayUVI(data);
                                console.log(data);
                            })
                    });
            };
        });
}

var requestForecast = function () {
    var cityInputVal = cityInput.val();
    var forecastUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInputVal + "&appid=c3724c60a3fb224ac5bc841e274c0689&units=imperial";

    fetch(forecastUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            fetch("http://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=minutely,hourly,alerts&appid=c3724c60a3fb224ac5bc841e274c0689&units=imperial")
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    displayForecast(data);
                    console.log(data);
                })
        })
}

var searchBtnHandler = function (event) {
    event.preventDefault();

    requestMain();
    requestUVI();
    storeHistory();
    displayHistory();
    requestForecast();

    if (cityInput.val()) {
        cityInput.val('');
    }
};

var historyButtonHandler = function (event) {
    event.preventDefault();
    cityInput.val() = button.text();

    requestMain();
    requestMain();
    requestUVI();
    requestForecast();
}



userForm.submit(searchBtnHandler);
historyButton.click(historyButtonHandler);