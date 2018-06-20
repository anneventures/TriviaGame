//VARIABLES
var wins=0;
var losses=0;
var unanswered=0;
var counter=10;
var triviaBlock = $("#triviaBlock");


//Do not display trivia questions initially
triviaBlock.css({"display":"none"});


//Once user clicks Play game buton, display trivia questions and call the games' various functions
$("#play").click(function(){

	$("#instructions").css({"display": "none"});	
	triviaBlock.css({"display": "block"});
	myTimer();
	timedTrivia(0,0);
});


//Array of the trivia questions and choices
var allQuestionsArr = [
 	{number: 1,
 	question: 
 		"Question 1: What ingredient in bread causes it to rise?",
 	choices: 
 		["Yeast", "Sugar", "Water", "Flour"],
 	correct: 
 		"Yeast"	
 	},

	{number: 2,
	question: 
 		"Question 2: What nut is traditionally on the Waldorf salad?",
 	choices: 
 		["Pistachio", "Almond", "Walnut", "Cashew"],
 	correct: 
 		"Walnut"	 		
 	},

 	{number: 3,
 	question: 
 		"Question 3: What is sushi traditionally wrapped in?",
 	choices: 
 		["Rice", "Seaweed", "Sashimi", "Carrots"],
 	correct: 
 		"Seaweed"	 		
 	},

 	{number: 4,
 	question: 
 		"Question 4: What food is Hummus made from?",
 	choices: 
 		["Avocado", "Lentils", "Spinach", "Chickpeas"],
 	correct: 
 		"Chickpeas"	 		 	 	
 	},

 	{number: 5,
 	question: 
 		"Question 5: What is the most popular spice in the world?",
 	choices: 
 		["Pepper", "Cinnamon", "Cumin", "Ginger"],
 	correct: 
 		"Pepper"	 		
 	}
]



//Timer for each question
function myTimer() {
	var timer = setInterval(tenSeconds, 1000);
			
	//Ten seconds countdown
	function tenSeconds() {		
		if (counter === 0) {
			clearInterval(timer);
			unanswered++
			console.log("unanswered: " + unanswered);
		}

		if (counter > 0) {
			counter--;
		}

		$("#timer").html("<p>Timer: " + counter + "</p>");
	}


$(document).on("click", ".choice", getClickValue);


	//Get the value of clicked button		
	function getClickValue() {

		clearInterval(timer);
		var buttonName = $(this).attr("data-name");

		if (buttonName==="Yeast") {
			correct();
			timedTrivia(1,3000);			
		} else if ((buttonName==="Sugar") || (buttonName==="Water") || (buttonName==="Flour")) {
			incorrect(0);
			timedTrivia(1,3000);						
		}

		if (buttonName==="Walnut") {
			correct();
			timedTrivia(2,3000);			
		} else if ((buttonName==="Pistachio") || (buttonName==="Almond") || (buttonName==="Cashew")) {
			incorrect(1);
			timedTrivia(2,3000);						
		}

		if (buttonName==="Seaweed") {
			correct();
			timedTrivia(3,3000);			
		} else if ((buttonName==="Rice") || (buttonName==="Sashimi") || (buttonName==="Carrots")) {
			incorrect(2);
			timedTrivia(3,3000);						
		}

		if (buttonName==="Chickpeas") {
			correct();
			timedTrivia(4,3000);
		} else if ((buttonName==="Avocado") || (buttonName==="Lentils") || (buttonName==="Spinach")) {
			incorrect(3);
			timedTrivia(4,3000);
		}

		if (buttonName==="Pepper") {
			$("#timer").html("");
			wins++;		
			$(triviaBlock).html("<p>That's the correct answer! Great work!</p><p>Here are your scores: </p>" + "<p>Wins: " + wins + "</p>" + "<p>Losses: " + losses + "</p>" + "<p>Unanswered: " + unanswered + "</p>");

		} else if ((buttonName==="Cinnamon") || (buttonName==="Cumin") || (buttonName==="Ginger")) {
			$("#timer").html("");
			losses++;		
			$(triviaBlock).html("<p>Sorry, that's incorrect. The answer is Pepper</p><p>Here are your scores: </p>" + "<p>Wins: " + wins + "</p>" + "<p>Losses: " + losses + "</p>" + "<p>Unanswered: " + unanswered + "</p>");
		}		

	}

}//End timer function




//Trivia questions and loop for the choices
function triviaContent(a) {
	var allQuestions = allQuestionsArr[a];
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


//Timer for question feedback content
function timedTrivia(q,t) {
    setTimeout(function(){triviaContent(q)}, t);
}


//When a user clicks on the correct button choice
function correct() {
	$("#timer").html("");
	wins++;		
	$(triviaBlock).html("<p>That's the correct answer! Great work!</p><p>Next page coming up...</p>");		
	
}

function correctQuestions(x) {
	console.log(test);
}
function incorrect(x) {
	
	$("#timer").html("");
	losses++;		
	$(triviaBlock).html("<p>Sorry, that's incorrect. The answer is " + allQuestionsArr[x].correct + "</p><p>Next page coming up...</p>");

}