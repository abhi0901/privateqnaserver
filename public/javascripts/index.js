$(document).on('ready', function() {

  var questionList = [];
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
          $('#askQuestionFormContainer').hide();
          $('#question').val('')
          $('#tag').val('')
          appendQuestions(data)
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
          prepareQuestionsList(data);

        },
        error: function(err) {
          console.log(err);
        }
      })
    }
    // end of load question function

  getQuestion();



  //function to append questions into question list
  var appendQuestions = function(ques) {

    var answerBody = '<p><i>Tags : '+ ques.tags +'</i></p><hr class="divider"'

    if (ques.answers.length === 0) {
      answerBody += '<p><i>No answer available !</i></p>'
    } else {
      $.each(ques.answers, function(key, val) {
        key = key+1;
        answerBody += '<p>Answer ' + key + ' -> '+val+'</p><hr class="divider">'
      })
    }

    var questionTemplate = '<div class="panel panel-default" id=question_'+ques._id+'>' + '<div class="panel-heading">'
                            + ques.question + '<span class="badge" id="totalAns'+ques._id+'">' + ques.answers.length + '</span></div>' + '<div class="panel-body">' + answerBody + '</div>'
                            + '<div class="panel-footer"><button class="btn btn-danger" id="delete_'+ques._id+'">Remove this question</button>'
                            + '<div class="col-md-10"><div class="input-group"> <input type="text" class="form-control" placeholder="Enter your answer here .." id="anstext_'+ques._id+'"><span class="input-group-btn"><button class="btn btn-success" id="ans_'+ques._id+'">Answer this question</button></span></div></div>'

    $('#question_panel').append(questionTemplate);

    // function to delete question
    $('#delete_'+ques._id).on('click',function(){

      $.ajax({
        type:'DELETE',
        url:'./questions/'+ques._id,
        success:function(){
          $('#question_'+ques._id).remove();
        },
        error:function(err){
          console.log('could not delete'+err);
        }

      })
    })
    // end of delete function

    // function to add answer
    $('#ans_'+ques._id).on('click',function(){

      $.ajax({
        type:'PUT',
        url:'./questions/'+ques._id,
        data:{'answer':$('#anstext_'+ques._id).val()},
        success:function(question){
          $('#question_'+ques._id).remove();
          appendQuestions(question)
        },
        error:function(err){
          console.log('could not update'+err);
        }

      })
    })
    // end of add answer function


  }

  // function to prepare list of questions
  var prepareQuestionsList = function(questionList) {

    $('#question_panel').html('');

    $.each(questionList, function(key, val) {
      appendQuestions(val);
    })

  }


});
