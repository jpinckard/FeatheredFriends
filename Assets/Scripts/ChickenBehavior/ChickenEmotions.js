#pragma strict
/*
This script controls the chicken's reactions to various events.
*/
private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);
// All of the particle effects that are for emotions
public var loveParticles : ParticleSystem;
public var stormParticles : ParticleSystem;

public var animator : Animator;
public var toggle : boolean = true;

public enum Particles{
	LOVE,
	STORMCLOUDS
}
var particles : Particles = Particles.STORMCLOUDS;


function Start(){
	if(!animator){animator = References.GetAnimator(gameObject);}
}

function Happy(){
	animator.SetBool("Dance", true);
	// Play a happy song
	audioController.PlaySound(audioController.happy);
}

function Sad(){
	if(toggle){stormParticles.Play();}
	else{stormParticles.Stop();}
	toggle = !toggle;
	Debug.Log("Toggle");
}

function CloseEyes(){transform.parent.gameObject.GetComponent(ChickenBlink).EyeToggle(true);}

function ParticleToggle(){

	var particleSystem : ParticleSystem;

	switch (particles){
		case Particles.LOVE:
			particleSystem = loveParticles;
			break;
		case Particles.STORMCLOUDS:
			particleSystem = stormParticles;
			break;
	}

	if(toggle){particleSystem.Play();}
	else{particleSystem.Stop();}

	Debug.Log("System: " + particleSystem.name);
}

// For use in animation triggers
function PlayNoise(noise : AudioClip){
	audioController.PlaySound(noise);
}