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
var allCityInput = [];

cityLabel.text("Search for a City:");

title.text("Weather Dashboard");

searchBtn.text("Search");

function storeHistory() {
    var cityInputVal = cityInput.val();

    JSON.parse(localStorage.getItem("City Search History"));
    allCityInput.push(cityInputVal);
    localStorage.setItem("City Search History", JSON.stringify(allCityInput));
}

function displayHistory() {
    var displayStorage = JSON.parse(localStorage.getItem("City Search History"));

    if (displayStorage) {
        var button = $("<button>");
        button.addClass("btn");
        button.addClass("flex-column");
        button.addClass("historybutton");
        button.text(displayStorage[displayStorage.length - 1]);
        button.appendTo($(".leftcard"));
    }
}

function displayMain(weather) {
    var cityName = $("<h2>");
    var iconCode = weather.list[0].weather[0].id
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";

    if (mainWeather.text("")) {
        cityName.text(weather.city.name + " " + weather.list[0].dt_txt.substring(0, 10));
        cityName.attr("src", iconUrl);
        mainWeather.append(cityName);
        console.log(cityName);

        var cityTemp = $("<p>");
        cityTemp.text("Temp: " + (((weather.list[0].main.temp - 273.15) * 1.8) + 32).toFixed(2) + " °F");
        mainWeather.append(cityTemp);

        var cityWind = $("<p>");
        cityWind.text("Wind: " + ((weather.list[0].wind.speed) * 2.236936).toFixed(2) + " MPH");
        mainWeather.append(cityWind);

        var cityHumid = $("<p>");
        cityHumid.text("Humidity: " + weather.list[0].main.humidity + "%");
        mainWeather.append(cityHumid);
    }
}

// function displayForecast(weather) {

//     if (day1.text("")) {
//         var cityDate = $("<h3>");
//         cityDate.text(weather.list[i].dt_txt.substring(0, 10));
//         day1.append(cityDate);
//         var cityTemp = $("<p>");
//         cityTemp.text("Temp: " + (((weather.list[i].main.temp - 273.15) * 1.8) + 32).toFixed(2) + " °F");
//         day1.append(cityTemp);
//         var cityWind = $("<p>");
//         cityWind.text("Wind: " + ((weather.list[0].wind.speed) * 2.236936).toFixed(2) + " MPH");
//         day1.append(cityWind);
//         var cityHumid = $("<p>");
//         cityHumid.text("Humidity: " + weather.list[0].main.humidity + "%");
//         mainWeather.append(cityHumid);
//     } else if (day2.text("")) {

//     }
// }

var searchBtnHandler = function (event) {
    event.preventDefault();

    requestMain();
    storeHistory();
    displayHistory();
    requestForecast();

    mainWeather.text('');
    cityInput.val('');
};

var requestMain = function () {
    var cityInputVal = cityInput.val();
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInputVal + "&appid=c3724c60a3fb224ac5bc841e274c0689";

    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayMain(data);
                    console.log(data);
                });
            };
        });
}

var requestForecast = function () {
    var cityInputVal = cityInput.val();
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInputVal + "&exclude=hourly&appid=c3724c60a3fb224ac5bc841e274c0689";

    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // displayForecast(data);
                    console.log(data);
                });
            };
        });
}

userForm.submit(searchBtnHandler);



































// THEN display it as a button on the left section
// WHEN a button on the list is clicked
// THEN display weather API for that city on the right


    // var apiKey = "c3724c60a3fb224ac5bc841e274c0689";

    // var url = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=30.2672&lon=97.7431"
    // fetch(url)
    //     .then(function (response) {
    //         if (response.ok) {
    //             response.json().then(function (data) {
    //                 displayUVI(data);
    //                 console.log(data);
    //             });
    //         };
    //     });

    // var displayUVI = function (weath) {
    //     var cityUV = $("<p>");
    //     cityUV.text("UV Index: " + ((weath.value)));
    //     mainWeather.append(cityUV);
    // }