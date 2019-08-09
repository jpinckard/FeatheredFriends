#pragma strict

public var animations : List.<AnimationClip>;
public var anim : Animator;


function Start(){
 	anim = GetComponent(Animator);
 	if(gameObject.name != "Egg"){RandomAnimation();}
	OffsetAnimation();
	RandomRotation();
}

function RandomAnimation(){anim.SetBool("Idle"+ Random.Range(0,animations.Count).ToString(), true);}

function OffsetAnimation(){
	// Offset animation
	var state : AnimatorStateInfo = anim.GetCurrentAnimatorStateInfo(0);//could replace 0 by any other animation layer index
	anim.Play(state.fullPathHash, -1, Random.Range(0f, 1f));
}

function RandomRotation(){
	// Rotate randomly
	var euler : Vector3 = transform.parent.eulerAngles;
	// Get a random number between two ranges so the chicken will face eiher left or right. I'm sure there's a better way to do this, but time is money people
	var leftOrRight : int = Random.Range(0, 1);
	// If we're facing left, get a value between 310 and 360.
	if (leftOrRight == 0){euler.y = Random.Range(310, 360);}
	// If we're facing right, get a value between 0 and 90.
	else{euler.y = Random.Range(0, 90);}
	// Finally, apply the rotation to the parent of this object.
	transform.parent.eulerAngles = euler;
}
