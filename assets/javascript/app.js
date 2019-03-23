/* app.js       */
/* Trivia Game  */
/* 22/Mar/2019  */


// GLOBAL VARIABLES
// =======================================================================================
var answerTime = 30;   // 30 seconds
var activeQuestNo = 0; // Active question number
var imagesPath = "assets/images/";


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
function processLoadImage () {     // Answer image
// <img src=imagesPath + questions [activeQuestNo].image>
var image = $("<img>");
image.attr ("src", imagesPath + questions [activeQuestNo].image );
image.attr ("class", "img-fluid"); 
image.attr ("alt", questions [activeQuestNo].arrAnswers [
                   questions [activeQuestNo].correctAnswer
                   ] );
$("#imageContainer").append (image);
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

    m = $("#row4");
    m.append (" N o o o  ! ! ! ");
    m.append ("<br>");
    m.append (" The correct answer is:");

    m.append ( rightAnswer () );
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

    m = $("#row4");
    m.append (" Right ! ! ! ");

    m.append ( rightAnswer () );
};
         /*   -  -  -  -  -  -  -  -  -  -   */

function processAnswer (answerNumber) {
    $("#row3").empty ();   // Answers
    if (answerNumber == questions [activeQuestNo].correctAnswer) {
        processUserWins ();
    } else {
        processUserLoses ();
    }
    processLoadImage ();
};

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

    $("#row1").append ('<p class="centered"> Time Remaining: __ Seconds </p>');

    q = $("<p>").text ( questions [activeQuestNo].question );
    q.addClass ("centered");
    $("#row2").append (q);

    createAnswerRows ();
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
