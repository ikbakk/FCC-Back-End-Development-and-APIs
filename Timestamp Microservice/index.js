// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/', function (req, res) {
  const currentTime = new Date();
  res.json({
    unix: currentTime.getTime(),
    utc: currentTime.toUTCString(),
  });
});


app.get('/api/:date_string', function (req, res) {
  const dateString = req.params.date_string;
  let date;

  if (!dateString) {
    // Empty date parameter, return current time
    date = new Date();
  } else {
    // Parse the date string
    date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Invalid Date
      res.json({ error: 'Invalid Date' });
      return;
    }
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

const port = process.env.PORT ? process.env.PORT : 3000

const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
