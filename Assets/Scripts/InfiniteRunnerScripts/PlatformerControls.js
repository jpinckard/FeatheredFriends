#pragma strict
/*
This script allows the player to control the chicken in the running mini game by tapping the screen.
*/

private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);

private var controller : CharacterController;
controller = GetComponent.<CharacterController>();

private var animator : Animator;

public var speed : float = 10.0;
public var jumpSpeed : float = 10.0;
public var gravity : float = 10.0;

public var jump : boolean = true;

public var moveDirection : Vector3 = Vector3.zero;

function Start(){animator = References.GetAnimator(gameObject);}

function Update() {
	Jump();
	
	Gravity();

	MoveChicken();
}

function Jump(){
	//If the player is holding a tap,
	if (jump && (Input.touchCount > 0 || Input.GetMouseButton(0))){ // Stationary
		// Then add to the character's height.
		moveDirection.y = jumpSpeed; // * Time.deltaTime
		// Play sound
		//audioController.PlaySound(audioController.jump);
		if (TouchPhase.Began || Input.GetMouseButtonDown(0)){
			// Play jump sound
			audioController.PlaySound(audioController.jump);
			// Animate jump
			animator.SetTrigger("Jump");
		}
	}
}

function Gravity(){
	// If the chicken is in the air and nothing is touching the screen,
	if (!controller.isGrounded){
		moveDirection.y -= gravity * Time.deltaTime;
		// If falling
		if (controller.velocity.y < 0){animator.SetBool("Glide", true);}
		// Stop looping footsteps noise
		//audioController.LoopSound(audioController.footsteps, false);
	}
	else{animator.SetBool("Glide", false);}
	//else{//Loop footsteps noise
	//	audioController.LoopSound(audioController.footsteps, true);
	//}

}

function MoveChicken(){
	// Get move direction
	moveDirection = Vector3(0, moveDirection.y, speed);
	// Transform move direction from local to World
	moveDirection = transform.TransformDirection(moveDirection);
	if(controller.enabled){controller.Move(moveDirection * Time.deltaTime);}
}

@script RequireComponent(CharacterController);