import axios from "axios";
import axiosReqUri from "../../helper/RequistUri";
import axiosConfig from "../axios/AxiosConfig";

class REST {
  // Token Check Methods
  static tokencheck() {
    axiosConfig();
    return axios.get(axiosReqUri.tokenCheck());
  }

  // get users
  static getUsers() {
    axiosConfig();
    return axios.get(axiosReqUri.getUsers());
  }
  // get user one user by id
  static getUser(id) {
    axiosConfig();
    return axios.get(axiosReqUri.getUser(id));
  }

  // Register a user
  static createUser(payload) {
    axiosConfig();
    return axios.post(axiosReqUri.createUser(), {
      auth: payload.auth,
      firstname: payload.firstname,
      surname: payload.surname,
      dateofbirth: payload.dateofbirth,
      gender: payload.gender,
      password: payload.password,
    });
  }

  // Login User
  static loginUser(payload) {
    axiosConfig();
    return axios.post(axiosReqUri.loginUser(), {
      auth: payload.auth,
      password: payload.password,
    });
  }

  // Forgot Password
  static forgotPass(payload) {
    axiosConfig();
    return axios.post(axiosReqUri.forgotPass(), {
      ...payload,
    });
  }
}
export default REST;
