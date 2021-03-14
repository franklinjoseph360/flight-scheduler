const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const client_dir = path.join(__dirname, '../dist');
const output = path.join(client_dir, 'index.html');

var flights = require('./resources/flights.json')

app.use(express.static(client_dir));

app.get('/flights', (req, res) => {
  res.send(flights);
});

app.get('/', (req, res) => {
 res.sendFile(output);
});

app.listen(port, function () {
 console.log('Inflight Dublin Flights Schedule @: ' + port);
});