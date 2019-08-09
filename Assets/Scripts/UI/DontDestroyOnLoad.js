#pragma strict
/*
Applying this script to an object will stop it from being destroyed on load, which means that it will continue to exist between scenes.
*/
function Start () {DontDestroyOnLoad(gameObject);}

