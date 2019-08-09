#pragma strict
/*
This script controls the game's background music.
It allows the music to loop seamlessly from one scene to the next if the music is the same.
It also changes the background music depending on the current scene.
*/
public var mainTheme : AudioClip;
public var raceCompetitionTheme : AudioClip;
public var runningTheme : AudioClip;
public var shopTheme : AudioClip;
public var drumBeat : AudioClip;

private var scene : Scene;
private var source : AudioSource;

// Change Music on start depending on scene
function ChangeMusic(){

	// Get Variables
 	source = gameObject.GetComponent(AudioSource);
	scene = SceneManager.GetActiveScene();

	// The clip that was already playing
	var clip : AudioClip;

	// Our default music is the main theme.
	clip = mainTheme;

	// Set audio depending on scene name
	switch (scene.name) {
		case "InfiniteRunner":
			clip = runningTheme;
			break;
		case "CompetitionRace":
			clip = raceCompetitionTheme;
			break;
		case "Shop":
			clip = shopTheme;
			break;
		case "MemoryGame":
			clip = null;
			break;
	}

	if (clip != source.clip){
		source.clip = clip;
		source.Play();
	}
}