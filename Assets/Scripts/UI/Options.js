#pragma strict

public var audioController : AudioController;
public var saveChickens : SaveChickens;
public var musicSlider : UI.Slider;
public var SFXSlider : UI.Slider;

function Start(){
	SetVolumePlayerPrefs();
	saveChickens = FindObjectOfType(SaveChickens);
}

function ToggleFirstPlay(){
	PlayerPrefs.SetInt("FirstRun", 0);
}

function Save(){
	saveChickens.SaveChickens();
}

function Reset(){
	PlayerPrefs.DeleteAll();
	saveChickens.chickens.Clear();
	saveChickens.chickenObjects.Clear();
	SceneManager.LoadScene(0);
	// Set the volume options
	PlayerPrefs.SetFloat("SFXVolume", 1);
	PlayerPrefs.SetFloat("MusicVolume", .5);

}

function AdjustVolume(audioType : String){
	// Get Audio Source
	if (audioType.Contains("Music")){
		// Set Volume
		audioController.musicSource.volume = musicSlider.value;
		// Remember Preferences
		PlayerPrefs.SetFloat(audioType, musicSlider.value);
	}
	else if (audioType.Contains("SFX")){
		audioController.audioSource.volume = SFXSlider.value;
		audioController.loopAudio.volume = SFXSlider.value;
		// Remember Preferences
		PlayerPrefs.SetFloat(audioType, SFXSlider.value);
	}
}

function SetVolumePlayerPrefs(){

	if (PlayerPrefs.GetFloat("MusicVolume") == null){Debug.Log("New Music Volume");PlayerPrefs.SetFloat("MusicVolume", 1);}
	if (PlayerPrefs.GetFloat("SFXVolume") == null){PlayerPrefs.SetFloat("SFXVolume", 1);}

	audioController.musicSource.volume = PlayerPrefs.GetFloat("MusicVolume");
	audioController.audioSource.volume = PlayerPrefs.GetFloat("SFXVolume");
	audioController.loopAudio.volume = PlayerPrefs.GetFloat("SFXVolume");

	if (musicSlider){
		musicSlider.value = PlayerPrefs.GetFloat("MusicVolume");
		SFXSlider.value = PlayerPrefs.GetFloat("SFXVolume");
	}
}