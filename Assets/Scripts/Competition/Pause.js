#pragma strict
private var pause : boolean = false;

function Pause(){
	pause = !pause;
	if (!pause){Time.timeScale = 1;}
	else{Time.timeScale = 0;}
}