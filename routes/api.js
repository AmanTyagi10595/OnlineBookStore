const express = require('express');
// var multer = require ('multer');
//change;
const ejs = require('ejs');
const router = express.Router();
const MyNinja = require('../models/ninja.js');
var bodyParser = require('body-parser');
var OTPgene = MyNinja.OTP;
var Register = MyNinja.register;
var Ninja = MyNinja.Ninja;
var Property = MyNinja.Property;
var Books = MyNinja.Books;
var cart = MyNinja.cart;
var AuthController = require('../auth/AuthController');
var nodemailer = require('nodemailer');
var app = express();
var otpGenerator = require('otp-generator');
var moment = require('moment');
var bcrypt = require('bcryptjs');
var path = require("path");
var fs = require('fs');
const url = require('url');
const passport = require("passport");
const passportSetup = require('../config/passport-setup');
const stripe = require("stripe")("sk_test_FnigeKJED52GMNL7tDNFpEud00CYI1iDej");
var excel = require('excel4node');
var json2csv = require('json2csv').parse;
var json2xls = require('json2xls');
// var mongoXlsx = require('mongo-xlsx');

// router.get("/datawww", function(req, res){
//   console.log("datawww run");
//   var excelData =async function(){
//     var data = await Register.find({});
//     // console.log(data);
//     var model = mongoXlsx.buildDynamicModel(data);
//     mongoXlsx.mongoData2Xlsx(data, model, function(err, data) {
//       console.log('File saved at:', data.fullPath); 
//     });

//  };
//  excelData();
// });

router.get("/JsonToCsv", async function (req, res) {
  var data = await Register.find({});
  // res.send(data);
  // var fields = ['_id', 'name', 'emailId', 'password', 'phone'];
  // const csv = json2csv(data, { fields: fields});
  // fs.writeFile('file.csv', csv, function(err) {
  // if (err) throw err;
  // console.log('file saved');
  // });
  //export only the field 'poo'
  var xls = json2xls(data, {
    fields: ['_id', 'name', 'emailId', 'password', 'phone']
  });

  fs.writeFileSync(__dirname + '/../uploads/photos/data.xlsx', xls, 'binary');
  console.log("excl creater");
  res.send("excl creater");
  // # This will create a csv file in the current directory called as file.csv open it in excell and you are done.
});

app.set('view engine', 'ejs');
router.get('/login', (req, res) => {
  console.log("login Api");
  res.render('login');
});

//middleware to check that the request is from logedin usee or not
const authcheck = function (req, res, next) {
  console.log("checking by middleware that the user is logedin or not");
  if (!req.user) {
    res.redirect('/api/login');
  } else {
    next();
  }
};
//************ Passport's google social login starts here ***********/
router.get('/google',
  passport.authenticate('google', { scope: ['profile', "email"] }));
//****/Passport's google social login callback api****/
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  console.log(req.user.toObject(), "Google callback api run");
  // res.status(200).send((req.user).toString());
  res.redirect('/api/profile');
});
//************ Api to check authcheck(logedin user or not) *************/
router.get('/profile', authcheck, function (req, res, next) {
  console.log("In secure Api");
  console.log(req.user.toObject());
  res.send("In secure api");
});
//***********Logout Api********/
router.get('/logout', function (req, res, next) {
  console.log("logout api run");
  req.logout();
  res.redirect('/api/login');
});

//******************MulterStorage **********/
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './uploads/files')
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname + new Date().toISOString());
//     }
// });

// var upload = multer({dest: 'uploads/files'});

// //************ Api for upload single file **********/
// router.post('/uploadfile', upload.single('myFile'), (req, res) => {
//     console.log(req.file);
//     if (req.file) {
//         console.log(req.file,'Uploading file...');
//         res.send(req.file);
//     } else {
//         const error = new Error('Please upload a file');
//         error.httpStatusCode = 400;
//         res.send(error);
//     }
// });
// //*************Upload multiple files ***************/
// router.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
//     const files = req.files;
//     if (!files) {
//       const error = new Error('Please choose files');
//       error.httpStatusCode = 400;
//       return next(error);
//     }
//     res.send(files);    
//   });
// //**************Upload Images***************/
// router.post('/uploadphoto', upload.single('myFile'), (req, res) => {
//     var img = fs.readFileSync(req.file.path);
//  var encode_image = img.toString('base64');
//  // Define a JSONobject for the image attributes for saving to database

