let router = require('express').Router();
var FlightController = require('./controllers/flightController');

// api routes
router.route('/flights')
    .get(FlightController.getAll)
    .post(FlightController.new);

// router.route('/flights/:id')
//     .get(FlightController.view)
//     .patch(FlightController.update)
//     .put(FlightController.update)
//     .delete(FlightController.delete);

// Export API routes
module.exports = router;