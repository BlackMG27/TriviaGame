// make the variables
// - make an empty array -
var questions = [];
// get the ajax api
var triviaURL = 'https://opentdb.com/api.php?amount=15&category=22&difficulty=easy&type=multiple';
//to check if the user is answering questions
var isUserAnswering = false;
//sets the questionContainer
var questionContainer = $('<div>');
questionContainer.addClass('question-container');
//sets the results div
var resultsDiv = $('<div>');
resultsDiv.addClass('results-container');
//sets the timer display
var qPageTitle = $('<h1>');
qPageTitle.addClass('page-title');
//sets the time functions
var time = 5.5 * 60;
var timeID;
var currentTime;
var numCorrect;
//create the timer functions
function timeGame() {
        //set the time to minus
        if (!isUserAnswering) {
                timeID = setInterval(count, 1000);
                isUserAnswering = true;
        }

}

function reset() {
        time = 5.5 * 60;
}

function stop() {
        clearInterval(timeID);
}

function count() {
        //set the decrement
        time--;
        //if the time is equal to zero
        if (time === 0) {
                //clear the interval
                clearInterval(timeID);
        }

        if (time === 0 && !isUserAnswering) {
                clearInterval(timeID);
                $('#sub-wrapper-questions').hide('fast');
                $('#sub-wrapper-no-time').show('fast');
                var noTimeTitle = $('<h1>');
                noTimeTitle.addClass('no-time-title');
                noTimeTitle.text('Oh No! You ran out of time!! Want to try again?');

                var noTimeButton = $('<button>');
                noTimeButton.addClass('no-time-button');
                noTimeButton.attr('tabindex', '0');
                noTimeButton.text('Try Again?');

                $('#sub-wrapper-no-time').append(noTimeTitle, noTimeButton);
        }
        //sets time to the current time
        currentTime = timeConverter(time);
        qPageTitle.text(currentTime);
}

