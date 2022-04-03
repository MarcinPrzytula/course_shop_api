const express = require('express');
const app = express();
const { port } = require('./config');
const apiRouter = require('./routes/api.js');
const bodyParser = require('body-parser');
const cors = require('cors');

// db
require('./db/mongoose');

//parsery
// Content-type: application/json
app.use(bodyParser.json());

//fix cors domeny rozne
const whitelist = [
  'https://marcinprzytula.github.io',
  'http://localhost:3001',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

//routes
app.use('/api/', apiRouter);

//server
app.listen(port, () => {
  console.log(
    `Serwer słucha... http://localhost:${port}`
  );
});
