export default class UserInfo {
  constructor(nameElement, jobElement, profileImageButton) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
    this._avatarElement = profileImageButton;
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

  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
    this._avatarElement.alt = this._nameElement.textContent;
  }

  
}
