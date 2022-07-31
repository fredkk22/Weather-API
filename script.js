var title = $("h1");
var cityLabel = $(".citylabel");
var searchBtn = $(".searchbtn");
var cityInput = $(".cityinput");
var mainWeather = $(".mainweather");

cityLabel.text("Search for a City:");

title.text("Weather Dashboard");

searchBtn.text("Search");
var cityInputVal = "Austin";

// function storeHistory(event) {

//     var element = event.target;
//     // IF the button is clicked
//     if (element.matches(searchBtn)) {
//         // THEN store the input field value in local storage
//         var allCityInput = [];

//         allCityInput = allCityInput.concat(cityInputVal);
//         localStorage.setItem("City Search History", JSON.stringify(allCityInput));
//         console.log(allCityInput);
//     }

// }

// var test = $(".test");

// test.text("WATAHETIUAWGHAIWRGWRKI")

function requestUrl() {


    var apiKey = "c3724c60a3fb224ac5bc841e274c0689";

    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputVal + "&appid=" + apiKey
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // displayMain(data);
                    console.log(data);
                });
            };
        });
};

// var displayMain = function (weather) {
//     var cityName = $("<h2>");
//     var iconCode = weather.list[0].weather[0].id
//     var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
//     cityName.text(weather.city.name + " " + weather.list[0].dt_txt.substring(0, 10));
//     cityName.attr("src", iconUrl);
//     mainWeather.append(cityName);
//     console.log(cityName);


//     var cityTemp = $("<p>");
//     cityTemp.text("Temp: " + (((weather.list[0].main.temp-273.15)*1.8)+32).toFixed(2) + " °F");
//     mainWeather.append(cityTemp);

//     var cityWind = $("<p>");
//     cityWind.text("Wind: " + ((weather.list[0].wind.speed)*2.236936).toFixed(2) + " MPH");
//     mainWeather.append(cityWind);

//     var cityHumid = $("<p>");
//     cityHumid.text("Humidity: " + weather.list[0].main.humidity + "%");
//     mainWeather.append(cityHumid);

//     // var cityUV = $("<p>");
//     // cityUV.text("UV Index: " + weather.list[0].main. + "%");
//     // mainWeather.append(cityHumid);

// }





searchBtn.on("click", requestUrl());


// THEN display it as a button on the left section
// WHEN a button on the list is clicked
// THEN display weather API for that city on the right
