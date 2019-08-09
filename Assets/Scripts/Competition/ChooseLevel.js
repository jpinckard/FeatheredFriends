#pragma strict
/*
This script sets up the level.
*/

// Actual speed is set in CompetitionRaceRun.

public var competitionDetermineWinner : CompetitionDetermineWinner; 
static var difficulty : int;
static var difficultyLevel : String = '1';
static var prize : GameObject;
static var prizeType : String;
static var stage : String;
static var racerAChickenStats : Chicken;
static var racerBChickenStats : Chicken;

// The variables associated with this level
public var difficultySetting : float;
public var level : String;
public var prizePrefab : GameObject;
public var prizeItemType : String;
public var stageType : String;
public var racerAChicken : Chicken;
public var racerBChicken : Chicken;
public var racerA : GameObject;
public var racerB : GameObject;

// The gameObject that holds all of the racers
public var racers : Transform;
public var racerPositions : List.<Transform> = List.<Transform>();
// All of the individual racers
public var racerList : List.<Transform> = List.<Transform>();
// All of the level setups
public var levels : List.<GameObject> = List.<GameObject>();
public var stages : List.<GameObject> = List.<GameObject>();
public var paths : List.<Transform> = List.<Transform>();
@HideInInspector
public var path : Transform;

function Start(){
	if (!stage){
		stage = "Patchwork";
		difficultyLevel = '8';
		difficulty = 15;
	}
	SetLevel();
}

function ChangeDifficulty(){
	this.difficultyLevel = level;
	this.difficulty = difficultySetting;
	this.prize = prizePrefab;
	this.prizeType = prizeItemType;
	this.stage = stageType;
	this.racerAChickenStats = racerAChicken;
	this.racerBChickenStats = racerBChicken;
}

// Position the racers on the track according to the difficulty level.
function SetLevel(){
	// Position racers
	if(racers){
		if(racerAChickenStats){
			racerA.GetComponent(ChickenStats).chicken = racerAChickenStats;
			racerB.GetComponent(ChickenStats).chicken = racerBChickenStats;
		}

		for (var i : int; i < racerPositions.Count; i++){
			if (racerPositions[i].name == difficultyLevel){
				racers.position = racerPositions[i].position;
				racers.rotation = racerPositions[i].rotation;
			}
		}
		// Enable the proper stage
		for (i =0; i < stages.Count; i++){
			if (stages[i].name.Contains(stage)){stages[i].SetActive(true);}
			else{stages[i].SetActive(false);}
		}
		// Enable the proper level
		for (i =0; i < levels.Count; i++){
			if (levels[i].name.Contains(difficultyLevel)){levels[i].SetActive(true);}
			else{levels[i].SetActive(false);}
		}
		// Set the players' path
		for (i =0; i < paths.Count; i++){
			if (paths[i].gameObject.name.Contains(difficultyLevel)){path = paths[i];}
		}

		// Set the waypoints in the players' path
		for (i =0; i < racerList.Count; i++){
			var racerPath : Transform;
			// Get Path
			racerPath = path.Find("Path" + racerList[i].name);
			// Set Waypoints
			for (var k : int =0; k < racerPath.childCount; k++){
				// Add Waypoint
				racerList[i].GetComponent(CompetitionRaceRun).waypoints.Add(racerPath.GetChild(k));
			}
			// Look At First Waypoint
			racerList[i].LookAt(racerPath.GetChild(0));
		}
	}
}
