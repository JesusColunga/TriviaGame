/* app.js       */
/* Trivia Game  */
/* 22/Mar/2019  */


// GLOBAL VARIABLES
// =======================================================================================
var answerTime        = 10;   // 30 seconds for the user to answer the question
var pauseTime         = 10;   // 10 seconds pause between questions; to show the answer
var activeQuestNo     = 0; // Active question number
var imagesPath        = "assets/images/";
var countOkAnswers    = 0;
var countWrongAnswers = 0;
var countNotAnswered  = 0;
var time              = 0;
var intervalId;   //  Variable that will hold our setInterval that runs the timer
var pauseId;      //  Variable for setTimeout ()


// OBJECTS
// =======================================================================================
var q1 = {
    question:      "What, now retired, NBA player starred in the 1996 movie Kazaam?",
    arrAnswers:    ["Jeremy Irons", "Ian McKellen", "Shaquille O’Neal", "Sidney Poitier"],    // Shaquille O’Neal
    correctAnswer: 2,
    image:         "kazaam.jpg"
};

var q2 = {
    question:      "The first atom bomb was successfully tested in which U.S. state?",        // New Mexico
    arrAnswers:    ["Colorado", "New Mexico", "Arizona", "Nevada"],
    correctAnswer: 1,
    image:         "2000px-New_Mexico_in_United_States.svg.png"
};

var q3 = {
    question:      "Most brands of of the liquor soju are made in which country?",            // South Korea
    arrAnswers:    ["Hong Kong", "North Korea", "Japan", "South Korea"],
    correctAnswer: 3,
    image:         "KR.jpg"
};

var q4 = {
    question:      "Victorian writers Charlotte, Emily, and Anne were sisters sharing what last name?",  // Brontë
    arrAnswers:    ["Nelson", "Brontë", "Abraham", "Abed"],
    correctAnswer: 1,
    image:         "250px-Painting_of_Brontë_sisters.png"
};

var q5 = {
    question:      "IKEA, the ready-to-assemble furniture company, has its headquarters located in what country?",  // The Netherlands
    arrAnswers:    ["The Netherlands", "U.S.A.", "Sweden", "Australia"],
    correctAnswer: 0,
    image:         "Ikea-Netherlands.jpg"
};

var questions = [q1, q2, q3, q4, q5];


// FUNCTIONS (Definition)
// =======================================================================================
function processEndGame () {
    var m = $("#row4");   // Messages
    m.append (" Number of correct answers:        " + countOkAnswers    );
    m.append ("<br>");
    m.append (" Number of wrong answers:          " + countWrongAnswers );
    m.append ("<br>");
    m.append (" Number of questions not answered: " + countNotAnswered  );
    m.append ("<br>");
    // aqui falta boton para restart
};

function processNextQuestion () {
    clearTimeout (pauseId);
    $("#row1").empty ();   // Time Remaining
    $("#row2").empty ();   // Questions
    $("#row4").empty ();   // Messages
    $("#row5").empty ();   // Images

    activeQuestNo ++;

    if (activeQuestNo < questions.length) {
        $("#row1").append ('<p class="centered"> Time Remaining: 00:' + answerTime + ' Seconds </p>');

        q = $("<p>").text ( questions [activeQuestNo].question );
        q.addClass ("centered");
        $("#row2").append (q);

        createAnswerRows ();

        time = answerTime;
        intervalId = setInterval (count, 1000);
    } else {
        processEndGame ();
    }
};

function processLoadImage () {     // Answer image
    var image = $("<img>");
    image.attr ("src", imagesPath + questions [activeQuestNo].image );
    image.attr ("class", "img-fluid"); 
    image.attr ("alt", questions [activeQuestNo].arrAnswers [
                    questions [activeQuestNo].correctAnswer
                    ] );
    $("#imageContainer").append (image);
    
    pauseId = setTimeout (processNextQuestion, pauseTime * 1000);
};

         /*   -  -  -  -  -  -  -  -  -  -   */
function rightAnswer () {
    var a = "<h4 class='centered'>";
    a += questions [activeQuestNo].arrAnswers [
            questions [activeQuestNo].correctAnswer ];
    a += "</h4>";

    return a;
};

         /*   -  -  -  -  -  -  -  -  -  -   */
