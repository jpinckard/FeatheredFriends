#pragma strict
/*
This script spawns pwoerups and obstacles at random positions as the chicken runs along.

Tips!

If you have an object that's at all large, you need to add an object called LengthObject as its child to indicate length. The obj can be invisible and must have a renderer.
*/

private var objectPosition : float;

public var spawners : List.<Transform> = List.<Transform>();
public var spawnObjects : List.<GameObject> = List.<GameObject>();
public var testSpawnObjects : List.<GameObject> = List.<GameObject>();

public var spawnDistMin : float = 7f;
public var spawnDistMax : float = 12;

// Ground Spawn Variables
public var groundBlockPrefab : GameObject;
public var groundSpawner : Transform;

public var player : Transform;
private var playerPosition : float;
private var groundPosition : Vector3;
// The length of a groundBlock
private var groundLength : float = 7.5;

function Start(){
	playerPosition = player.position.x;
	groundPosition = groundSpawner.position;
	objectPosition = spawners[0].position.x;
}

function FixedUpdate(){
	SpawnGround();
	if (testSpawnObjects.Count > 0){;objectPosition = Spawn(spawnDistMin, spawnDistMax, testSpawnObjects, spawners, objectPosition);}
	else{objectPosition = Spawn(spawnDistMin, spawnDistMax, spawnObjects, spawners, objectPosition);}
}

function Spawn(spawnMin : float, spawnMax : float, objects : List.<GameObject>, spawners : List.<Transform>, objectPosition : float){
	// If the player has moved far enough to spawn a new object
	if (player.position.x >=  (objectPosition - (groundLength * 2))){

		var object : GameObject = objects[Random.Range(0, objects.Count)];

		// Get the spawner
		var spawner : Transform = spawners[Random.Range(0, spawners.Count)];

		// Add the object length to its position to avoid clipping
		if (object.transform.Find("LengthObj")){
			objectPosition += (object.transform.Find("LengthObj").GetComponent(Renderer).bounds.size.y*2);
		}

		// Spawn the next object at a random spot just beyond the player's line of sight
		objectPosition += Random.Range(spawnMin, spawnMax);

		// Create the prefab at the spawner's position and rotation
		Instantiate(object, Vector3(objectPosition, spawner.position.y, spawner.position.z), spawner.rotation);
	}
	return objectPosition;
}

function SpawnGround(){
	if (player.position.x >= groundPosition.x - (groundLength * 2)){
		Instantiate(groundBlockPrefab, groundPosition, groundSpawner.rotation);
		groundPosition.x += groundLength;
		playerPosition = player.position.x;
	}
}	