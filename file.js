var playing = false;
var goodAnswers = 0;
var badAnswers = 0;
var action;
var timeRemaining;
var correctAnswer;

/* RESETOWANIE GRY */

document.getElementById("startReset").onclick = function () {
    if (playing == true) {
        /*DO PONOWNEGO ZALADOWANIA STRONY JESLI DAMY RESET */
        location.reload();
        document.getElementById("scoreBoard").style.display = "none";
        document.getElementById("startReset").innerHTML = "PLAY"

    } else {
        document.getElementById("scoreBoard").style.display = "none";
        
        playing = true;

        document.getElementById("correctAnswers").innerHTML = goodAnswers;

        show("timeRemaining");

        timeRemaining = 30;

        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;

        document.getElementById("startReset").innerHTML = "RESET";

        startCountdown();

        generateQuestionsAndAnswer();
    }
}

/* DO SPRAWDZANIA CZY ODPOWIEDZ POPRAWNA */
for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
        if (playing == true) {

            /* JEZELI POPRAWNA ODPOWIEDZ */
            if (this.innerHTML == correctAnswer) {
                goodAnswers++
                document.getElementById("correctAnswers").innerHTML = goodAnswers;

                generateQuestionsAndAnswer();

                /* JEZELI ZLA ODPOWIEDZ */
            } else {
                /*JEZELI ZLA ODPOWIEDZ TO NASTEPNE PYTANIE */
                badAnswers++;
                document.getElementById("wrongAnswers").innerHTML = badAnswers;
                generateQuestionsAndAnswer();
            }
        }
    }

}

/* FUNKCJA LICZĄCA CZAS GRY I WYŚWIETLAJĄCA WYNIK KOŃCOWY */
function startCountdown() {
    action = setInterval(function () {
        timeRemaining -= 1;

        /*JEZELI MINIE CZAS 60 SEKUND TO KONIEC */
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        if (timeRemaining == 0) {
            stopCountdown();

            /* JEZELI MINIE CZAS TO WYSWIETLAMY DIV I UZYSKANY WYNIK */
            document.getElementById("scoreBoard").style.display = "block";

            hide("timeRemaining");
            playing = false;

            /* ROZPOCZECIE GRY OD NOWA */
            document.getElementById("startReset").innerHTML = "PLAY AGAIN"

        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(action);
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

function show(id) {
    document.getElementById(id).style.display = "block";
}

/* GENEROWANIE PYTAN W GRZE */

function generateQuestionsAndAnswer() {
    var x = Math.floor((Math.random() * 10) + 1);
    var y = Math.floor((Math.random() * 10) + 1);

    correctAnswer = x * y;

    document.getElementById("question").innerHTML = x + " x " + y;

    var correctPosition = 1 + Math.round(3 * Math.random());

    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            /* TWORZENIE ZŁYCH ODPOWIEDZI DO GRY */
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            } while (wrongAnswer == correctAnswer && wrongAnswer == wrongAnswer);

            document.getElementById("box" + i).innerHTML = wrongAnswer;
        }
    }
}
