let router = require('express').Router();
var FlightController = require('./controllers/flightController');

// api routes
router.route('/flights')
    .get(FlightController.getAll)
    .post(FlightController.new);

router.route('/flights/:id')
    .get(FlightController.view)
    .put(FlightController.update)
    .delete(FlightController.delete);

module.exports = router;