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
var multer = require('multer');
var fs = require('fs');


//************FOr upload image********** */
var path = require('path');
var s = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/files/'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const u = multer({
  storage: s
});
//*****JWT based authentication Registration**********
router.post('/register', u.single('myFile'), function (req, res) {
  // Define a JSONobject for the image attributes for saving to database
  console.log(req.file);
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString('base64');
  var finalImg = {
    contentType: req.file.mimetype,
    image: new Buffer.from(encode_image, 'base64')
  };
  let data = JSON.parse(req.body.data);
  var hashedPassword = bcrypt.hashSync(data.psw, 8);

  Register.create({
    name: data.name,
    emailId: data.email,
    password: hashedPassword,
    profilePhotoUrl: finalImg
  },
    function (err, user) {
      if (err) return res.status(500).send({ msg: err.message });
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token, msg: "User registed successfully" });
    });
});
//*************getting Id from JWT token**************
router.get('/me', verifyToken, function (req, res, next) {

  Register.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send({ msg: "User not registered." });

    res.status(200).send(user);
  });

});
//JWT authentication based login
router.post('/login', function (req, res) {
  Register.findOne({ emailId: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server');
    if (!user) return res.status(401).send({ msg: 'No user found' });

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