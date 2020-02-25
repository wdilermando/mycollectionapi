const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    'firstName': String,
    'lastname': String,
    'city': String,
    'state': String,
    'phone': String,
    'email': String,
    'password': String
});

module.exports = mongoose.model('User', UserSchema)