//  var finalImg = {
//     contentType: req.file.mimetype,
//     image:  new Buffer(encode_image, 'base64')
//    };

// //    console.log(finalImg,"testing finalImg");
// //    db.collection('quotes').insertOne(finalImg, (err, result) => {
// //     console.log(result);

// //     if (err) return console.log(err);

// //     console.log('saved to database');
// //     res.send("Image saved");


// //   });
// });

//*********/get a list of ninjas from the db ************************/
router.get('/ninjas', function (req, res, next) {
  Ninja.geoNear(
    { type: "point", coordinates: [parseFloat(req.query.lag), parseFloat(req.query.lat)] },
    { maxDistance: 100000, spherical: true }
  ).then((result) => {
    res.send(result);
  });
});

// add a new ninja to the db
router.post('/ninjas', function (req, res, next) {
  console.log("API Run");
  var ninja = new Ninja(req.body);
  ninja.save().then(function (data) {
    res.send(data);
  }).catch(next);
});

// update a ninja in the db
router.put('/ninjas/:id', function (req, res, next) {
  Ninja.findOneAndUpdate({ "_id": req.params.id }, { address: req.body.address }).then(function () {
    Ninja.findOne({ "_id": req.params.id }).then((result) => {
      console.log(result.toObject());
      res.send(result);
    });
  });
});

// delete a ninja from the db
router.delete('/ninjas/:id', function (req, res, next) {
  console.log("Delete api run");
  Ninja.findOneAndRemove({ "_id": req.params.id }).then((result) => {
    console.log(result.toObject());
    res.send(result);
  }).catch(function () {
    console.log("group with thid Id does not exist");
  });
});

//Regiter the user
router.post('/register', async function (req, res, next) {
  console.log(req.body, "Register API Run");

  try {
    var user = new Register(req.body);
    await user.save();

  } catch (error) {
    res.status(400).send(error);
  }

});

//*********** Api to update the userProfile ***************/
router.post("/updateProfile", function (req, res) {
  console.log(req.body, "Update Profile Api is running");
  Register.findOneAndUpdate({ "emailId": req.body.email }, {
    "$set": {
      "name": req.body.name, "emailId": req.body.email,
      "phone": req.body.phone
    }
  }, { "new": true }).then((data) => {
    console.log(data.toObject(), "profile updated");
    res.status(200).send({ msg: "profile updated", msgData: data });
  }).catch((err) => {
    console.log("error in update profile", err);
    res.status(502).send(err, { msg: "db error" });
  });
});

// ********** forgot password   ***********
router.get('/forgotPassword', async function (req, res) {
  Register.findOne({ emailId: req.body.email }).then((result) => {

    res.send({
      "email": result.emailId,
      "password": result.password
    });
  }).catch(function () {
    console.log(err, "Some error");
  });
});

//********************** */Api for reset password *****************************
router.put('/resetPassword', function (req, res) {
  console.log(req.body.email);
  Register.findOne({ emailId: req.body.email }).then((result) => {
    if (!result) {

      console.log("user not registered")
      res.status(500).send({ msg: "user not registered" });
    }
    else {

      var OTP = otpGenerator.generate(5, { upperCase: false, specialChars: false }); //Generate OTP
      console.log(OTP);
      var a = moment().format('YYYY-MM-DD HH:mm:ss');
      //To save the OTPs in different collection, uncomment, replace Register.findOneUpdate with Otp,save().then.....
      // var body ={
      //     "email":req.body.email,
      //     "OTP":OTP,
      //     "OTPGenTime":a
      // };
      //   var Otp = new OTPgene(body);

      Register.findOneAndUpdate({ "emailId": req.body.email }, { "$set": { "OTPdata.OTP": OTP, "OTPdata.OTPGenTime": a } }).then(function (data) {
        console.log(req.body.email, "testin mail")
        var email = req.body.email
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'amantyagi10595js@gmail.com',
            pass: '9761320827@Ajeet'
          }
        });
        // '<b>Hello world?</b><br><a href="http://localhost:4200/changepassword?email='+encrypt+'">My web</a>'
        var mailOptions = {
          from: 'amantyagi10595js@gmail.com',
          to: req.body.email,
          subject: 'Sending Email using Node.js',
          text: OTP,
          html: '<p>Click</p> <a href="http://localhost:4300/updatePass?email=' + email + '&' + "otp=" + OTP + '" > here</a> '

        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            res.status(502).send({ msg: "somthing wrong", });
          } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({ msg: "mail sent" });
          }
        });
        // res.send(data);
      }).catch("OTP is not saved in DB");

    }

  });
});
//************ Second Reset Api *************
router.put('/resetPassword2', function (req, res) {
  // console.log(req.body)
  Register.findOne({ "emailId": req.body.email, "OTPdata.OTP": req.body.OTP }).then((result) => {
    // console.log(result.toObject());

    var start_date = moment(result.OTPdata.OTPGenTime, 'YYYY-MM-DD HH:mm:ss');
    var timePresent = moment().format('YYYY-MM-DD HH:mm:ss');
    var end_date = moment(timePresent, 'YYYY-MM-DD HH:mm:ss');
    var duration = moment.duration(end_date.diff(start_date));
    var timeDi = duration.asMinutes();
    var timeDiff = Math.round(timeDi);
    console.log(timeDiff, "minutes before the OTP was sent");
    if (timeDiff <= 20) {
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      Register.findOneAndUpdate({ emailId: req.body.email }, { $set: { "password": hashedPassword } }).then((result) => {
        console.log("Password Updated, you can login with the new password");
        res.status(200).send({ msg: "Password Updated" });
      });
    }
    else {
      console.log("OTP expire");
      res.status(502).send({ msg: "OTP expire" });
    }
  }).catch(function () {
    res.status(502).send({ msg: "wrong OTP/Email" });
  });
});

