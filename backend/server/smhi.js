var SMHI = require("smhi-node"),
    latitude = 58.59, // Stockholm
    longitude = 16.18;

module.exports = function(req, res) {

    latitude = req.query['lat'] || latitude;
    longitude = req.query['lng'] || longitude;
    console.log('Got', latitude, longitude);
    SMHI.getForecastForLatAndLong(latitude, longitude).then(
        function(response) {
            var forecasts = response.getForecasts();
            var nextHour = forecasts[0];

            if (nextHour.getPrecipitationCategory() === SMHI.PrecipitationCategory.RAIN) {
                console.log("It will rain");

            } else {
                console.log("Yay, it won't rain!");

            }
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

};
