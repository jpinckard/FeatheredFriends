#pragma strict

private var gameOver : PlatformerMenuNavigation;
gameOver = GameObject.Find("Canvas").GetComponent(PlatformerMenuNavigation);

private var audioController : AudioController;
audioController =  GameObject.FindWithTag("MainCamera").GetComponent(AudioController);

function OnTriggerEnter(other : Collider){
	// If the player enters the trigger, end the game.
	if (gameOver && other.CompareTag("Player")){
		other.GetComponent(Collider).enabled = false;
		other.GetComponent(CharacterController).enabled = false;
		// Set GameOver Animation for chicken
		if(other.gameObject.GetComponent(ChickenStats).chicken.age == 1){
			other.transform.Find("Chick").GetComponent(Animator).SetTrigger("GameOver");}
		else{
			other.transform.Find("Hen").GetComponent(Animator).SetTrigger("GameOver");}
		// Set game over animation for bomb
		if (gameObject.name.Contains("Sphere")){
			transform.parent.transform.parent.GetComponent(Animator).SetTrigger("ObstacleTrigger");
			audioController.PlaySound(audioController.explosion);
		}
		//gameOver.GameOver();
		gameOver = null;
	}
}