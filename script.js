$(document).ready(function() {

//Variables
var city = "";
var currentDay = moment().format("MMM Do YYYY");
var apiKey = "ffecaf895550a5879fcebbee707b0654";
var currentIndex = localStorage.length;
console.log(currentIndex);

//Search Button
$("#searchBtn").on('click',function(event){
    event.preventDefault();
    city = $("#search").val();
    var row = $("<tr>");
    var cityName = $("<td>").html(localStorage.getItem(city));
    row.html(cityName);
    $("tbody").append(row);
    searchCity();
})

//Render the qyeryURL link
function searchCity() {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    console.log(queryURL);
    renderWeather(queryURL);
}

//Render the weather specifications
function renderWeather(queryURL){
    currentIndex += 1;
    localStorage.setItem(currentIndex,city);
    //var queryURL = "https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/uvi/forecast?lat=32.53&lon=-117.02&appid=439d4b804bc8187953eb36d2a8c26a02"
    console.log(localStorage.getItem(city));
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) { 
        var image = response.weather[0].icon;
        var imgURL = "http://openweathermap.org/img/w/" + image + ".png";
        //console.log(response);
        $("#cityName").text(response.name + ", " + response.sys.country + " " + "(" + currentDay + ")");
        $("#icon").attr("src",imgURL);
        $("#Temp").text("Temperature: " + (parseInt(response.main.temp)-273) + " °C");
        $("#Humidity").text("Humidity: " + response.main.humidity + " %");
        $("#WindSpeed").text("Wind speed: " + response.wind.speed + " m/s");

        var lon = (response.coord.lon);
        var lat = (response.coord.lat);
        //console.log(lon);
        //console.log(lat);
        var queryURL2 = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
        console.log(queryURL2);
        $.ajax({
            url: queryURL2,
            dataType: "json",
            type: "GET"
        }).then(function(UVvalue) {
            var indexCont = $("<div>");
            $("#UV").text("UV Index: " + UVvalue.value);
            indexCont.append(UVvalue.value);
            if (UVvalue.value >= 3 || UVvalue.value <= 5) {
                indexCont.css("background-color","yellow");
            } else if (UVvalue.value >= 6 || UVvalue.value <= 7) {
                indexCont.css("background-color","orange");
            } else if (UVvalue.value >= 8 || UVvalue.value <= 10) {
                indexCont.css("background-color","red");
            } else if (UVvalue.value >= 11) {
                indexCont.css("background-color","rgb(255, 0, 242)");
            }
        })
        var queryURL3 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly&appid=" + apiKey;
        //console.log(queryURL3);
        $.ajax({
            url: queryURL3,
            dataType: "json",
            type: "GET"
        }).then(function(forecast) {
            console.log(forecast);
            var iconForecast = "";
            var iconForecastURL = "";
            for (var i = 0; i < 6; i++) {
                var month = moment().format('MMMM');
                var day = parseInt(moment().format('Do'));
                var year = moment().format('YYYY');
                $("#date" + [i]).text(day + i + "/" + month + "/" + year);
                iconForecast = forecast.daily[i].weather[0].icon;
                iconForecastURL = "http://openweathermap.org/img/w/" + iconForecast + ".png";
                $("#date" + [i]).text();
                $("#icon" + [i]).attr("src",iconForecastURL);
                $("#Temp" + [i]).text("Temperature: " + (parseInt(forecast.daily[i].temp.max)-273) + " °C");
                $("#Humidity" + [i]).text("Humidity: " + forecast.daily[i].humidity + " %");
            }
        })
    })

}

})