require('./db/mongoose');
const DB =
  'mongodb+srv://<username>:<password>@cluster0.0ywy7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
console.log(DB);
const { database, port } = require('./config');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
// const session = require('cookie-session');
// const MongoStore = require('connect-mongo');
const MongoStore = require('connect-mongodb-session')(
  session
);
const bodyParser = require('body-parser');

const apiRouter = require('./routes/apiRoutes.js');
const app = express();

app.use(bodyParser.json()); // parser - Content-type: application/json

app.use(
  session({
    // store: new MongoStore({
    //   mongoUrl: DB,
    // }),
    secret: 'secretcode',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

//fix cors
const whitelist = [
  'https://marcinprzytula.github.io',
  'http://localhost:3000',
  'https://shrouded-temple-52756.herokuapp.com/',
  '91.150.165.38',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// var corsOptionsDelegate = function (
//   req,
//   callback
// ) {
//   const corsOptions = {
//     methods: [
//       'GET',
//       'PUT',
//       'POST',
//       'DELETE',
//       'HEAD',
//       'PATCH',
//     ],
//     allowedHeaders: [
//       'Content-Type',
//       'Authorization',
//     ],
//     credentials: true,
//   };

//   const myIpAddress =
//     req.connection.remoteAddress; // This is where you get the IP address from the request
//   if (
//     whitelist.indexOf(myIpAddress) !== -1 ||
//     whitelist.indexOf(req.header('Origin') !== -1)
//   ) {
//     corsOptions.origin = true;
//   } else {
//     corsOptions.origin = false;
//   }
//   callback(null, corsOptions);
// };

// app.use(cors(corsOptionsDelegate));

//routes
app.use('/api/', apiRouter);

//server
app.listen(port, () => {
  console.log(`Server listen... http://localhost:${port}`);
});
