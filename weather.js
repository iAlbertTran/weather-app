// Global variables to be shared between the first three functions, to avoid repetitive declarations
var weatherBox;
var weatherBoxWidth;
var dayBox;
var dayBoxWidth;
var totalDayBoxWidth;
var leftOverSpace;
var weatherCodes = [
    [23, 31, 32, 33, 34, 36],
    [29, 30],
    [26, 27, 28],
    [8, 9, 11, 12, 35, 40, 45, 47]];

var weatherPerCode = ["sun-01.png", "part-sun-01.png", "cloud-01.png", "rain-01.png"];

// startPos designates which day is the left most displayed box
// endPos designates which day is the right most displayed box
var startPos;
var endPos;
var mobilePos = 1;
var visibleBoxes;
var spaceBetween;

// Executed on load to get the positioning of the weather boxes equal

window.onload = window.onresize = function setUp() {
    startPos = 1;
    endPos = 5;
    mobilePos = 1;
    var winSize = window.innerWidth;
    if(winSize<= 480){
        mobileSetup();
        document.getElementById("arrowButtonUp").style.display = "none";
        document.getElementById("arrowButtonDown").style.display = "flex";
    }

    // gets the weatherBox div, and finds its width. Uses getBoundingClientRect because offsetWidth and clientWidth
    // both round to the nearest integer
    else{
        document.getElementById("leftArrow").classList.add("hide");
        document.getElementById("rightArrow").classList.remove("hide");
        document.getElementById("arrowButtonUp").style.display = "none";
        document.getElementById("arrowButtonDown").style.display = "none";
        if(winSize >= 1200){
            visibleBoxes = 5;
            spaceBetween = 4;
        }

        else if(winSize >= 968 && winSize < 1200){
            visibleBoxes = 4;
            spaceBetween = 3;
        }

        else if(winSize >= 728 && winSize < 968){
            visibleBoxes = 3;
            spaceBetween = 2;
        }
        else if(winSize >= 481 && winSize < 728){
            visibleBoxes = 2;
            spaceBetween = 3;
        }

        desktopSetup();
    }
};


function desktopSetup(){
    weatherBox = document.getElementById("weatherBox");
    weatherBoxWidth = weatherBox.getBoundingClientRect().width;


    // gets the width of a day1 div, since the width is identical for all 10 of them.
    // also finds and adds the paddingLeft size (in px) to dayBoxWidth to get total width of the box
    // paddingLeft multiplied by 2 because paddingRight is same amount.
    dayBox = document.getElementById("day1");
    dayBoxWidth = dayBox.getBoundingClientRect().width;


    // gets the total width of 5 day divs and determines the left over space in the weather box to be distributed
    // evenly between each displayed div. There are a total of 4 gaps between the divs.
    totalDayBoxWidth = dayBoxWidth * visibleBoxes;
    leftOverSpace = weatherBoxWidth - totalDayBoxWidth;

    leftOverSpace = leftOverSpace / spaceBetween;

    var pos = 0;

    if(visibleBoxes === 2){
        pos = leftOverSpace;
    }

    // for loop to set the left property of each of the first 5 days.
    // Starts at left: 0 and then increments by leftOverSpace
    for (var i = 0; i < 10; i++) {
        var dayByNum = document.getElementById("day" + (i + 1));
        dayByNum.style.left = pos + "px";
        dayByNum.style.top = 0;
        pos = pos + leftOverSpace;
    }
}
var mobileWeatherBox;
var mobileWeatherBoxHeight;
var mobileDayBox;
var mobileDayBoxHeight;
var mobileLeftOverSpace;

function mobileSetup(){
    mobileWeatherBox = document.getElementById("weatherBox");
    mobileWeatherBoxHeight = mobileWeatherBox.getBoundingClientRect().height;
    mobileDayBox = document.getElementById("day1");
    mobileDayBoxHeight = mobileDayBox.getBoundingClientRect().height;
    mobileLeftOverSpace = mobileWeatherBoxHeight - mobileDayBoxHeight;
    mobileLeftOverSpace = mobileLeftOverSpace/2;

    var pos = mobileLeftOverSpace;
    for (var i = 0; i < 10; i++) {
        var dayByNum = document.getElementById("day" + (i+1));
        dayByNum.style.top = pos + "px";
        dayByNum.style.left = 0;
        pos = pos + mobileLeftOverSpace;
    }

    document.getElementById("arrowButtonDown").style.display = "flex";
}

document.getElementById("arrowButtonRight").onclick = function(){

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
    for(var i = 1; i<11; ++i){
        var dayPos = parseFloat(document.getElementById("day" + i).style.left);
        dayPos -= pos;
        document.getElementById("day" + i).style.left = dayPos + "px";
    }
};





document.getElementById("arrowButtonLeft").onclick = function(){

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
    for(var i = 1; i<11; ++i){
        var dayPos = parseFloat(document.getElementById("day" + i).style.left);
        dayPos += pos;
        document.getElementById("day" + i).style.left = dayPos + "px";
    }
};

document.getElementById("arrowButtonDown").onclick = function(){

    //increments to keep track of which day is being displayed
    ++mobilePos;


    if(mobilePos === 10)
        document.getElementById("arrowButtonDown").style.display = "none";
    if(mobilePos !== 1)
        document.getElementById("arrowButtonUp").style.display = "flex";



    var pos = mobileLeftOverSpace + mobileDayBoxHeight;
    for(var i = 1; i<11; ++i){
        var dayPos = parseFloat(document.getElementById("day" + i).style.top);
        dayPos -= pos;
        document.getElementById("day" + i).style.top = dayPos + "px";
    }
};



