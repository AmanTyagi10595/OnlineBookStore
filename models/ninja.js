const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const st = require("../secure");



// create ninja Schema & model
const GeoSchema = new Schema({

    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }


});
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String
    },
    address: {
        type: String,
        default: "Meerut"
    },
    available: {
        type: Boolean,
        default: false
    },
    geomatry: GeoSchema
    // add in geo location
});

// //*********** Passport provider(google, twitter, facebook) schema*********/
// const googleSchema = new Schema({
//     google_id:{ type:String},
//     displayName:{type:String},
//     provider:{type:String}
// });

//*********** OTPschema **************
const OTPschema = new Schema({
    // email:{
    //     type: String,
    //     require:[true, 'Your emailId is required'],
    // },

    OTP: {
        type: String
    },
    OTPGenTime: {
        type: String
    }
});
//*********** RegistrationSchema **************
const RegistrationSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Your name is required'],
        trim: true
    },
    emailId: {
        type: String,
        require: [true, 'Your emailId is required'],

    },
    phone: {
        type: Number,
        default: 9999999999
    },
    profilePhotoUrl: {
        type: Schema.Types.Mixed
    },

    password: {
        type: String
    },
    status: {
        type: Boolean,
        default: 0
    },
    provider: {
        type: String
    },
    OTPdata: OTPschema  //adding OTP and OTP generation time.

});
//***************** PropertySchema ********************
const PropertySchema = new Schema({

    img: { data: Buffer, contentType: String },
    Owner_name: {
        type: String,
        required: [true, 'Owner name is required'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'property name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        trim: true
    },
    phone: {
        type: Number,
        required: [true, 'Phone or monile no. is required'],
        trim: true
    },
    description: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    states: {
        type: String
    },
    leasePeriod: {
        type: Number
    },
    NumberOfBed: {
        type: Number
    },
    area: {
        type: Number
    },
    swimmingPool: {
        type: Boolean
    },
    twoStories: {
        type: Boolean
    },
    emergencyExit: {
        type: Boolean
    },
    firePlace: {
        type: Boolean
    },
    laundryRoom: {
        type: Boolean
    },
    jogigPath: {
        type: Boolean
    },
    ceiling: {
        type: Boolean
    },
    dualSinks: {
        type: Boolean
    },
    videoUrl: {
        type: String
    },
    termCondition: {
        type: Boolean,
        required: [true, 'Please confirm the term and conditions']
    }
});

//************** BookStore's Book Schema ****************/
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String
    },
    pages: {
        type: String
    },
    image_url: {
        type: String
    },
    buy_url: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number, required: true
    },
    count: {
        type: Number
    }

});

//************** Cart of Books order Schema ****************/
const cartSchema = mongoose.Schema({
    UserId: {
        type: String,
        required: true
    },
    Email: {
        type: String
    },
    book: [{

        book_title: {
            type: String,
            required: true
        },
        book_code: {
            type: String,
            required: true
        },
        book_price: {
            type: Number, required: true
        },
        book_count: {
            type: Number
        },
        book_order_count: {
            type: Number
        }
    }],
    address: {
        type: String
    }
});


const Ninja = mongoose.model('Ninja', NinjaSchema);
const register = mongoose.model('register', RegistrationSchema);
const OTP = mongoose.model('OTP', OTPschema);
const Property = mongoose.model('Property', PropertySchema);
const Books = mongoose.model('Books', bookSchema);
const cart = mongoose.model('cart', cartSchema);

module.exports.Ninja = Ninja;
module.exports.register = register;
module.exports.OTP = OTP;
module.exports.Property = Property;
module.exports.Books = Books;
module.exports.cart = cart;
