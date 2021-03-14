//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var FlightsSchema = new Schema({
    "id": String,
    "flightCode": String,
    "flightProvider": String,
    "sourcePortName": String,
    "sourcePortCode": String,
    "destinationPortName": String,
    "destinationPortCode": String,
    "scheduledArrival": Date,
    "scheduledDeparture": Date,
    "status": {
        type: String,
        enum: ["LANDED", "ON SCHEDULE", "DELAYED"],
        default: "ON SCHEDULE"
    }
});

module.exports = mongoose.model('Flight', FlightsSchema);