const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: String,
    password: {
        type: String,
        required: true,
    },

    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    address: {
        city: String,
        state: String,
        country: String,
        zipcode: String,
        geolocation: {
        lat: String,
        long: String,
    },
  },
    phone: String,
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
