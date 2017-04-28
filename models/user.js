"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uuid = require("uuid/v4");
const md5 = require("md5");
const uniqueValidator = require("mongoose-unique-validator");


const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//Install plugins
UserSchema.plugin(uniqueValidator);


//Virtuals
UserSchema.virtual("password").set(function(password) {
    this._password = password;
    this.hashedPassword = bcrypt.hashSync(password, 10);
});

UserSchema.path("hashedPassword").validate(function(val) {
    if (this._password.length < 8) {
        this.invalidate('hashedPassword', "Password must be at least 8 characters");
    }
});

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword);
};

UserSchema.pre('save', function(next) {
    this.token = md5(`${ this.email }${ uuid() }`);
    next();
});




const User = mongoose.model("User", UserSchema);

module.exports = User;