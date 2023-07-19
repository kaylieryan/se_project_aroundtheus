export default class UserInfo {
  constructor(nameElement, jobElement, currentProfileImage) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
    this._avatarElement = currentProfileImage;
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
  }
}
