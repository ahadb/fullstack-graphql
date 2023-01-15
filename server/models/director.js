const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// dont need to add id, mongoose will create it
const directorSchema = new Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model('Director', directorSchema);
