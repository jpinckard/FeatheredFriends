/*
This script is used to transition between scenes. It also controls the scene change animation.
*/

#pragma strict
import UnityEngine.SceneManagement;

private var animator : Animator;
animator = GetComponent(Animator);

public var scene : String = "MainMenu";
public var changeScene : boolean = false;

public var musicController : MusicController;

// Get the music source
function Start(){
	// Get the scene's music
	musicController = GameObject.Find("Controller(Clone)").GetComponent(MusicController);
	musicController.ChangeMusic();
}


function Update(){
	// If the panel is done fading out, load a new scene.
	if (changeScene){SceneManager.LoadScene(scene);}
}

function Fade(action : String){	
	animator.SetBool(action, true);
}

function ChangeScene(newScene : String){
	scene = newScene;
	//Fade("FadeOut");
	SceneManager.LoadScene(newScene);
}