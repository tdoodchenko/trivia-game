var score = 0;




//
var questions = [{
  question: "What rock band in the 70’s wrote the song Closer to the Heart?",
  choices: ["Pink Floyd", "Rush", "Fleetwood Mac", "Elton John"],
  correctAnswer: 1
}, {
  question: "In the movie Wayne’s World, what song were shoppers not permitted to play in the famous music store scene?",
  choices: ["SMoke on the Water", "kazmir", "Stairway to Heaven", "Iron Man"],
  correctAnswer: 2
}, {
  question: "In the Lynyrd Skynyrd song, Sweet Home Alabama, which of the following musicians is referenced?",
  choices: ["Mick Jagger", "Neil Young", "Bob Dylan", "Van Morrison"],
  correctAnswer: 1
}, {
  question: "Which of these bands once backed Bob Dylan?",
  choices: ["Jefferson Airplane", "Nirvana", "The Band", "Fleetwood Mac"],
  correctAnswer: 2
}, {
  question: "The lyric’s 'She's as sweet as Tupelo honey Just like honey from the bee' were sang but which artist?",
  choices: ["Jim Morrison", "Mick Jagger", "Jimi Hendrix", "Van Morrison"],
  correctAnswer: 3
}, {
  question: "CSNY stands for:",
  choices: ["Cooper, Stevens, Nash & York", "Crosby, Stills, Nash & Young", "Crosby, Steeles, Nash & Young", "Croxall, Stills, Nicholas & Young"],
  correctAnswer: 3
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;


$(".quizContainer").hide();
$(".resultContainer").hide();

$('.StartBtn').on("click", function() {
    $(".quizContainer").show()
    startTimer();
    
    console.log(correct);
    setTimeout(function(){ $(".quizContainer").hide(); }, 30000); 
  
    setTimeout(function(){ $(".resultContainer").show(); }, 30000);
   
});


$(document).ready(function () {


  // Display the first question
  displayCurrentQuestion();


  // On clicking next, display the next question
  $(this).find(".nextButton").on("click", function () {
      if (!quizOver) {

          value = $("input[type='radio']:checked").val();

          if (value == undefined) {
              $(document).find(".quizMessage").text("Please select an answer");
              $(document).find(".quizMessage").show();
          } else {
              // TODO: Remove any message -> not sure if this is efficient to call this each time....
              $(document).find(".quizMessage").hide();

              if (value == questions[currentQuestion].correctAnswer) {
                  correctAnswers++;
              }

              currentQuestion++; // Since we have already displayed the first question on DOM ready
              if (currentQuestion < questions.length) {
                  displayCurrentQuestion();
              } else {
                  displayScore();
                  //                    $(document).find(".nextButton").toggle();
                  //                    $(document).find(".playAgainButton").toggle();
                  // Change the text in the next button to ask if user wants to play again
                  $(document).find(".nextButton").text("Play Again?");
                  quizOver = true;
              }
          }
      } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
          quizOver = false;
          $(document).find(".nextButton").text("Next Question");
          resetQuiz();
          displayCurrentQuestion();
          hideScore();
      }
  });
});


// This displays the current question AND the choices
function displayCurrentQuestion() {

  console.log("In display current Question");

  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".quizContainer > .choiceList");
  var numChoices = questions[currentQuestion].choices.length;

  // Set the questionClass text to the current question
  $(questionClass).text(question);

  // Remove all current <li> elements (if any)
  $(choiceList).find("li").remove();

  var choice;
  for (i = 0; i < numChoices; i++) {
      choice = questions[currentQuestion].choices[i];
      $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
  }
}

function resetQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  hideScore();
}

function displayScore() {
  $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
  $(document).find(".quizContainer > .result").show();
  $(document).find(".resultContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
  $(document).find(".resultContainer > .result").show();
}

function hideScore() {
  $(document).find(".result").hide();
}



var correct = 0;


// $("#questions").hide();

// $('.StartBtn').on("click", function() {
//     $("#questions").show()
//     startTimer();
    
//     console.log(correct);
//     setTimeout(function(){ $("#questions").hide(); }, 30000);      
    
// });

// collect ansers


// startTimer
function startTimer(){
        var time = new Date();
        Date.prototype.toShortString = function(){
            var x = this.getSeconds();
          return x + " : 00";
        };
        time.countDown = function(){
          var z = this.getSeconds();
          var a = 0; 
          if(z == 0){
            return;
          } 
            a = z-1;
          this.setSeconds(a);
          $('#seconds').html(time.toShortString());
          setTimeout(function(){time.countDown();}, 1000);
        };
        time.setSeconds(30);
        setTimeout(function(){time.countDown();}, 1000);
        
       
      }

     


// for (var i = 0; i < questions.length; i++){
//   var response = window.value(questions[i].prompt);
//   if(response == questions[1].answer){
//       score++;
//   }