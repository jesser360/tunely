var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/tunely-app");

module.exports.Album = require('./album.js');
