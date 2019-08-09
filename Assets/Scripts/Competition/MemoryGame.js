#pragma strict
/*
This script controls the Memory Game. 

The memory game displays a list of shapes in a random order, associated with a tone and a pose from your chicken.
For each shape in the list, the shape is displayed, then paused for a certain amount of time, and then the next shape is shown.
Once all shapes have been displayed, the button list appears and the player can choose the shapes in the order they came in.
Every turn, a new shape is added to the list.
The game continues until the Player loses.

I'd like to have several modes : Easy, Medium, Hard, and Infinite.

The whole, entire game can be controlled from this one script - there's no external involvement other than some sound effects and scoring.

Of course, you'll have to set up your UI - all you need are some buttons with a parent that has a canvas group and an image to show the current displayed shape.

You'll also need some shape sprites and music, of course.
*/

public var chickenBlink : ChickenBlink;
public var displayUnlocked : DisplayUnlocked;
public var audioController : AudioController;
public var scoreKeeper : Score;

public var chickenAnimator : Animator; // Used to animate the chicken
public var animator : Animator; // Used to animate the displayimage
public var gameOver : Animator; // Animates the gameOver panel

public var chickenStats : ChickenStats;

// Show heart particles
public var hearts : ParticleSystem;

////////////
// SHAPES //
// A list of all possible shapes.
public var allShapes : List.<Sprite> = List.<Sprite>();
// A list of the shapes in the order they appeared.
private var memoryList : List.<Sprite> = List.<Sprite>();
// A list of the shapes the player chose.
private var playerShapes : List.<Sprite> = List.<Sprite>();

///////////////
// INTERFACE //
// The image that displays the shapes.
public var shapeImage : UI.Image;
// The panel holding the shape buttons
public var buttonPanel : GameObject;
// For displaying scores at the end of the game
public var highScoreText : UI.Text;

///////////////
// MECHANICS //
// Did the player submit the incorrect shape?
private var lose : boolean = false;
// The number of turns the player lasted.
public var score : int = 0;
public var scoreText : UI.Text;
public var scoreModifier : int = 50;
// The duration of time for a shape to be displayed
public var displayTime : float;
// The number of shapes to display initially.
public var startNum : int; 

////////////
///COLORS///
public var starColor : Color;
public var squareColor : Color;
public var circleColor : Color;
public var triangleColor : Color;

function FirstTurn(){
	// Get animator by age
	chickenAnimator = References.GetAnimator(chickenStats.gameObject);
	// Generate the starting shapes
	GenerateShape(startNum);
	// Display the starting shapes.
	DisplayShapes();
}

// Submits the player's choice and starts a new turn.
function SubmitChoice(){
	//////////////
	// NEW TURN //
	if (!lose){
		Success();
		// Clear the player's list
		playerShapes.Clear();
		// Add a new shape to the list for next time.
		GenerateShape(1);
	}
	else{Failure();}

}

// Add a new shape to the list of shapes to memorize.
function GenerateShape(newShapeNum : int){
	for (var i : int; i < newShapeNum; i++){memoryList.Add(allShapes[Random.Range(0, allShapes.Count)]);}
}

// Display all of the shapes to memorize.
function DisplayShapes(){
	// Show the image panel
	ToggleUI(true);
	chickenAnimator.SetBool("Idle", false);
	for (var i : int; i < memoryList.Count; i++){
		// Show the shape
		shapeImage.sprite = memoryList[i];
		// Set the color
		SetColor(memoryList[i]);
		// Play the animation
		animator.SetTrigger("MemoryShapeTransition");
		// Play a different sound for each shape
		PlayShapeSound(memoryList[i]);
		// Play chicken animation
		chickenAnimator.SetTrigger(memoryList[i].name);
		// Display the shape for a moment
		yield WaitForSeconds(displayTime); 
	}
	ToggleUI(false);
	// Rest the chicken
	chickenAnimator.SetBool("Idle", true);
}

function ToggleUI(showImage : boolean){
	buttonPanel.GetComponent(CanvasGroup).interactable = !showImage;
	if (!showImage){buttonPanel.GetComponent(CanvasGroup).alpha = 1;}
	else{buttonPanel.GetComponent(CanvasGroup).alpha = .5;}
	shapeImage.gameObject.SetActive(showImage);
}

// Run when the player presses a shape button. It adds a new shape to their list of chosen shapes.
function MemoryButton(shape : Sprite){
	// Stop idle animation
	chickenAnimator.SetBool("Idle", false);
	// Play the sound associated with the shape
	PlayShapeSound(shape);
	// Play chicken animation
	chickenAnimator.SetTrigger(shape.name);
	// Add the shape to the list
	playerShapes.Add(shape);
	// Check for correctness
	if (playerShapes[playerShapes.Count-1] != memoryList[playerShapes.Count-1]){lose = true;}
	// If the player has submitted the appropriate number of options, submit their choice.
	if (playerShapes.Count == memoryList.Count){SubmitChoice();}
}


function Success(){
	// Iterate Score
	score += scoreModifier;
	scoreText.text = score.ToString();
	// Wait a little bit for the music to finish
	yield WaitForSeconds(.2);
	// Show happy chicken
	chickenAnimator.SetTrigger("Happy");
	// Play success noise
	audioController.PlaySound(audioController.success2);
	// show particles
	hearts.Play();
	// Display next turn
	yield WaitForSeconds(1);
	// Stop particles
	hearts.Stop();
	// Show the shapes to memorize
	DisplayShapes();
}

function Failure(){
	// Hide buttons
	buttonPanel.SetActive(false);
	// Wait a little bit for the music to finish
	yield WaitForSeconds(.1);
	// Show sad chicken
	chickenAnimator.SetTrigger("Trip");
	chickenBlink.EyeToggle(true);
	// Play failure noise
	audioController.PlaySound(audioController.gameOver);
	// Wait for the trip animation to finish
	yield WaitForSeconds(1);
	// show gameOver UI
	displayUnlocked.UnlockColor(score, "Memory");
	// Set High Score
	scoreKeeper.SetHighScore("Memory", score);
	// Set new speed
	scoreKeeper.SetNewSpeed(score, chickenStats);
	// Show gameover canvas
	gameOver.SetTrigger("In");
	// Loop Music
	audioController.LoopSound(audioController.gameOverSong, true);
	this.enabled =false;

}

// Resets the player's choice.
function RestartChoice(){playerShapes.Clear();lose=false;}

function SetColor(shape : Sprite){
	switch (shape.name){
		case "Triangle": shapeImage.color 	    =	triangleColor;break;
		case "Star": shapeImage.color           =	starColor;break;
		case "Square": shapeImage.color 		=	squareColor;break;
		case "Circle": shapeImage.color =	circleColor;break;
	}
}

function PlayShapeSound(shape : Sprite){
	switch (shape.name){
		case "Triangle": 		audioController.PlaySound(audioController.ANote);break;
		case "Star": 			audioController.PlaySound(audioController.BNote);break;
		case "Square": 			audioController.PlaySound(audioController.CNote);break;
		case "Circle":  audioController.PlaySound(audioController.ENote);break;
	}
}

function UnlockColors(){displayUnlocked.UnlockColor(score, "Memory");}