//***************Api To Upload Property data *****************/
router.post("/propertyData", function (req, res) {
  var property = new Property(req.body);
  property.save().then(function (data) {
    console.log(data.toObject(), "Ya hoooooo");
    res.send(data);
  }).catch(function () {
    console.log("Somthing went wrong, data not saved");
  });
});

//***************** Api to send mail to activate account **************/
router.post("/activateAcccount", function (req, res) {
  console.log("Send mail api is call");
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'amantyagi10595@gmail.com',
      pass: "9761320827@Ajeet"
    }
  });

  var mailOptions = {
    from: 'amantyagi10595@gmail.com',
    to: req.body.email,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: '<a href="http://localhost:4000/api/testing2?email=' + req.body.email + '>Activate your account</a>'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent: ' + info.response);
    }
  });
});

router.get("/testing2", function (req, res) {
  console.log(req.query.email, " this is the mail");
  var mail = req.query.email;
  Register.findOneAndUpdate({ emailId: mail }, { status: true }).then((result) => {
    console.log(result.toObject(), "Status changed");
    res.send(result, "this Updated");
  }).catch(function () {
    return res.status(500).send('Error on the server.');
  });
});
//+++++++++=============++++++++++++++++++++===========+++++++++++++============++++++++++++++=====+++++
//***************Api To Add Books data *****************/
router.post("/admine/addBooks", function (req, res) {
  console.log(req.body, "AddBooks api run");
  Books.findOne({ code: req.body.code }).then((result) => {
    if (!result) {
      var books = new Books(req.body);
      books.save().then(function (data) {
        console.log(data.toObject(), "Book Added");
        console.log(data, "book saved");
        res.status(201).send({ "msg": "Book Added" });
      }).catch(function () {
        console.log("Somthing went wrong, data not saved");
        res.status(400).send({ "msg": "Somthing Wrong" });
      });
    }
    else {
      console.log("The book with this code is present, if need some changes, you can update this");
      res.status(409).send({"msg":"Book already present"});
    }
  });

});
//************** Api to Update Books data  ************/
router.post("/admine/upadteBooks", function (req, res) {
  console.log("Update Books Api run");
  var date = Date.now();
  var data = req.body;
  Books.findOneAndUpdate({ code: req.body.code },
    { $set: { count: data.count, price: data.price, create_date: date } }).then((result) => {
      console.log(result.toObject(), "Upadted");
      res.send(result);
    }).catch(function () {
      console.log("Something went wrong, books data not updated");
    });
});
//*************** Api to delete the Book from the BookData **************/
router.delete("/admine/deleteBook", function (req, res) {
  console.log("Delete Book api run");
  Books.findOneAndRemove({ code: req.body.code }).then((result) => {
    console.log("the book that was having code: ", req.body.code, "have been removed");
    res.send("the book have been removed");
  }).catch(function () {
    console.log("Something went wrong book could not deleted");
    res.send("Something went wrong book could not deleted");
  });
});
//*************** Api to find all books for the User(with limits) *********/
router.get("/user/findBooks", function (req, res) {
  console.log("FindAll Books Api run");
  Books.find({}, { count: 0 }).then((result) => {
    // console.log(result);
    res.send({ res: result });
  });
});
//*************** Api to find all books for the Admine(with limits) *********/
router.get("/admine/findBooks", function (req, res) {
  console.log("FindAll Books Api run");
  Books.find().limit(2).then((result) => {
    // console.log(result);
    res.send(result);
  });
});
//*************** Api to find particular book with its code by user **************/
router.get("/user/findParticularBooks/:id", function (req, res) {
  console.log("FindAll Books Api run");
  Books.findOne({ _id: req.params.id }).select('-__v').then((result) => {
    // console.log(result);
    res.send(result);
  });
});
//*************** Api to find particular book with its code by Admine **************/
router.get("/admine/findParticularBooks", function (req, res) {
  console.log("FindAll Books Api run, Admine");
  Books.find({ code: req.body.code }).then((result) => {
    console.log("Find data by admine has been sent");
    res.send(result);
  });
});

