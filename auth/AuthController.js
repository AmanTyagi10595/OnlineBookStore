var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const MyNinja = require('../models/ninja.js');
var OTPgene = MyNinja.OTP;
var Register = MyNinja.register;
var Ninja = MyNinja.Ninja;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var verifyToken = require('./VerifyToken');

//JWT based authentication Registration
router.post('/register', function (req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  Register.create({
    name: req.body.name,
    emailId: req.body.email,
    password: hashedPassword
  },
    function (err, user) {
      if (err) return res.status(500).send({ msg: "Already registered" });
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token, msg: "User registed successfully" });
    });
});
//getting Id from JWT token
router.get('/me', verifyToken, function (req, res, next) {

  Register.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("User not registered.");

    res.status(200).send(user);
  });

});
//JWT authentication based login
router.post('/login', function (req, res) {
  Register.findOne({ emailId: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server');
    if (!user) return res.status(404).send({ msg: 'No user found' });

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, msg: "wrong password" });

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token, user });
  });
  // res.send({ msg: "Login Api worked by req from angular" });
});
//Logout to destroy or null the token present in the browser's cookies
router.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;