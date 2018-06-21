//VARIABLES
var wins=0;
var losses=0;
var unanswered=0;
var triviaBlock = $("#triviaBlock");
var timerBlock = $("#timer");
var counter=11;
var arrCount = 0;
var timer;


//Do not display trivia questions initially
triviaBlock.hide();


//Once user clicks Play game buton, display trivia questions and call the games' various functions
$("#play").click(function(){

	$("#instructions").hide();
	triviaBlock.show();

	displayQuestions();
	myTimer();

});


$(document).on("click", ".choice", function(event){

	selectedChoice = $(this).text();

	if (selectedChoice===correctAnswersArr[arrCount]) {
		clearInterval(timer);
		correctAnswer();
	} else {
		clearInterval(timer);		
		wrongAnswer();
	}
});

$(document).on("click", ".reset", function(event){

	playAgain();
});



//Array of the trivia questions and choices
var allQuestionsArr = [
 	{question: 
 		"Question 1: What ingredient in bread causes it to rise?",
 	choices: 
 		["Yeast", "Sugar", "Water", "Flour"]
 	},

	{question: 
 		"Question 2: What nut is traditionally on the Waldorf salad?",
 	choices: 
 		["Pistachio", "Almond", "Walnut", "Cashew"]
 	},

 	{question: 
 		"Question 3: What is sushi traditionally wrapped in?",
 	choices: 
 		["Rice", "Seaweed", "Sashimi", "Carrots"]
 	},

 	{question: 
 		"Question 4: What food is Hummus made from?",
 	choices: 
 		["Avocado", "Lentils", "Spinach", "Chickpeas"]
 	},

 	{question: 
 		"Question 5: What is the most popular spice in the world?",
 	choices: 
 		["Pepper", "Cinnamon", "Cumin", "Ginger"]
 	}
];


var correctAnswersArr = ["Yeast", "Walnut", "Seaweed", "Chickpeas", "Pepper"];


function displayQuestions() {
	
	$(triviaBlock).html(triviaContent(arrCount));

}


function questionCount() {
	if (arrCount < 4) {
		arrCount++;
		displayQuestions();
		counter=11;
		myTimer();
	} else {
		scorePage();
	}
}


//Timer for each question
function myTimer() {

	timer = setInterval(tenSeconds, 1000);

	//Ten seconds countdown
	function tenSeconds() {
		
		if (counter === 0) {
			clearInterval(timer);
			noAnswer();		
		}

		if (counter > 0) {
			counter--;
		}

		$("#timer").html("<p>Timer: " + counter + "</p>");
	}

}


function noAnswer() {
	unanswered++;
	$(triviaBlock).html("<p>Sorry, time's up! The correct answer is </p>" + correctAnswersArr[arrCount]);

	setTimeout(questionCount, 3000);
}


function correctAnswer() {
	wins++;
	$(timerBlock).html("");	
	$(triviaBlock).html("<p>That's correct! Great work!</p>");
	setTimeout(questionCount, 3000);
}

function wrongAnswer() {
	losses++;
	$(timerBlock).html("");		
	$(triviaBlock).html("<p>Sorry, that's wrong! The correct answer is </p>" + correctAnswersArr[arrCount]);
	setTimeout(questionCount, 3000);	
}

function scorePage() {
	$(timerBlock).html("");		
	$(triviaBlock).html("<p>Thanks for playing the game! Here's your score details: </p><p>Wins: " + wins + "</p><p>Losses: " + losses + "</p><p>Unanswered: " + unanswered + "</p><button class='reset'>Play again!</button>");	
}

function playAgain() {
	arrCount = 0;
	wins = 0;
	losses = 0;
	unanswered = 0;
	counter = 11;
	displayQuestions();
	myTimer();
}



//Trivia questions and loop for the choices
function triviaContent(x) {
	var allQuestions = allQuestionsArr[x];
	var allChoices = allQuestions.choices;
	var eachQuestion = allQuestions.question;
	$(triviaBlock).html("<p>"+ eachQuestion + "</p>");
	var buttonContainer = $("<div>");

	for (var i=0; i<allChoices.length; i++) {
		var myButton = $("<button>");
		myButton.addClass("choice");
		myButton.attr("data-name", allChoices[i]);
		myButton.text(allChoices[i]);
		buttonContainer.append(myButton);
		$(triviaBlock).append(myButton);
	}
}