function loadTimeImage () {
// 
    var image = $("<img>");
    image.attr ("src", imagesPath + "giphy.gif" );
    image.attr ("class", "img-fluid"); 
    image.attr ("alt", "Time out" );

    $("#row4").append ( '<div class="card" style="max-width: 5rem;" id="imageAnswer"> </div>' );
    $("#imageAnswer").append (image);
};

function processUserDidNotAnswer () {
    var m;   // Message 
    var a;   // Answer

    loadTimeImage ();

    m = $("#row4");   // Messages
    m.append (" Time  O U T  ! ! ! ");
    m.append ("<br>");
    m.append (" The correct answer is:");

    m.append ( rightAnswer () );
    
    countNotAnswered += 1;
};

         /*   -  -  -  -  -  -  -  -  -  -   */
function loadWrongImage () {
    var image = $("<img>");
    image.attr ("src", imagesPath + "1095398_24641622.jpg" );
    image.attr ("class", "img-fluid"); 
    image.attr ("alt", "Wrong answer" );

    $("#row4").append ( '<div class="card" style="max-width: 5rem;" id="imageAnswer"> </div>' );
    $("#imageAnswer").append (image);
};

function processUserLoses () {
    var m;   // Message 
    var a;   // Answer

    loadWrongImage ();

    m = $("#row4");   // Messages
    m.append (" N o o o  ! ! ! ");
    m.append ("<br>");
    m.append (" The correct answer is:");

    m.append ( rightAnswer () );

    countWrongAnswers += 1;
};

         /*   -  -  -  -  -  -  -  -  -  -   */
function loadOkImage () {
    var image = $("<img>");
    image.attr ("src", imagesPath + "mark-35780_960_720-e1464322717381.png" );
    image.attr ("class", "img-fluid"); 
    image.attr ("alt", "Right answer" );

    $("#row4").append ( '<div class="card" style="max-width: 5rem;" id="imageAnswer"> </div>' );
    $("#imageAnswer").append (image);
};

function processUserWins () {
    var m;   // Message 
    var a;   // Answer

    loadOkImage ();

    m = $("#row4");   // Messages
    m.append (" Right ! ! ! ");

    m.append ( rightAnswer () );

    countOkAnswers += 1;
};
         /*   -  -  -  -  -  -  -  -  -  -   */

function processNoAnswer () {
    clearInterval (intervalId);
    $("#r3Answers").empty ();   // Answers
    processUserDidNotAnswer ();
    processLoadImage ();
};

function processAnswer (answerNumber) {
    clearInterval (intervalId);
    $("#r3Answers").empty ();   // Answers
    if (answerNumber == questions [activeQuestNo].correctAnswer) {
        processUserWins ();
    } else {
        processUserLoses ();
    }
    processLoadImage ();
};

/* =======================  Time  ======================= */
function timeConverter(t) {
    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    return minutes + ":" + seconds;
  }
  
  
function count() {
    var t = timeConverter (time);

    $("#row1").html ( '<p class="centered"> Time Remaining: ' + t + ' Seconds </p>' ); 

    if (time > 0) {
        time --;
    } else {
        processNoAnswer ();
    }
  }
 /* =======================  Time  ======================= */
 

function createAnswerRows () {
    var a;   // Answers

    for (ct = 0; ct < questions [activeQuestNo].arrAnswers.length; ct ++) {
        a = $('<button type="button">');
        a.addClass ("btn  btn-outline-primary");
        a.attr ("data-answ", ct)
        a.append ( questions [activeQuestNo].arrAnswers [ct] );
        $("#r3Answers").append (a);
    } 
}

function iniciar () {
    var q;   // Question
    activeQuestNo = 0;

    $("#start").empty ();   // Deletes Start button

    $("#row1").append ('<p class="centered"> Time Remaining: 00:' + answerTime + ' Seconds </p>');

    q = $("<p>").text ( questions [activeQuestNo].question );
    q.addClass ("centered");
    $("#row2").append (q);

    createAnswerRows ();

    time = answerTime;
    intervalId = setInterval (count, 1000);
};


// FUNCTION CALLS (Execution)
// =======================================================================================
$(document).ready(function() {
    $("#startBtn").on ("click", function () {
        iniciar ();
    });

    $(".answer").on ("click", ".btn", function () {
        processAnswer ( $(this).attr ("data-answ") );
    });
}); // document.ready
