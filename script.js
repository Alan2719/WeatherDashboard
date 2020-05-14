$(document).ready(function() {

//Variables
var currentDay = moment().format("MMM Do YYYY");
var apiKey = "ffecaf895550a5879fcebbee707b0654";
var citiesArray = [];
var currentIndex = localStorage.length;


//Search Button
$("#searchBtn").on('click',function(event){
    event.preventDefault();
    var cityInput = $("#search").val();
    var cityName = $("<li>").html(cityInput);
    cityName.on('click',function(event){
        event.preventDefault();
        var city = $(this).text(); 
        console.log(city)
        searchCity(city);
    })
    $("#citylist").append(cityName);
    citiesArray.push(cityInput);
    //localStorage.setItem('citiesArray',JSON.stringify(citiesArray));
    localStorage.setItem(currentIndex,cityInput);
    var divide = $("<hr>");
    $("citylist").append(divide);
    searchCity(cityInput);
})


//Render the qyeryURL link
function searchCity(citySearch) {
    console.log(citySearch);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + apiKey;
    console.log(queryURL);
    renderWeather(queryURL,citySearch);
}

//Render the weather specifications
function renderWeather(queryURL,newCity){
    currentIndex += 1;
    //var queryURL = "https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/uvi/forecast?lat=32.53&lon=-117.02&appid=439d4b804bc8187953eb36d2a8c26a02"
    //console.log(localStorage.getItem(city));
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) { 
        var image = response.weather[0].icon;
        var imgURL = "https://openweathermap.org/img/w/" + image + ".png";
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
            var uvIndex = UVvalue.value;
            $("#uv-text").text("UV Index: " + uvIndex);
            if (uvIndex >= 3.0 && uvIndex <= 5.0) {
                $("#UV").addClass("yellow");
            } else if (uvIndex >= 6.0 && uvIndex <= 7.0) {
                $("#UV").addClass("orange");
            } else if (uvIndex >= 8.0 && uvIndex <= 10.0) {
                $("#UV").addClass("red");
            } else if (uvIndex >= 11.0) {
                $("#UV").addClass("magenta");
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

//Version final js