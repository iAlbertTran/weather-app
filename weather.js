

/* called when new weather arrives */

function callbackFunction(data) {
    //Extracts the forecast information needed from the data
    var forecast = data.query.results.channel.item.forecast;

    //Finds what the location the weather is for, then places it in the header
    var location = data.query.results.channel.location;
    var curr = document.getElementById("currentLocation");
    curr.textContent = JSON.parse(JSON.stringify(location.city + ", " + location.region));


    //loops through to fill in the HTML based on the day
    for (var i = 1; i < 11; ++i) {

        //Designates which "day" div we're dealing with in the HTML
        var day = document.getElementById("date" + i);
        var weather = document.getElementById("weather" + i);
        var temperature = document.getElementById("temp" + i);

        //Takes the date and removes the year, then reverses the format from day month to month day
        var dateArr = forecast[i - 1].date.split(" ");
        dateArr = dateArr.slice(0, 2);
        var date = dateArr.pop();
        date = date + " " + dateArr.shift();

        //JSON.parse to remove quotes around the JSON String.
        day.textContent = JSON.parse(JSON.stringify(date));
        weather.textContent = JSON.parse(JSON.stringify(forecast[i - 1].text));
        temperature.textContent = JSON.parse(JSON.stringify(forecast[i - 1].high));
    }
}

//counters to keep track of what days are being shown.
var pos = 1;
var backpos = 5;

//Function for when the right arrow is clicked
document.getElementById("rightArrow").onclick = function(){
    //increment pos and backpos to maintain what days are being shown
    pos += 1;
    backpos += 1;

    //if the pos is not 1 (the first day of the 10-day forecast), show the left arrow
    if(pos !== 1){
        var leftButton = document.getElementById("leftArrow").classList;
        leftButton.remove("hide");
    }
    //if the backpos is 10 (the last day of the 10-day forecast), hide the right arrow
    if(backpos === 10){
        var rightButton = document.getElementById("rightArrow").classList;
        rightButton.add("hide");
    }

    var hideDay = document.getElementById("day" + (pos-1)).classList;
    hideDay.add("hide");

    var showDay = document.getElementById("day" + backpos).classList;
    showDay.remove("hide");
};

document.getElementById("leftArrow").onclick = function(){
    pos -= 1;
    backpos -= 1;
    if(backpos !== 11){
        var rightButton = document.getElementById("rightArrow").classList;
        rightButton.remove("hide");
    }

    if(pos === 1){
        var leftButton = document.getElementById("leftArrow").classList;
        leftButton.add("hide");
    }

    var hideDay = document.getElementById("day" + (backpos+1)).classList;
    hideDay.add("hide");

    var showDay = document.getElementById("day" + pos).classList;
    showDay.remove("hide");
};


function myFunction() {
    document.getElementById("frm1").submit();
};


