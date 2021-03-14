const Flight = require('../models/flight');
const shortid = require('shortid');

exports.getAll = function (req, res) {
    Flight.find({}, (err, flights) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        console.log('flights', JSON.stringify(flights))
        res.json({
            flights
        })
    })
}

exports.new = function (req, res) {
    if (req.body.flightCode && req.body.flightCode !== "") {
        const input = req.body;
        try {

            const arrival = input.scheduledArrival ? new Date(input.scheduledArrival) : false
            const departure = input.scheduledDeparture ? new Date(input.scheduledDeparture) : false

            var flight = new Flight();
            flight.id = shortid.generate();
            flight.flightCode = input.flightCode;
            flight.flightProvier = input.flightProvier;
            flight.sourcePortName = input.sourcePortName;
            flight.sourcePortCode = input.sourcePortCode;
            flight.destinationPortName = input.destinationPortName;
            flight.destinationPortCode = input.destinationPortCode;

            if(arrival) flight.scheduledArrival = arrival;
            if(departure) flight.scheduledDeparture = departure;

            flight.status = input.status;

            console.log("flight", flight)

            flight.save(function (err) {
                if (err) res.json(err);
                res.json({
                    message: 'Created Successfully!',
                    data: flight
                });
            });
        } catch(err) {
            res.send(err)
        }
    }
}