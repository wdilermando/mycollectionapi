const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    'status': String,
    'title': String,
    'img': String,
    'type': String,
    'stars': String,
    'author': String,
    'sinopse': String,
    'review': String
});

module.exports = mongoose.model('Item', ItemSchema)