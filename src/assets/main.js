let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
const MIN_NUMBER 	= 0;
const MAX_NUMBER 	= 9999;
const STR_LENGTH 	= 4;

function guess()
{
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(attempt.value == "" || answer.value == "")
    	setHiddenFields();
    if(!validateInput(input.value))
    {
    	return false;
    }
    attempt.value++;

    if(getResults(input))
    {
    	setMessage("You Win! :)");
    	showAnswer(true);
    }
    else if(attempt.value >= 10)
    {
    	setMessage("You Lose! :(");
    	showReplay();
    }
    else
    {
    	setMessage("Incorrect, try again.");
    	showAnswer(false);
    }
}

//implement new functions here

function setHiddenFields()
{
	let ans_Num = Math.random();
	let ans_str = "";
	ans_Num = ans_Num * (MIN_NUMBER + MAX_NUMBER) + MIN_NUMBER;
	ans_Num = Math.ceil(ans_Num);
	ans_str = ans_Num.toString();
	while (ans_str.length < STR_LENGTH)
		ans_str = "0" + ans_str;
	
	answer.value = ans_str;
	attempt.value = 0;
}
function setMessage(msg)
{
	let message = document.getElementById("message");
	message.innerHTML = msg;
}
function validateInput(inputGuess)
{
	if(inputGuess.length == 4)
		return true;
	setMessage("Guesses must be exactly 4 characters long.");
	return false;
}
const RESULT_GLYPHS = 
[
	'<span class="glyphicon glyphicon-ok"></span>',
	'<span class="glyphicon glyphicon-transfer"></span>',
	'<span class="glyphicon glyphicon-remove"></span>'
];
function getResults(inputGuess)
{
	let results = document.getElementById('results');
	let ans_str = answer.value;
	let numCorrect = 0;
	let gss_str = inputGuess.toString();
	results.innerHTML +=
	'<div class="row"><span class="col-md-6">' + inputGuess + '</span><div class="col-md-6">';
	for (var i = 0; i < STR_LENGTH; i++)
	{
		if(ans_str.charAt(i) == gss_str.charAt(i))
		{
			results.innerHTML += RESULT_GLYPHS[0];
			numCorrect++;
		}
		else if(ans_str.includes(gss_str.charAt(i)))
			results.innerHTML += RESULT_GLYPHS[1];
		else
			results.innerHTML += RESULT_GLYPHS[2];
	}
	results.innerHTML += "</div>";
	if(numCorrect >= STR_LENGTH)
		return true; //greater than included for errors and answers somehow beyond correct.
	else
		return false;
}

function showAnswer(victory)
{
	let code = document.getElementById("code");
	code.innerHTML = answer.value;
	
	if(victory)
	{
		code.addClass("success");
	}
	else
	{
		code.addClass("failure");	
	}
	showAnswer(victory);
}
function showReplay()
{
	let guessingDiv = document.getElementById("guessing-div");
	let replayDiv = document.getElementById("replay-div");
	guessingDiv.style.display = "none";
	replayDiv.style.display = "block";
}