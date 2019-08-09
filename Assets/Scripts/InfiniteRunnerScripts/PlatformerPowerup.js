#pragma strict

private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);

private var coinValue : int = 1;
private var hoopValue : int = 5;
private var val : int;

public enum PowerupType{
	COIN,
	HOOP
}

public var powerupType : PowerupType = PowerupType.COIN;

function Start(){
	switch (powerupType){
		case (PowerupType.COIN):
			val = coinValue;
			break;
		case (PowerupType.HOOP):
			val = hoopValue;
			break;
	}
}

function OnTriggerEnter(other : Collider){
	// If the player enters the trigger,
	if (other.CompareTag("Player")){
		// Disable Trigger
		gameObject.GetComponent(Collider).enabled = false;
		// Do different things depending on the type of powerup.
		switch (powerupType){
			case (PowerupType.COIN):
				val = coinValue;
				// Play the noise
				audioController.PlaySound(audioController.coin);
				break;
			case (PowerupType.HOOP):
				val = hoopValue;
				// Play the noise
				audioController.PlaySound(audioController.hoop);
				break;
		}

		// use the powerup.
		PlayerPrefs.SetInt("Buttons", PlayerPrefs.GetInt("Buttons") + val);
		gameObject.GetComponent(Animator).SetTrigger("Get");
		// Destroy the powerup
		//Destroy(gameObject);
	}
}