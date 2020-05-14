var uvIndex = 6;
var indexCont = $("<div>");
var cont = indexCont.text(uvIndex);
$("#UV").append(cont);

if (uvIndex >= 3 && uvIndex <= 5) {
    indexCont.addClass("yellow");
} else if (uvIndex >= 6 && uvIndex <= 7) {
    indexCont.addClass("orange");
} else if (uvIndex >= 8 && uvIndex <= 10) {
    indexCont.addClass("red");
    console.log("HI");
} else if (uvIndex >= 11) {
    indexCont.addClass("magenta");
}