document.getElementById("arrowButtonUp").onclick = function(){

    //increments to keep track of which day is being displayed
    --mobilePos;


    if(mobilePos !== 10)
        document.getElementById("arrowButtonDown").style.display = "flex";
    if(mobilePos === 1)
        document.getElementById("arrowButtonUp").style.display = "none";

    var pos = mobileLeftOverSpace + mobileDayBoxHeight;
    for(var i = 1; i<11; ++i){
        var dayPos = parseFloat(document.getElementById("day" + i).style.top);
        dayPos += pos;
        document.getElementById("day" + i).style.top = dayPos + "px";
    }
};
/**
 * Created by AlbertTMAC on 4/21/17.
 */
var allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


/* called when new weather arrives */
function callbackFunction(data) {
    if(data.query.results == null){
        alert("Location not found. Please try another one.");
        return;
    }
    setUpToday(data);
    setUpWeatherBox(data);

    if(window.innerWidth <= 480){
        mobileSetup();
        document.getElementById("arrowButtonUp").style.display = "none";
        document.getElementById("arrowButtonDown").style.display = "flex";
    }

    // gets the weatherBox div, and finds its width. Uses getBoundingClientRect because offsetWidth and clientWidth
    // both round to the nearest integer
    else{
        document.getElementById("leftArrow").classList.add("hide");
        document.getElementById("rightArrow").classList.remove("hide");
        document.getElementById("arrowButtonUp").style.display = "none";
        document.getElementById("arrowButtonDown").style.display = "none";
        desktopSetup();
    }

}

function setUpToday(data){

    var dateTime = data.query.results.channel.lastBuildDate;
    var dateTimeArr = dateTime.split(" ");
    var date = dateTimeArr.slice(1, 4);

    var time = dateTimeArr.slice(4,6);
    var timeArr = time[0].split("");
    if(timeArr[0] === '0'){
        timeArr.shift();
        time[0] = timeArr.join("");
    }
    document.getElementById("currTime").textContent = "Today " + time[0] + time[1].toLowerCase();

    var month = date[1];

    for(var j = 0; j < 12; ++j) {
        if (allMonths[j].indexOf(month) >= 0)
            month = allMonths[j];
    }

    document.getElementById("todaysDate").textContent = month + " " + date[0] + ", " + date[2];

    var location = data.query.results.channel.location;
    var curr = document.getElementById("currentLocation");
    curr.textContent = JSON.parse(JSON.stringify(location.city + ", " + location.region));


    document.getElementById("todaysTemp").textContent = data.query.results.channel.item.condition.temp;
    document.getElementById("todaysForecast").textContent = data.query.results.channel.item.condition.text;
    document.getElementById("wind").textContent = data.query.results.channel.wind.speed + "mph";
    document.getElementById("humidity").textContent = data.query.results.channel.atmosphere.humidity + "%";

    var forecast = data.query.results.channel.item.forecast;
    var code = forecast[0].code;

    for(var a = 0; a < 4; ++a){
        for(var b = 0; b < weatherCodes[a].length ; ++b){
            if (code == weatherCodes[a][b])
                var correspondingWeather = a;
        }
    }
    var todayIcon = document.getElementById("todaysWeather");

    if(todayIcon.childElementCount > 0){
        var todaysImg = document.getElementById("todaysImg");
        todaysImg.src = "Assets/" + weatherPerCode[correspondingWeather];
    }
    else {
        var img = document.createElement('img');
        img.src = "Assets/" + weatherPerCode[correspondingWeather];
        img.id = "todaysImg";
        document.getElementById("todaysWeather").appendChild(img);
    }
}


function setUpWeatherBox(data){
    // Month array used to get the full name from an abbreviation
    // Extracts the forecast information needed from data
    var forecast = data.query.results.channel.item.forecast;


    // Finds what the location the weather is for, then places it in the header

    //loops through to fill in the HTML based on the day
    for (var i = 1; i < 11; ++i) {

        // Designates which "day" div we're dealing with in the HTML
        var day = document.getElementById("date" + i);
        var weather = document.getElementById("weather" + i);
        var high = document.getElementById("high" + i);
        var low = document.getElementById("low" + i);

        day.textContent = forecast[i-1].day;
        weather.textContent = forecast[i - 1].text;
        high.textContent = forecast[i - 1].high;
        low.textContent = forecast[i - 1].low;


        var code = forecast[i-1].code;

        for(var a = 0; a < 4; ++a){
            for(var b = 0; b < weatherCodes[a].length ; ++b){
                if (code == weatherCodes[a][b])
                    var correspondingWeather = a;
            }
        }

        var dayIcon = document.getElementById("icon" + i);

        if(dayIcon.childElementCount > 0){
            var iconImg = document.getElementById("img" + i)
            iconImg.src = "Assets/" + weatherPerCode[correspondingWeather];
        }
        else {
            var img = document.createElement('img');
            img.src = "Assets/" + weatherPerCode[correspondingWeather];
            img.id = "img" + i;
            document.getElementById("icon" + i).appendChild(img);
        }
    }
}


function gotNewPlace() {
    // get what the user put into the textbox
    var newPlace = document.getElementById("userInput").value;

    // make a new script element
    var script = document.createElement('script');

    // start making the complicated URL
    script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+newPlace+"')&format=json&callback=callbackFunction"
    script.id = "APILink";

    // remove old script
    var oldScript = document.getElementById("APIlink");
    if (oldScript != null) {
        document.body.removeChild(oldScript);
    }

    // put new script into DOM at bottom of body
    document.body.appendChild(script);
}