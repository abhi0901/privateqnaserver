var express = require('express');
var router = express.Router();
var questions = require('./questions.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

/* Questions routing */
router.post('/questions', questions.create)
  .get('/questions', questions.getAll)
  .put('/questions/:id', questions.addAnswer)
  .delete('/questions/:id', questions.delete)

module.exports = router;
