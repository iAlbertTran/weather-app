// Global variables to be shared between the functions, to avoid repetitive declarations
var weatherBox;
var weatherBoxWidth;
var dayBox;
var dayBoxWidth;
var totalDayBoxWidth;
var leftOverSpace;
var weatherCodes = [                            // Weather codes based on Yahoo's API documentation
    [23, 31, 32, 33, 34, 36],
    [29, 30, 44],
    [26, 27, 28],
    [6, 8, 9, 10, 11, 12, 35, 40],
    [0, 1, 2, 3, 4, 37, 38, 39, 45, 47],
    [5, 7, 13, 14, 15, 16, 41, 42, 43, 46]];

var weatherPerCode = ["sunny.png", "part-sun.png", "cloudy.png", "rain.png", "thunder.png", "snow.png"];

// startPos designates which day is the left most displayed box
// endPos designates which day is the right most displayed box
// mobilePos designates the day currently being displayed
var startPos;
var endPos;
var mobilePos = 1;

// used to determine how many boxes should be displayed based on window size, and the number of spaces between them
var visibleBoxes;
var spaceBetween;
var firstLoad = true;
// Excuted on load and on resize
// Gets the window width and executes either the desktop setup or mobile setup up based on its size. Declares how
// many boxes should be displayed and the number of spaces between them
window.onload = window.onresize = function setUp() {
   if(firstLoad){
    initialQuery();
    firstLoad = false;
   }
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
			startPos = 1;
			endPos = 5;
            visibleBoxes = 5;
            spaceBetween = 4;
        }

        else if(winSize >= 968 && winSize < 1200){
			startPos = 1;
			endPos = 4;
            visibleBoxes = 4;
            spaceBetween = 3;
        }

        else if(winSize >= 728 && winSize < 968){
			startPos = 1;
			endPos = 3;
            visibleBoxes = 3;
            spaceBetween = 2;
        }
        else if(winSize >= 481 && winSize < 728){
			startPos = 1;
			endPos = 2;
            visibleBoxes = 2;
            spaceBetween = 3;
        }

        desktopSetup();
    }
};

function initialQuery(){
    var url = "http://localhost:3000/query?op=weather&location=sunnyvale,ca";

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", url);

    oReq.send();

    // becomes method of request object oReq
    function reqListener () {
        console.log(oReq.responseText);
        var j = JSON.parse(oReq.responseText);
        callbackFunction(j);
    }
}


function desktopSetup(){
    weatherBox = document.getElementById("weatherBox");
    weatherBoxWidth = weatherBox.getBoundingClientRect().width;


    // gets the width of a day1 div, since the width is identical for all 10 of them.
    // also finds and adds the paddingLeft size (in px) to dayBoxWidth to get total width of the box
    // paddingLeft multiplied by 2 because paddingRight is same amount.
    dayBox = document.getElementById("day1");
    dayBoxWidth = dayBox.getBoundingClientRect().width;


    // gets the total width of the number of visible boxes and determines the left over space in the weather box to be distributed
    // evenly between each displayed div. There are a total of "spaceBetween" gaps between each div.
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



//variables for the mobileSetup
var mobileWeatherBox;
var mobileWeatherBoxHeight;
var mobileDayBox;
var mobileDayBoxHeight;
var mobileLeftOverSpace;


//does all the same things as desktop setup, except the carousel is setup vertically.
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



// next four functions implements the responsiveness of the arrows
// left and right on desktop setup
// up and down on mobile setup
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

    // if the display is day 10, hides the down arrow, if it is not showing day 1, show the up arrow
    if(mobilePos === 10)
        document.getElementById("arrowButtonDown").style.display = "none";
    if(mobilePos !== 1)
        document.getElementById("arrowButtonUp").style.display = "flex";


    // calculates how to evenly transition the boxes.
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

    // if day 10 isnt showing, show the down arrow, if day 1 is showing, hide the up arrow
    if(mobilePos !== 10)
        document.getElementById("arrowButtonDown").style.display = "flex";
    if(mobilePos === 1)
        document.getElementById("arrowButtonUp").style.display = "none";


    // calculate how to evenly transition the boxes.
    var pos = mobileLeftOverSpace + mobileDayBoxHeight;
    for(var i = 1; i<11; ++i){
        var dayPos = parseFloat(document.getElementById("day" + i).style.top);
        dayPos += pos;
        document.getElementById("day" + i).style.top = dayPos + "px";
    }
};


// used to get the full name of a month, which is abbreviated in Yahoo's weather API
var allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


