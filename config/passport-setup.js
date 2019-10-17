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
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      // console.log(profile.emails[0].value);
      Register.findOne({emailId:profile.emails[0].value}).then((result)=>{
        if(!result){
          var body ={
            emailId:profile.emails[0].value,
            name:profile.displayName,
            provider:profile.provider
          };
          console.log(body);
          // var register = new Register(body);
          new Register(body).save().then(function(data){
            done(null,data);
            // res.send(data);
            console.log(data.toObject(),"new user registered by google info");
          }).catch((error)=>{
            console.log("Somthing went wrong, data not saved");
          });
        }
        else{
          done(null, result);   //err
           console.log("This user is already registered, so we have not register him this time");
        }
      });      
  }
));