const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require("passport");
const cors = require('cors');
// set up express app
const port = process.env.PORT || 4000;
const app = express();

//
// var index = require('./views/index.ejs');


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});





app.set('view engine', 'ejs');
app.use(cors());
app.get('/', (req, res) => {
    res.render('index');
});
//
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["ghjjsujnasj"]
}));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.Promise = global.Promise;

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api/auth', require('./auth/AuthController'));
app.use('/api', require('./routes/api'));
// app.use('/', require('./routes/api'));

// error handling middleware
app.use(function (err, req, res, next) {
    res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(port, () => {
    console.log(`http://localhost:${port} Running`);
});
