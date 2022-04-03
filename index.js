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

//fix cord domeny rozne
app.use(cors());

//routes
app.use('/api/', apiRouter);

//server
app.listen(port, () => {
  console.log(
    `Serwer słucha... http://localhost:${port}`
  );
});