//based off the stopwatch class activity
function timeConverter(timeStamp) {
        //converts the time into something readable
        var minutes = Math.floor(timeStamp / 60);
        var seconds = timeStamp - (minutes * 60);

        if (seconds < 10) {
                seconds = "0" + seconds;
        }

        if (minutes === 0) {
                minutes = "00";
        } else if (minutes < 10) {
                minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
}


//functions to prevent multiple appends
function questionReset() {
        var questionRemove = questionContainer.empty();
        return questionRemove;
}

function resultsReset() {
        var resultsRemove = resultsDiv.empty();
        return resultsRemove;
}

//set up initial views
$('#sub-wrapper-questions').hide();
$('#sub-wrapper-results').hide();
$('#sub-wrapper-no-time').hide();

//main function
$(document).ready(function () {
        $('#start-game')
                .on('click', function () {
                        $('#sub-wrapper-start').hide('fast');
                        $('#sub-wrapper-questions').show('fast');
                        //sets the isUserAnswering to start the game
                        !isUserAnswering;
                        timeGame();

                        questionContainer.append(qPageTitle);
                        //add a timer

                        $
                                .ajax({
                                        url: triviaURL,
                                        method: 'GET'
                                })
                                .then(function (data) {
                                        console.log('we got this back!!', data);

                                        for (var i = 0; i < data.results.length; i++) {
                                                questions.push(data.results[i]);
                                                //console.log(questions[i]);
                                        }

                                        // console.log('THIS IS OUR LENGTH~~ questions.length', questions.length);
                                        // console.log(questions[0]); make the questions show up on random
                                        // questions[Math.floor(Math.random() * questions.length)];

                                        for (var i = 0; i < questions.length; i++) {
                                                //console.log('working'); create a div to put inside sub wrapper

                                                var questionDiv = $('<div>');
                                                //give it a class of question title
                                                questionDiv.addClass('question-block');
                                                //questions create a label for the questions
                                                var questionTitle = $('<h4>');
                                                questionTitle.addClass('question-title');
                                                questionTitle.text(questions[i].question);
                                                questionDiv.append(questionTitle);

                                                // create input area
                                                var questionInputs = $('<div>');
                                                questionInputs.addClass('question-slot');
                                                //create radio buttons for correct answer
                                                var correctAns = $('<div>');
                                                var correctAnsInput = $('<input>')
                                                var correctAnsLabel = $('<label>');
                                                //add the attributes and the classes
                                                correctAnsInput.attr('type', 'radio');
                                                correctAnsInput.attr('value', questions[i].correct_answer);
                                                correctAnsInput.addClass('correct')
                                                // correctAnsInput.attr('required'); console.log('RIGHT BEFORE .name!!!',
                                                // questions[i]);
                                                correctAnsInput.attr('tabindex', '0');
                                                correctAnsInput.attr('name', questions[i].question);
                                                correctAnsInput.attr('required', 'true');
                                                correctAns.addClass('qChoice');
                                                //set the label text to the correct answer
                                                correctAnsLabel.text(questions[i].correct_answer);
                                                correctAns.append(correctAnsInput, correctAnsLabel);
                                                // push all of them into the respective divs
                                                questionInputs.append(correctAns);
                                                //set up the incorrect Answers divs
                                                for (var k = 0; k < questions[i].incorrect_answers.length; k++) {
                                                        var choice = $('<div>');
                                                        var choiceInput = $('<input>');
                                                        var choiceLabel = $('<label>')
                                                        choiceInput.attr('type', 'radio');
                                                        choiceInput.attr('name', questions[i].question);
                                                        choiceInput.attr('value', questions[i].incorrect_answers[k]);
                                                        choiceInput.attr('tabindex', '0');
                                                        choice.addClass('qChoice');
                                                        choiceLabel.text(questions[i].incorrect_answers[k]);
                                                        choice.append(choiceInput, choiceLabel);
                                                        questionInputs.append(choice);
                                                }
                                                // make the questions appear in random put into questionDiv. got solution from
                                                // StackOverflow:
                                                // https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-elem
                                                // e nt-order
                                                for (var j = questionInputs.children().length; j >= 0; j--) {
                                                        questionInputs.append(questionInputs.children()[Math.random() * j | 0]);
                                                }
                                                //put questionInputs into questionDiv
                                                questionDiv.append(questionInputs);
                                                //console.log('this is our questions div', questionDiv);

                                                questionContainer.append(questionDiv);

                                                //push all of them into the sub wrapper console.log(questionDiv);
                                        }
                                        //create a submit button and give it class and text
                                        var questionSubmit = $('<button>');
                                        questionSubmit.addClass('question-submit');
                                        questionSubmit.attr('tabindex', '0');
                                        questionSubmit.text('Submit Questions');
                                        questionContainer.append(questionSubmit);
                                        //append container to the sub-wrapper-div
                                        $('#sub-wrapper-questions').append(questionContainer);

                                        /*
                                         */

                                });

                });




        $('form').on('submit', function (event) {
                event.preventDefault();
                isUserAnswering = false;
                //sets the time back to 5:30
                stop();
                reset();
                timeGame();
                // take the values of the checked radio buttons. Got this from tutoring session
                var values = $("input:checked");
                console.log(values);
                numCorrect = 0;
                for (var i = 0; i < values.length; i++) {
                        console.log($(values[i]).hasClass("correct"));
                        if ($(values[i]).hasClass("correct")) {
                                numCorrect++;
                        }
                }

                $('#sub-wrapper-questions').hide('fast');
                $('#sub-wrapper-no-time').hide();
                $('#sub-wrapper-results').show('fast');

                var resultsTitle = $('<h1>');
                resultsTitle.addClass('results-title');
                resultsTitle.text('Here are the results!');

                var resultsTally = $('<h2>');
                resultsTally.addClass('results-tally');

                resultsTally.text('You got ' + numCorrect + ' out of ' + questions.length + '!');

                var resultsButton = $('<button>');
                resultsButton.addClass('results-button');
                resultsButton.attr('tabindex', '0');
                resultsButton.text('Replay Game?');

                resultsDiv.append(resultsTitle, resultsTally, resultsButton);
                $('#sub-wrapper-results').append(resultsDiv);
                console.log('This works!');
                questions = [];
                console.log(questions);
                questionReset();

        });

        $(document).on('click', '.results-button', function () {
                $('#sub-wrapper-results').hide('fast');
                $('#sub-wrapper-start').show('fast');
                resultsReset();
        });

        $(document).on('click', '.no-time-button', function () {
                $('#sub-wrapper-no-time').hide('fast');
                $('#sub-wrapper-start').show('fast');
                stop();
                reset();
                timeGame();
        });

});