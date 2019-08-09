#pragma strict
/*
This script controls the speed of the game. The speed increases until it reaches a cap.
*/

public var maxSpeed : float = 20;
public var startSpeed : float = 6;
public var modifier : float = .1;

private var controls : PlatformerControls;
controls = gameObject.GetComponent(PlatformerControls);

function Start(){
	controls.speed = startSpeed;
}

function Update(){
	// Checks if controls are enabled to see if the game is paused
	if (controls.speed < maxSpeed && controls.enabled){
		controls.speed += modifier * Time.deltaTime;
	}
}