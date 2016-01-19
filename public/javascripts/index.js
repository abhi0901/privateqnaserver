$(document).on('ready', function() {

  var questionList=[];
  // hide question container by default
  $('#askQuestionFormContainer').hide();

  //function to toggle question container
  $('#askQuestion').on('click', function() {
    $('#askQuestionFormContainer').toggle();
  })

  // function to submit a new question
  $('#askQuestionSubmitBtn').on('click', function() {

      var question = {
        'question': $('#question').val(),
        'tags': $('#tag').val()
      }

      $.ajax({
        type: 'POST',
        url: 'questions',
        data: question,
        success: function(data) {
          console.log(data);
        },
        error: function(err) {
          console.log(err);
        }
      })
    })
    // end of function


  // function to load questions list
  var getQuestion = function() {

      $.ajax({
        type: 'get',
        url: 'questions',
        success: function(data) {
          questionList.push(data);
          prepareQuestionsList(data)
          console.log(questionList);
        },
        error: function(err) {
          console.log(err);
        }
      })
    }
    // end of load question function

    getQuestion();

    // function to prepare list of questions
    var prepareQuestionsList = function(questionList){

      $('#question_panel').html('');

      $.each(questionList,function(key,val){

        var questionTemplate = '<div class="panel panel-default">'
                               +'<div class="panel-heading">'+val.question
                               +'<span class="badge" id="totalAns">'+val.answers.length+'</span></div>'
                               +'<div class="panel-body">'+val.answers+'</div>'
                               +'<div class="panel-footer">Remove Add Answer</div></div>'
        $('#question_panel').append(questionTemplate)

      })


    }


});