/* called when new weather arrives */
// sets up all the boxes and places the information in the correct places.
function callbackFunction(data) {

    // if Yahoo's API returns null, the location doesn't exist or is too broad so it fires off an alert message
    if(data == null){
        alert("Location not found, or too broad. Please try another one.");
        return;
    }


    setUpToday(data);
    setUpWeatherBox(data);


    //same thing as what the setup function above does, so it also does it when a new location is inputted
    if(window.innerWidth <= 480){
        mobileSetup();
        document.getElementById("arrowButtonUp").style.display = "none";
        document.getElementById("arrowButtonDown").style.display = "flex";
    }

    else{
        document.getElementById("leftArrow").classList.add("hide");
        document.getElementById("rightArrow").classList.remove("hide");
        document.getElementById("arrowButtonUp").style.display = "none";
        document.getElementById("arrowButtonDown").style.display = "none";
        desktopSetup();
    }

}


//sets up all the information for the current date
function setUpToday(data){

    // takes the date and parses it to extract the time, and date.
    var unixToDate = new Date(data.current_observation.pubDate * 1000).toString();
    console.log(unixToDate);
    var dateTime = unixToDate;
    var dateTimeArr = dateTime.split(" ");
    var date = dateTimeArr.slice(1, 4);
    var time = dateTimeArr.slice(4,6);
    var timeArr = time[0].split("");

    


    // removes any leading zeros in the time
    if(timeArr[0] === '0'){
        timeArr.shift();
        time[0] = timeArr.join("");
    }


    document.getElementById("currTime").textContent = "Today " + time[0] + time[1].toLowerCase();

    var month = date[1];


    // finds the full name of the month based on abbreviation
    for(var j = 0; j < 12; ++j) {
        if (allMonths[j].indexOf(month) >= 0)
            month = allMonths[j];
    }

    document.getElementById("todaysDate").textContent = month + " " + date[0] + ", " + date[2];


    // finds the location the information is for
    var location = data.query.results.channel.location;
    var curr = document.getElementById("currentLocation");
    curr.textContent = JSON.parse(JSON.stringify(location.city + ", " + location.region));


    document.getElementById("todaysTemp").textContent = data.query.results.channel.item.condition.temp;
    document.getElementById("todaysForecast").textContent = data.query.results.channel.item.condition.text;
    document.getElementById("wind").textContent = data.query.results.channel.wind.speed + "mph";
    document.getElementById("humidity").textContent = data.query.results.channel.atmosphere.humidity + "%";

    var forecast = data.query.results.channel.item.forecast;
    var code = forecast[0].code;


    // uses the weather code to find the corresponding weather icon to be used
    for(var a = 0; a < weatherCodes.length; ++a){
        for(var b = 0; b < weatherCodes[a].length ; ++b){
            if (code == weatherCodes[a][b])
                var correspondingWeather = a;
        }
    }
    var todayIcon = document.getElementById("todaysWeather");


    // if there exists an icon already, merely replaces the src
    if(todayIcon.childElementCount > 0){
        var todaysImg = document.getElementById("todaysImg");
        todaysImg.src = "WeatherApp%203/" + weatherPerCode[correspondingWeather];
    }

    //if not, creates an img element and inserts the image into the html
    else {
        var img = document.createElement('img');
        img.src = "WeatherApp%203/" + weatherPerCode[correspondingWeather];
        img.id = "todaysImg";
        img.alt = "A weather icon";
        document.getElementById("todaysWeather").appendChild(img);
    }
}



// sets up the 10 day forecast's information
function setUpWeatherBox(data){
    startPos = 1;
    endPos = 5;
    mobilePos = 1;

    // Extracts the forecast information needed from data
    var forecast = data.query.results.channel.item.forecast;


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

        for(var a = 0; a < weatherCodes.length ; ++a){
            for(var b = 0; b < weatherCodes[a].length ; ++b){
                if (code == weatherCodes[a][b])
                    var correspondingWeather = a;
            }
        }

        var dayIcon = document.getElementById("icon" + i);


        // same as above for filling in the correct weather icon
        if(dayIcon.childElementCount > 0){
            var iconImg = document.getElementById("img" + i)
            iconImg.src = "WeatherApp%203/" + weatherPerCode[correspondingWeather];
        }
        else {
            var img = document.createElement('img');
            img.src = "WeatherApp%203/" + weatherPerCode[correspondingWeather];
            img.id = "img" + i;
            img.alt = "A weather icon";
            document.getElementById("icon" + i).appendChild(img);
        }
    }
}



// function used to create a new script and fires off the callback when a new location is searched. Taken from
// professor amenta's example weather app javascript file
function gotNewPlace() {
    // get what the user put into the textbox
    var newPlace = document.getElementById("userInput").value;

    // make a new script element
    var script = document.createElement('script');

    // start making the complicated URL
    script.src = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text='"+newPlace+"')&format=json&callback=callbackFunction"
    script.id = "APILink";

    // remove old script
    var oldScript = document.getElementById("APIlink");
    if (oldScript != null) {
        document.body.removeChild(oldScript);
    }

    // put new script into DOM at bottom of body
    document.body.appendChild(script);
}