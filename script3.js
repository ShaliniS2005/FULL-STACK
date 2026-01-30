$(document).ready(function () {

    var quizQuestions = [
        { question: "Which language is used for web pages?", options: ["Java", "C", "JavaScript", "Python"], answer: "JavaScript" },
        { question: "jQuery is a?", options: ["Language", "Library", "Database", "Browser"], answer: "Library" },
        { question: "Which selector selects ID?", options: [".", "#", "*", "%"], answer: "#" },
        { question: "HTML stands for?", options: ["Hyper Tool", "Hyper Text Markup Language", "High Text", "None"], answer: "Hyper Text Markup Language" },
        { question: "CSS is used for?", options: ["Logic", "Database", "Styling", "Server"], answer: "Styling" },
        { question: "Which tag creates link?", options: ["<a>", "<link>", "<href>", "<p>"], answer: "<a>" },
        { question: "JavaScript runs in?", options: ["Server", "Browser", "Compiler", "OS"], answer: "Browser" },
        { question: "Bootstrap is a?", options: ["Library", "Framework", "Language", "Tool"], answer: "Framework" },
        { question: "Which is frontend?", options: ["PHP", "Node", "HTML", "Python"], answer: "HTML" },
        { question: "Which symbol for class selector?", options: ["#", ".", "*", "&"], answer: "." }
    ];

    var currentIndex = 0;
    var userAnswers = [];
    var score = 0;
    var timeLeft = 10;
    var timer;

    function startTimer() {
        clearInterval(timer);
        timeLeft = 10;
        $("#time").text(timeLeft);

        timer = setInterval(function () {
            timeLeft--;
            $("#time").text(timeLeft);

            if (timeLeft === 0) {
                clearInterval(timer);
                $("#nextBtn").click();
            }
        }, 1000);
    }
    function loadQuestion(index) {
        $("#quiz-section").hide().fadeIn(500);
        $("#question-number").text("Question " + (index + 1) + " of 10");
        $("#question-text").text(quizQuestions[index].question);
        $("#options").empty();
        $.each(quizQuestions[index].options, function (i, option) {
            var checked = userAnswers[index] === option ? "checked" : "";
            $("#options").append(
                `<label>
                    <input type="radio" name="option" value="${option}" ${checked}>
                    ${option}
                </label>`
            );
        });
        $("#prevBtn").toggle(index !== 0);
        $("#nextBtn").text(index === 9 ? "Submit" : "Next");
        startTimer();
    }
    $("#nextBtn").click(function () {
        var selected = $("input[name='option']:checked").val();
        if (!selected && timeLeft > 0) {
            alert("Please select an answer!");
            return;
        }
        userAnswers[currentIndex] = selected || "";
        if (currentIndex === 9) {
            calculateScore();
            $("#quiz-section").hide();
            $(".timer").hide();
            $("#result-section").fadeIn();
        } else {
            currentIndex++;
            loadQuestion(currentIndex);
        }
    });

    $("#prevBtn").click(function () {
        currentIndex--;
        loadQuestion(currentIndex);
    });

    function calculateScore() {
        score = 0;
        for (var i = 0; i < quizQuestions.length; i++) {
            if (userAnswers[i] === quizQuestions[i].answer) {
                score++;
            }
        }
        $("#score-text").text("You scored " + score + " out of 10");
    }

    $("#restartBtn").click(function () {
        currentIndex = 0;
        userAnswers = [];
        score = 0;
        $(".timer").show();
        $("#result-section").hide();
        $("#quiz-section").fadeIn();
        loadQuestion(currentIndex);
    });

    loadQuestion(currentIndex);
});
