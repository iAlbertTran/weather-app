// Global variables to be shared between the first three functions, to avoid repetitive declarations
// Math.round() has been used on each of these variables to maintain consistency when changing the left style property
// of each div apart of class day.
var weatherBox;
var weatherBoxWidth;
var dayBox;
var dayBoxWidth;
var totalDayBoxWidth;
var leftOverSpace;

// startPos designates which day is the left most displayed box
// endPos designates which day is the right most displayed box
var startPos = 1;
var endPos = 5;

// Executed on load to get the positioning of the weather boxes equal
function init() {
    // gets the weatherBox div, and finds its width
    weatherBox = document.getElementById("weatherBox");
    weatherBoxWidth = weatherBox.clientWidth;

    // gets the width of a single div for a single day. Used day 1 since all of the divs should be equal width inside
    // the weather box
    dayBox = document.getElementById("day1");
    dayBoxWidth = Math.round(dayBox.offsetWidth);

    // gets the total width of 5 day divs and determines the left over space in the weather box to be distributed
    // evenly between each displayed div. There are a total of 4 gaps between the divs.
    totalDayBoxWidth = Math.round(dayBox.offsetWidth * 5);
    leftOverSpace = Math.round(weatherBoxWidth - totalDayBoxWidth);
    leftOverSpace = Math.round(leftOverSpace/6);

    var pos = leftOverSpace;

    // for loop to set the left property of each of the first 5 days.
    // Starts at left: 0 and then increments by leftOverSpace
    for (var i = 0; i < 10; i++) {
        var dayByNum = document.getElementById("day" + (i+1));
        dayByNum.style.left = pos + "px";
        pos = Math.round(pos + leftOverSpace);
    }
}

document.getElementById("rightArrow").onclick = function(){

    //increments to keep track of which days are being displayed
    ++startPos;
    ++endPos;

    // the left arrow will appear if the first day is not being displayed
    if(startPos !== 1){
        var leftButton = document.getElementById("leftArrow").classList;
        leftButton.remove("hide");
    }

    // the right arrow will disappear if the tenth day is being displayed
    if(endPos === 10){
        var rightButton = document.getElementById("rightArrow").classList;
        rightButton.add("hide");
    }


    // for loop to simulate smooth scrolling right. each day will take the position of the day prior, where the left most
    // day will be hidden and the first hidden day on the right will now be displayed
    var pos = leftOverSpace + dayBoxWidth;
    for(var i = 0; i<10; ++i){
        var dayPos = parseInt(document.getElementById("day" + (i+1)).style.left);
        dayPos = Math.round(dayPos - pos);
        document.getElementById("day" + (i+1)).style.left = dayPos + "px";
    }
};

document.getElementById("leftArrow").onclick = function(){

    // decrements to keep track of which days are being displayed
    --startPos;
    --endPos;

    // left button will be hidden if the first day is being displayed
    if(startPos === 1){
        var leftButton = document.getElementById("leftArrow").classList;
        leftButton.add("hide");
    }

    // right button will be shown if the tenth day is not being displayed
    if(endPos !== 10){
        var rightButton = document.getElementById("rightArrow").classList;
        rightButton.remove("hide");
    }

    // for loop to simulate smooth scrolling left. each day will take the position of the next day. The first hidden day
    // on the left will be displayed and the last displayed day on the right will be hidden.
    var pos = leftOverSpace + dayBoxWidth;
    for(var i = 0; i<10; ++i){
        var dayPos = parseInt(document.getElementById("day" + (i+1)).style.left);
        dayPos = Math.round(dayPos + pos);
        document.getElementById("day" + (i+1)).style.left = dayPos + "px";
    }
};



/* called when new weather arrives */
function callbackFunction(data) {

    // Month array used to get the full name from an abbreviation
    var allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Extracts the forecast information needed from data
    var forecast = data.query.results.channel.item.forecast;

    // Finds what the location the weather is for, then places it in the header
    var location = data.query.results.channel.location;
    var curr = document.getElementById("currentLocation");
    curr.textContent = JSON.parse(JSON.stringify(location.city + ", " + location.region));


    //loops through to fill in the HTML based on the day
    for (var i = 1; i < 11; ++i) {

        // Designates which "day" div we're dealing with in the HTML
        var day = document.getElementById("date" + i);
        var weather = document.getElementById("weather" + i);
        var temperature = document.getElementById("temp" + i);

        // splits the date into an array by white space
        var dateArr = forecast[i - 1].date.split(" ");

        // based on Yahoo's documentation, the day will be the first element
        // and the month will be the second element in the dateArr
        var dayOfMonth = dateArr[0];
        var month = dateArr[1];

        // A for loop to match the abbreviated month to the full name of the month in order to replace the abbreviation
        // with the full name.
        for(var j = 0; j < 12; ++j){
            if(allMonths[j].indexOf(month) >= 0)
                month = allMonths[j];
        }


        day.textContent = month + " " + dayOfMonth;
        weather.textContent = forecast[i - 1].text;
        temperature.textContent = forecast[i - 1].high;
    }
}