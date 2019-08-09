#pragma strict

private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);

private var playerController : CharacterController;
playerController = GameObject.FindWithTag("Player").GetComponent(CharacterController);

public var displayUnlocked : DisplayUnlocked;
public var score : Score;

private var animator : Animator;
animator = GetComponent(Animator);

public var gameOverCanvas : GameObject;
public var pauseCanvas : GameObject;

public var hideCanvas : GameObject;
public var racer : Transform;

function Pause(){
	// Play UI sound effect
	audioController.PlaySound(audioController.blopOn);
	// Pause the player
	playerController.enabled = false;
	animator.SetTrigger("In");
	pauseCanvas.gameObject.SetActive(true);
	gameOverCanvas.gameObject.SetActive(false);
	// Stop music
	audioController.audioSource.Stop();
}

function Unpause(){
	// Play UI sound effect
	audioController.PlaySound(audioController.blopOff);
	animator.SetTrigger("Out");
	// Pause the player
	playerController.enabled = true;
	// Play music
	audioController.audioSource.Play();
}

function GameOver(){
	///////////
	// AUDIO //
	// Stop music
	audioController.audioSource.clip = null;

	// Play UI sound effect
	audioController.PlaySound(audioController.blopOff);

	// Play game over music
	audioController.musicSource.clip = audioController.gameOverSong;
	audioController.musicSource.Play();

	// Hide irrelevant UI elements
	hideCanvas.SetActive(false);

	// Pause the player
	playerController.enabled = false;
	animator.SetTrigger("In");
	pauseCanvas.gameObject.SetActive(false);
	gameOverCanvas.gameObject.SetActive(true);

	// Show the unlocked color
	displayUnlocked.UnlockColor(racer.position.x, "Runner");
	// Set and display the ihgh score
	score.SetHighScore("Runner", Mathf.RoundToInt( racer.position.x));
	// Set a new speed for the chicken
	score.SetNewSpeed(Mathf.RoundToInt( racer.position.x), racer.GetComponent(ChickenStats));
}

function UnlockColors(){displayUnlocked.UnlockColor(racer.position.x, "Runner");}