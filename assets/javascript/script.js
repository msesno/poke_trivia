$(document).ready(function(){

  // click button to start game and timer
  $("#start-button").on("click", gameState.startTimer);

});

// game state variable for function
var gameState = {

  // time set at 60s and count down by 1s
  timeRemaining : 60,

  // start the timer, hide the start page, show the questions
  startTimer: function() {
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    setInterval(gameState.countdown, 1000);
    $("#start-page").hide();
    trivia.displayQuestions();
  },

  // countdown timer and update html; stop timer at 0
  countdown: function() {
    gameState.timeRemaining--;
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    if (gameState.timeRemaining === 0) {
      gameState.stopTimer();
      $("#timer").empty();
    }
  },

  // stop timer, check answer
  stopTimer: function() {
    clearInterval();
    trivia.checkAnswers();
  },

  // hide question show end page screen
  showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
    $("#end-page").show();
    $("#questions-box").empty();
    $("#timer").empty();
    $("#timer").hide();
    $("#correct-answers").text("Correct: " + numCorrect);
    $("#incorrect-answers").text("Incorrect: " + numIncorrect);
    $("#unanswered").text("Skipped: " + numUnanswered);
  }
}

// function to build trivia questions
var trivia = {

  // pull questions from the array of questions, loope through them and append to html
  displayQuestions: function() {
    var divContainer = $("#questions-box");
    var answerGroup = $(".form-check");
    divContainer.append('<h2>Answer the following questions:</h2>');
            
    for (var i = 0; i < questionBank.length; i++) {

      divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

      var answer1 = questionBank[i].answers[0];
      var answer2 = questionBank[i].answers[1];
      var answer3 = questionBank[i].answers[2];

      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
    }

    // add done button and register click
    var doneButton = '<button class="btn btn-info" id="done-button" type="submit">Done</button>';
    divContainer.append(doneButton);
    $("#done-button").on("click", gameState.stopTimer);
  },

  // test if the user answers are correct, incorrect, or unanswered 
  checkAnswers: function() {
    var correctAnswer;
    var userAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;

    // loop to compare the text with user answers, apply scores
    for (var i = 0; i < questionBank.length; i++) {
      correctAnswer = questionBank[i].correct;
      userAnswer = $('input[id=radio'+i+']:checked + label').text();

      if (userAnswer === correctAnswer) {
        numCorrect++;
      } else if (userAnswer === "") {
        numUnanswered++;
      } else if (userAnswer !== correctAnswer) {
        {
          numIncorrect++;
        }
      }
    }

    // show score on endpage
    gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
  },
}

// question bank of objects array
var questionBank = [
  {
    question: "In the second-generation Pokémon games, which Pokémon can you start with?",
    answers: ["Bulbasaur, Charmander, Squirtle", "Treecko, Torchic, and Mudkip", "Chikorita, Cyndaquil, and Totodile"],
    correct: "Chikorita, Cyndaquil, and Totodile"
  },

  {
    question: "Which of these is not a Pokémon?",
    answers: ["Pikachu", "Aerodactyl", "Bowser"],
    correct: "Bowser"
  },
  {
    question: "Who is the laziest pokemon?",
    answers: ["Blissey", "Snorlax", "Mamoswine"],
    correct: "Snorlax"
  },
  {
    question: "Which pokemon has electric type?",
    answers: ["Pikachu", "Grovyle", "Charizard"],
    correct: "Pikachu"
  },
  {
    question: "How many unown are there?",
    answers: ["22", "24", "26"],
    correct: "26"
  },
  {
    question: "Which eevelution is the fire type?",
    answers: ["Vaporeon", "Umbreon", "Flareon"],
    correct: "Flareon"
  },
  {
    question: "Who is leader of Team Rocket and gym leader of Viridian City?",
    answers: ["Ash", "Professor Oak", "Giovanni"],
    correct: "Giovanni"
  },
  {
    question: "Which types are the least common?",
    answers: ["Fire & Electric", "Water & Dragon", "Fairy & Ghost"],
    correct: "Fairy & Ghost"
  },
  {
    question: "Pokemon was originally released on which device?",
    answers: ["Nintendo", "Atari", "Gameboy"],
    correct: "Gameboy"
  },
  {
    question: "How did ash die?",
    answers: ["Turned to stone", "Vaporized", "Drowned"],
    correct: "Turned to stone"
  }
]
