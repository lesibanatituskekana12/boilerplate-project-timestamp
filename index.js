// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp Microservice API Endpoint
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Check if date is provided and parse accordingly
  if (!dateParam) {
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // If dateParam is a number, treat it as a UNIX timestamp
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise, treat it as a string
    date = new Date(dateParam);
  }

  // Check if the date is valid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return both UNIX and UTC time
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
