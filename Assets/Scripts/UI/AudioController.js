#pragma strict

///////////////////////
//// SOUND EFFECTS ////
public var audioSource : AudioSource;
public var loopAudio : AudioSource;
@HideInInspector
public var musicSource : AudioSource;
public var musicSourcePrefab : GameObject;

// Buttons
public var button : AudioClip;
public var blop : AudioClip;
public var bloop : AudioClip;
public var blopOn : AudioClip;
public var blopOff : AudioClip;
public var jump : AudioClip;
public var doubleJump : AudioClip;

// SFX
public var shaking : AudioClip;
public var petting : AudioClip;
public var musicBox : AudioClip;
public var chick : AudioClip;
public var chooseLevel : AudioClip;
public var money : AudioClip;
public var coin : AudioClip;
public var hoop : AudioClip;
public var success1 : AudioClip;
public var success2 : AudioClip;
public var gameOver : AudioClip;
public var gameOverSong : AudioClip;
public var bite : AudioClip;
public var newRecord : AudioClip;
public var love : AudioClip;
public var footsteps : AudioClip;
public var trip : AudioClip;
public var cheer : AudioClip;
public var explosion : AudioClip;

//Piano Notes
public var ANote : AudioClip;
public var BNote : AudioClip;
public var CNote : AudioClip;
public var ENote : AudioClip;

// DON'T FORGET TO SWAP THIS CLIP!! NOT IN PUBLIC DOMAIN!!
public var trumpetFanfare : AudioClip;
public var lose : AudioClip;
// Emotion Noises
public var happy : AudioClip;
public var raceOverSong : AudioClip;

// Get the controller object
function Awake(){
	// If we do not have a music controller in the scene already,
	if (!GameObject.Find("Controller(Clone)")){Instantiate(musicSourcePrefab);}
	musicSource = GameObject.Find("Controller(Clone)").GetComponent(AudioSource);
}

function PlaySound(sound : AudioClip){
	audioSource.PlayOneShot(sound, audioSource.volume);
}

function LoopSound(sound : AudioClip, play : boolean){
	// If we want to play the sound and we aren't playing it already,
	if (play && loopAudio.clip != sound){
		loopAudio.clip = sound;
		loopAudio.Play();
	}
	else if (!play){
		loopAudio.Stop();
		loopAudio.clip = null;
	}
}

function SetVolume(){
	audioSource.volume = PlayerPrefs.GetFloat("SFXVolume");
	loopAudio.volume = PlayerPrefs.GetFloat("MusicVolume");
}