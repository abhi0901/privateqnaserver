// mongoose model for question
var Question = require('../models/questionModel.js')

var questions = {

  // function to find all questions from database
  getAll: function(req, res) {

    Question.find(function(err, questions) {

      if (!err)
        res.status(200).json(questions)

      else
        res.status(500).send(err)
    })

  },

  // function to create new question
  create: function(req, res) {

    var question = new Question(req.body);

    question.save(function(err) {
      if (!err)
        res.status(201).json(question)

      else
        res.status(500).send(err)
    })

  },

  // function to add answer in a question
  addAnswer: function(req, res) {

    var question_id = req.params.id;

    Question.findById(question_id, function(err, question) {
      if (!err) {

        question.answers.push(req.body.answer);
        question.save(function(err) {
          if (!err)
            res.status(200).json(question)
          else
            res.status(500).send(err)
        })

      } else {
        res.status(500).send(err)
      }
    })
  },

  // function to delete a question
  delete: function(req, res) {

    var question_id = req.params.id;

    Question.findByIdAndRemove(question_id, function(err) {
      if (!err)
        res.status(200).json('removed')

      else
        res.status(500).send(err)
    })

  }
}

module.exports = questions;
