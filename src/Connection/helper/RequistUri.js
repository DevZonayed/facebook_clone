class axiosReqUri {
  /** Public Routes */
  static getUsers() {
    //Request get
    return "/user";
  }
  static getUser(id) {
    //Request get
    return `/user/${id}`;
  }
  static createUser() {
    //Request post
    return `/user`;
  }
  static loginUser() {
    //Request post
    return `/user/login`;
  }
  static forgotPass() {
    //Request post
    return `/user/forgotpass`;
  }
  static tokenCheck() {
    //Request get
    return `/user/tokencheck`;
  }

  /** Private Routes */

  static updateUserName() {
    // Requist patch
    return "/user/editusername";
  }

  static updateUserNames() {
    // Requist patch
    return "/user/editnames";
  }
  static updateUser() {
    // Requist patch
    return "/user/edituser";
  }
}

export default axiosReqUri;