//*****************Api to store data in cart************/

// router.post("/user/addToCart", async function (req, res) {
//   console.log("Add to cart api run");
//   //  console.log(req.body.comments);
//   var flag = 0;
//   // console.log(flag,"flag started as");
//   await req.body.comments.forEach((arr) => {
//     Books.findOne({ code: arr.book_code }).then((result) => {
//       if (result.count < arr.book_count) {
//         flag = 1;
//         console.log(flag, "Flag increased in loop");
//         res.send("You have exceed our store limit, plz reduce the count of the Book");
//         return;
//       }
//     });
//   });
//   setTimeout(() => {
//     if (flag != 1) {

//       // console.log(flag,"flag Ended as");
//       var Cart = new cart(req.body);
//       // console.log(Cart.toObject());
//       Cart.save().then(function (data) {
//         // console.log("HII inside cart api");
//         // res.send(data);
//         data.comments.forEach((each) => {
//           var count = each.book_count;
//           var book_code = each.book_code;
//           Books.findOneAndUpdate({ "code": book_code }, { $inc: { count: (-count) } }).then((result) => {
//             console.log("Data updated", result);
//           });
//           console.log("count of books updated");
//         });
//       }).catch(function () {
//         console.log("Somthing went wrong, data not saved");
//       });
//     }

//   }, 1000);
//   //     var Cart = new cart(req.body);
//   //     // console.log(Cart.toObject());
//   //     Cart.save().then(function(data){
//   //      // console.log("HII inside cart api");
//   //      res.send(data);
//   //  }).catch(function(){
//   //      console.log("Somthing went wrong, data not saved");
//   //  });
// });
router.post("/user/addToCart", function (req, res) {
  // console.log(req.body, "datatatattatatatatatattatata");
  let flag = 0;
  let saveBook = {
    book_count: req.body.book.count,
    book_price: req.body.book.price,
    book_code: req.body.book.code,
    book_title: req.body.book.title,
    _id: req.body.book._id,
    // book_order_count: req.body.order_count
  }
  cart.findOne({ "UserId": req.body.user._id }).then((data) => {
    if (data) {
      data.book.forEach((result) => {
        if (result._id == req.body.book._id) {
          console.log("Book already in your cart");
          flag = 1;
          return;
        }
      });
      setTimeout(function () {
        if (flag == 0) {
          console.log("inside addNewBookInCart function");
          cart.findOneAndUpdate({ "UserId": req.body.user._id }, { "$push": { "book": saveBook } },
            { "new": true }).then((data) => {
              console.log("book updated in cart");
              res.status(200).send(data);
            }).catch((err) => {
              console.log(err);
              res.status(500).send(err);
            });
        }
      }, 1000);
    }
    else {
      const book = {
        UserId: req.body.user._id,
        Email: req.body.user.emailId,
        address: "Static City",
        book: [
          {
            book_count: req.body.book.count,
            book_price: req.body.book.price,
            book_code: req.body.book.code,
            book_title: req.body.book.title,
            _id: req.body.book._id
          }
        ]
      };
      var Cart = new cart(book);
      Cart.save().then(function (data) {
        console.log("New cart is created");
        res.status(200).send({ msg: "new cart created" });
      }).catch(function () {
        res.status(500).send({ msg: "db error" });
      });
    }
  });

});

