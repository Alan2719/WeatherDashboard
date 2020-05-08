$(document).ready(function() {

//Variables
var city = "";
var currentDay = moment().format("MMM Do YYYY");
var lat = 0;
var lon = 0;

//Search Button
$("#searchBtn").on('click',function(event){
    event.preventDefault();
    city = $("#search").val();
    var row = $("<tr>");
    var cityName = $("<td>").html(city);
    row.html(cityName);
    $("tbody").append(row);
    searchCity();
})

//Render the qyeryURL link
function searchCity() {
    var apiKey = "ffecaf895550a5879fcebbee707b0654";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    console.log(queryURL);
    renderWeather(queryURL);
}

//Render the weather specifications
async function renderWeather(queryURL){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {  
        console.log(response);
        $("#cityName").text(response.name + ", " + response.sys.country + " " + "(" + currentDay + ")");
        $("#Temp").text("Temperature: " + (parseInt(response.main.temp)-273) + " °C");
        $("#Humidity").text("Humidity: " + response.main.humidity + " %");
        $("#WindSpeed").text("Wind speed: " + response.wind.speed + " m/s");

        lon = await(response.coord.lon);
        lat = await(response.coord.lat);
        console.log(lon);
        console.log(lat);
    })
    var queryURL2 = "https://samples.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=439d4b804bc8187953eb36d2a8c26a02"
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(UVvalue) {
        $("#UV").text(UVvalue.value);
    })
}

})