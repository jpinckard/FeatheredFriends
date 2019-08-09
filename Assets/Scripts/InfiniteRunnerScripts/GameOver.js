#pragma strict
/*
This script exists so i can call game over from an animation event.
*/

private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);

public var gameOver : PlatformerMenuNavigation;
gameOver = GameObject.Find("Canvas").GetComponent(PlatformerMenuNavigation);

// Game Over
function GameOver(){gameOver.GameOver();}

// Play the game over sound
function GameOverNoise(){audioController.PlaySound(audioController.gameOver);}