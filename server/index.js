
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
let apiRoutes = require("./routes");
require('./db')();

const client_dir = path.join(__dirname, '../dist');
const output = path.join(client_dir, 'index.html');

app.use(express.static(client_dir));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

app.get('/', (req, res) => {
 res.sendFile(output);
});

app.use('/api', apiRoutes)

app.listen(port, function () {
 console.log('Inflight Dublin Flights Schedule @: ' + port);
});