const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// dont need to add id, mongoose will create it
const movieSchema = new Schema({
  name: String,
  genre: String,
  directorId: String
});

module.exports = mongoose.model('Movie', movieSchema);
