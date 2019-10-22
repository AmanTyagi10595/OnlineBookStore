var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var expressSession = require('express-session');
const MyNinja = require('../models/ninja.js');
var Register = MyNinja.register;


// app.use(expressSession({secret: 'mySecretKey'}));
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(bodyParser.json());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  Register.findOne({
      _id: id
  }).then((user)=>{
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: "43774142200-3qai0su4v61a8lh83o0lgduvbru3pfod.apps.googleusercontent.com",
    clientSecret:"k4WR2-yAfJ8lzKDKAhsLLk_Z",
    callbackURL: "/api/google/redirect"
  },
  function(token, tokenSecret, profile, done) {
      Register.findOne({emailId:profile.emails[0].value}).then((result)=>{
        if(!result){
          var body ={
            emailId:profile.emails[0].value,
            name:profile.displayName,
            provider:profile.provider
          };
          new Register(body).save().then(function(data){
            done(null,data);
          }).catch((error)=>{
          });
        }
        else{
          done(null, result);   //err
        }
      });      
  }
));