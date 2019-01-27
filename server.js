const express = require('express');
const app = express();
const port = 5000;
var querystring = require('querystring');
var OAuth = require('oauth');
var header = {
    "Yahoo-App-Id": "r7sygV32"
};
var request = new OAuth.OAuth(
    null,
    null,
    'dj0yJmk9VTFZNEIzdTVwRWFYJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTk1',
    '4f58bd57c354beff570995e6b6e39c0d9c79ac52',
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
);


app.use(express.static('public'));


app.get('/query', function (request, response){
    console.log("query");
    query = request.url.split("?")[1]; // get query string
    if (query) {
	answer(query, response);
    } else {
	sendCode(400,response,'query not recognized');
    }
});


app.listen(port);



function answer(query, response) {
    var queryObj = querystring.parse(query);
    console.log(queryObj.op);
    // op=load
    if(queryObj.op == "weather") {

        request.get(
            `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${queryObj.location}&format=json`,
            null,
            null,
            function (err, data, result) {
                if (err) {
                    console.log(err);
                } else {
                }

                response.status(200);
                response.type("application/json");
                response.send(data);
            }
        );

    }
}
