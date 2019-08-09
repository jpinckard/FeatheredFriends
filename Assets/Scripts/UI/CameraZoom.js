#pragma strict

/*
This script is used to zoom to specific gameObjects. Attach it to the main camera object!
*/
static var selectedChicken : GameObject;

static var zooming = false;
static var dest : Vector3; // The destination to zoom to

public var originPoint : Vector3;

//////////
// ZOOM //
private var cameraDestination : Transform;
private var cameraTransitionSpeed : float;

static var yBuffer : float = 5; // The distance between the camera and the zoom destination
static var zBuffer : float = -11; // The distance between the camera and the zoom destination

function Start(){ZoomToOrigin();}

function Update(){
	if(zooming){MoveCamera();}
}	

function MoveCamera(){
	// Camera move to box
	Camera.main.transform.position = Vector3.Lerp(Camera.main.transform.position, dest, 1 - Mathf.Exp(-10 * Time.deltaTime));
}

static function ZoomToPos(position : Vector3){
	Drag.allowDrag = false;
	zooming = true;
	// Destination : Bird!
	dest = position;//Vector3(position.x, position.y + yBuffer, position.z + zBuffer);
	//Camera.main.transform.LookAt(dest, Vector3.up);
}

function ZoomToOrigin(){
	ZoomToPos(originPoint);
	DragAndPet.allowDrag = true;
}