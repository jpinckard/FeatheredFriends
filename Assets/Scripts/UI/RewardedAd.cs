using UnityEngine;
using UnityEngine.Advertisements;

public class RewardedAd : MonoBehaviour
{
	public GameObject popupLayout;
	public int adAmount;
	// IOS : 1403954
	public void Awake(){Advertisement.Initialize ("1469460", false);}

    public void ShowRewardedAd(){
		if (Advertisement.IsReady ("rewardedVideo")) {
			var options = new ShowOptions { resultCallback = HandleShowResult };
			Advertisement.Show ("rewardedVideo", options);
		}
		else {
			popupLayout.SetActive(true);
			popupLayout.SendMessage("EnableLayout", "Info");
			popupLayout.SendMessage("SetText", "The Advertisement is not ready to play. Try adjusting your internet settings.");
			Debug.Log ("Not Ready, and the popup canavs is " + popupLayout.activeSelf);
		}
    }
    private void HandleShowResult(ShowResult result){
        switch (result){
            case ShowResult.Finished:
				popupLayout.SetActive(true);
				popupLayout.SendMessage("EnableLayout", "Info");
				popupLayout.SendMessage("SetText", "Congratulations! You watched the advertisement and gained " + adAmount + " coins!");
                PlayerPrefs.SetInt("Buttons", PlayerPrefs.GetInt("Buttons") + adAmount);
				Debug.Log("Earn Coins");
                break;
            case ShowResult.Skipped:
				popupLayout.SetActive(true);
				popupLayout.SendMessage("EnableLayout", "Info");
				popupLayout.SendMessage("SetText", "You skipped the ad and did not earn any coins. Watch until the end next time to earn " + adAmount + " coins.");
				Debug.Log("Skipped Ad");

                break;
            case ShowResult.Failed:
				popupLayout.SetActive(true);
				popupLayout.SendMessage("EnableLayout", "Info");
				popupLayout.SendMessage("SetText", "The ad could not be shown. Please check your internet connection and try again to earn your reward.");
				Debug.Log("The ad failed to load.");
                break;
        }
    }
}