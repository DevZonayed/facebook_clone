import axios from "axios";

const DatabaseBaseUrl = "http://localhost:5050";
function axiosConfig() {
  axios.defaults.baseURL = DatabaseBaseUrl;
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
}

export default axiosConfig;
