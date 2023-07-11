export default class UserInfo {
  constructor(nameElement, jobElement, imageElement) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
    this._imageElement = imageElement;
  }

  getUserInfo() {
    const userObject = {};
    userObject["profileName"] = this._nameElement.textContent;
    userObject["description"] = this._jobElement.textContent;
    return userObject;
  }

  setUserInfo(nameInfo, jobInfo) {
    this._nameElement.textContent = nameInfo;
    this._jobElement.textContent = jobInfo;
  }

  setMyId(myId) {
    this.myId = myId;
  }

  getMyId() {
    return this.myId;
  }

  setProfileImage(imageUrl) {
    this._imageElement.src = imageUrl;
  }

  getProfileImage() {
    return this._imageElement.src;
  }
}
