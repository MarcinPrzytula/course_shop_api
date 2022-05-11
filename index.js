require('./db/mongoose');

const { database, port } = require('./config');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(
  session
);
const bodyParser = require('body-parser');

const apiRouter = require('./routes/apiRoutes.js');
const app = express();

app.use(bodyParser.json());

app.set('trust proxy', 1);

// app.use(cookieParser());

app.use(cookieParser('secretcode'));

let cookie = null;

if (database) {
  cookie = {
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    sameSite: 'none',
  };
}
app.use(
  session({
    secret: 'secretcode',
    store: new MongoStore({
      uri: database,
      collection: 'mySessions',
    }),
    cookie,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

//fix cors
const whitelist = [
  'https://marcinprzytula.github.io',
  'http://localhost:3000',
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

//routes
app.use('/api/', apiRouter);

//server
app.listen(port, () => {
  console.log(`Server listen... port:${port}`);
});
