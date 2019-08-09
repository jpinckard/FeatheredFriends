#pragma strict
/*
This script send the attached gameObject along a path.s
*/
// Scripts
public var controller : CharacterController;
controller = GetComponent.<CharacterController>();

private var chooseLevel : ChooseLevel;

// Animations
private var anim : Animator;
public var spawnpoint : Transform;
@HideInInspector
public var animParameter : String = "Idle"; // The name of the parameter that will play the animation

// Movement
public var moveDirection : Vector3 = Vector3.zero;
public var baseSpeed : float;
public var speed : float;
private var speedModifier : float = .5;
private var gravity : float = 20.0;

// Path Following // Waypoints set in ChooseLevel
//@HideInInspector
public var waypoints : List.<Transform> = List.<Transform>();
private var waypoint : int = 0;

function Start(){
	anim = References.GetAnimator(gameObject);

	// If difficulty is null, set it to one.
	if (!chooseLevel.difficulty){chooseLevel.difficulty = 1;}

	// Set speed for all racers.
	speed = gameObject.GetComponent(ChickenStats).chicken.speed * speedModifier;

	// Adjust competitor stats based on difficulty level.
	if (gameObject.name != "Player"){speed *= chooseLevel.difficulty;}
	else if (speed <= 1){speed = 1;}
	baseSpeed = speed;
}

function Update() {
	// Move to spawnpoint
	if (spawnpoint){GoToPodium();}
	// Or follow a path
	else if (waypoints.Count > 0){
		FollowPath();
		//if (!controller.isGrounded){transform.rotation.y = 0;}
	}
}

function GoToPodium(){
	if (spawnpoint.position != transform.position){
		transform.position = Vector3.MoveTowards(transform.position, spawnpoint.position, .5);
		transform.LookAt(spawnpoint.position);
	}
	// Set spawnpoint as parent and rotate to face camera
	else{
		transform.parent = spawnpoint;
		transform.rotation.y = 180;
		// Still the chicken
		anim.SetBool(animParameter, true);
		this.enabled = false;

	}
}

function FollowPath(){

	var offset : Vector3 = waypoints[waypoint].position - transform.position;

	if (offset.magnitude > 1){

		offset = offset.normalized * speed;
		moveDirection = offset;
		// Apply Gravity
		if (!controller.isGrounded){
			moveDirection.y = -gravity;
		}
		// Move Controller
		controller.Move(moveDirection * Time.deltaTime);
	}
	else{
		// Iterate the waypoint
		waypoint += 1;
		if (waypoint >= waypoints.Count){waypoint = 0;}
		// Look at the waypoint
		transform.LookAt(waypoints[waypoint].position);
	}
}