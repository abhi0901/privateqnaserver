var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var questions = new Schema({
  question: String,
  tags: String,
  answers: [String]
})

module.exports = mongoose.model('questions', questions);