//*****************Api to show total book in the cart *************/
router.post("/user/fetchCartBook", function (req, res) {
  console.log(req.body, "fetchCartBook api run");
  cart.find({ "UserId": req.body.UserId }).then((cartBooks) => {
    // console.log(JSON.stringify(cartBooks[0]), "data to sent to front end")
    res.status(200).send(cartBooks[0]);
  }).catch((err) => {
    res.status(200).send(err);
  });
});

//****************Api to remove Book from the Cart ***************/
router.post("/user/removeFromCart", function (req, res) {
  console.log(req.body, "Remove from cart");
  cart.update({ 'UserId': req.body.user_id }, { $pull: { 'book': { 'book_code': req.body.book_code } } }).then((result) => {
    console.log(result, "removed data");
  }).catch((error) => {
    console.log("error", error);
  });
});

//*****************Api to find total cost in the cart ************/
router.get("/user/cartTotalcost", function (req, res) {
  console.log(req.body.email, "Hi Total cost of Cart Api run");
  cart.findOne({ Email: req.body.email }).then((result) => {
    //  console.log(result.comments.toObject() );
    var total = 0;
    result.comments.forEach(r => {
      //  console.log(r.book_count*r.book_price);
      total = total + (r.book_count * r.book_price);
    });

    console.log("Total Amount to be pay: ", total);
  });
});
//***************Strip, add customer API *****************/
router.post("/user/addCustomer", function (req, res) {
  console.log("Add user stripe api");
  stripe.customers.create({
    email: req.body.email,
    name: req.body.name,
    phone: req.body.phone
  }, function (err, customer) {
    console.log('err', err, 'res', customer);
  });
});
//*****************Stripe, add Card and generte token, latter will be added to customer*****/
router.get("/user/addCard", function (req, res) {
  var data = req.body;
  stripe.tokens.create({
    card: {
      number: data.number,
      exp_month: data.exp_month,
      exp_year: data.exp_year,
      cvc: data.cvc
    }
  }, function (err, token) {
    console.log(err, token)
  });
});
//*************Stripe, add card to customer **************/
router.post("/user/addCardToCustomer", function (req, res) {
  stripe.customers.createSource(
    req.body.customerId,
    {
      source: req.body.CradsToken
    },
    function (err, source) {
      // asynchronously called
      console.log(source);
      console.log(err);

    }
  );
});
//**************Stripe, Charge the user *****************/
router.get("/user/chargeUser", function (req, res) {
  stripe.charges.create({
    amount: req.body.amount,
    currency: req.body.currency,
    // source: "tok_1Ezj5uBS9i6U8ysE4HukARqb", //BY TOKEN -> NOT CARDID REQUIRED
    customer: req.body.customerId,
    card: req.body.cardId, //CARD ID FROM SAVED CARD -> NO SOURCE REQUIRED
    description: req.body.desc
  }, function (err, charge) {
    // asynchronously called
    console.log(err, charge);
  });
});
//***************Api for apply lookup tables**************/
router.get("/AggregationLookUp", function (req, res) {
  console.log("tsting Aggregation");
  cart.aggregate([
    { $match: { address: "Delhi" } },
    { $group: { _UserId: "$UserId", count: { "$sum": 1 } } }
  ]).then((data) => {
    console.log(data);
    res.send(data);
  }).catch(function (err) {
    console.log(err, "Something Went wrong");
  });

});
//***************Api to get the city wise need of particular Book ******/
router.get("/admine/cityWiseNeed", function (req, res) {
  console.log(req.body, "Body");
  cart.aggregate([
    { $match: { "comments.book_code": "M125" } },
    { $group: { _address: "$address", CityWiseSale: { $sum: "$comments.book_count" } } }

  ]).then((data) => {
    console.log(data);
    res.send(data);
  }).catch(function (err) {
    console.log(err, "Something Went wrong");
  });
  // cart.find({"address":"Meerut"}).then((result)=>{
  //   var count =0;
  //   result.comments.forEach((r)=>{
  //     r.findOne({book_code:"M124"}).then((R)=>{
  //      count = count + R.book_Count;
  //     });
  //   });
  //   console.log(count);
  // }).catch((err)=>{
  //   console.log(err);
  // }); 
});

app.use('/api/auth', AuthController);

module.exports = router;
