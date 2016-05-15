var SMHI = require("smhi-node"),
    latitude = 58.59, // Stockholm
    longitude = 16.18;

var cache = {};

module.exports = function(req, res) {

    latitude = req.query['lat'] || latitude;
    longitude = req.query['lng'] || longitude;

    if(cache['' + latitude + longitude]) {
        res.json(cache[latitude + longitude]);
        res.status(200);
        res.end();
    } else {
        SMHI.getForecastForLatAndLong(latitude, longitude).then(
            function(response) {
                var forecasts = response.getForecasts();
                var nextHour = forecasts[0];

                if (nextHour.getPrecipitationCategory() === SMHI.PrecipitationCategory.RAIN) {

                } else {

                }
                cache['' + latitude + longitude] = response;
                res.json(response);
                res.status(200);
                res.end();
            },
            function(error) {
                console.log("I didn't manage to find out, sorry.", error);
                res.status(404);
                res.end();

            }
        );
    }

};
